var ContactForm = (function(){

	'use strict';

	var _self = {},
		$form,
		$thankYou,
		$extraFormFields,
		isSending = false;

	function init(){

		$form = $('.contact-form');
		if( $form.length !== 1 ){ return; }

		$thankYou = $form.find('.form-thank-you-wrap');
		$extraFormFields = $form.find('.extra-form-fields');

		setFormAction();
		setupAutoSuggest();
		bindEvents();
	}

	function bindEvents(){
		$form.on('change', 'select', function(){
			console.log('select', this);
			var $select = $(this);

			setSelectBox($select);

			if( $select.hasClass('js-interpreter') ){
				toggleLanguageFieldForSelect($select);
			}
			else if( $select.hasClass('js-method-of-contact') ){
				toggleInterpreterRow($select);
			}
		});

		$form.validate({
			errorElement : 'em',
			submitHandler : function( form ){
				if( isSending ){ return; }
				isSending = true;
				$form.addClass('form-sending');

				if( $form.data('ajax') === 'no' ){
					form.submit();
				}
				else {
					sendForm();
				}
			},
			highlight : function( element, errorClass ){
				$(element).closest('.form-item').addClass( errorClass );
			},
			unhighlight : function( element, errorClass ){
				$(element).closest('.form-item').removeClass( errorClass );
			}
		});

		$form.on('change', '.js--enquiry_reference', function(e){
			var section = $('.js--enquiry_reference:checked').val();
			changeExtraFields(section);
		});
	}

	function setupAutoSuggest(){
		$form.find('.js-suburb-suggest').suburbSuggestions();
	}

	function toggleInterpreterRow($select){
		var isVisible   = $select.val() === 'phone' ? true : false,
			targetClass = $select.data('target'),
			$target     = $form.find('.'+targetClass);

		if( isVisible ){
			$target.slideDown();
		}
		else {
			$target.slideUp();
		}
	}

	function setFormAction(){
		var formAction = $form.find('.form_action').text();
		formAction = $.trim( formAction );

		$form.attr( 'action', formAction );
	}

	function setSelectBox( $select ){
		var $valOutput = $select.siblings('.select-val'),
			val = $select.find('option:selected').html();

		$valOutput.html( val );
	}

	function toggleLanguageFieldForSelect($select){
		var isDisabled     = $select.val() === 'yes' ? false : true,
			$languageInput = $select.closest('.form-row').find('.js-language');

		console.log('toggleLanguageFieldForSelect');
		console.log($select.val(), 'isDisabled', isDisabled, $select.closest('.form-row').find('.js-language'));

		$languageInput.closest('.form-item').toggleClass('disabled', isDisabled);
		$languageInput.prop('disabled', isDisabled);
	}

	function sendForm(){
		$.ajax({
			url      : $form.attr('action') + '.js',
			dataType : 'jsonp',
			data     : $form.serialize()
		}).complete(function(){
			setTimeout(function(){
				$thankYou.addClass('show');
				$form.removeClass('form-sending');

				setTimeout(function(){
					isSending = false;
					$form[0].reset();
					$form.find('select').trigger('change');
					$thankYou.removeClass('show');
				}, 4500);
			}, 333);
		});
	}

	function changeExtraFields(section){
		var sectionClassNames =  {},
			currentClassName  = '',
			$currentSection   = null;

		$extraFormFields.slideUp();
		toggleRequiredFields($extraFormFields, false);

		sectionClassNames['myself'] = null;
		sectionClassNames['client/patient'] = 'patient';
		sectionClassNames['friend/family member'] = 'friend';

		currentClassName = sectionClassNames[section];

		console.log('changeExtraFields', section, currentClassName);

		toggleTargetEmail(currentClassName);

		if( currentClassName ){
			$currentSection = $extraFormFields.filter('.'+currentClassName);
			$currentSection.slideDown();
			toggleRequiredFields($currentSection, true);
		}
	}

	function toggleTargetEmail(currentClassName){
		var $select     = $form.find('select[name="life_assist[target_email]"]'),
			targetEmail = currentClassName === 'patient' ? 'referrals@lifeassist.org.au' : 'help@lifeassist.org.au';

		$select.val(targetEmail);
	}

	function toggleRequiredFields($section, onOff){
		$section.find('.toggle-required').toggleClass('required', onOff);
	}

	function formObjectize($form){
		var result = {},
			params = $form.serialize();

		params = decodeURIComponent(params);
		params = params.split('&');

		params.forEach(function(param){
			var pair = param.split('='),
				key  = pair[0],
				val  = pair[1];

			key = key.replace('[','_');
			key = key.replace(']','');

			result[key] = val;
		});

		return result;
	}

	_self = {
		init : init,
		formObjectize : formObjectize
	};

	return _self;

}());