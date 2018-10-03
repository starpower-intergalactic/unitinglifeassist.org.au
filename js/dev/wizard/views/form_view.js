define([
	'marionette',
	'tpl!templates/form.tpl'
], function( Marionette, formTpl ){

	var FormView = Marionette.ItemView.extend({

		template : formTpl,

		ui : {
			form       : '#signup_form',
			textInputs : 'input[type=text], textarea',
			checkboxes : 'input[type=checkbox]',
			radios     : 'input[type=radio]',
			selects    : 'select'
		},

		events : {
			// 'submit @ui.form'       : 'validateForm',
			'input @ui.textInputs'  : 'saveDataToModel',
			'change .js-suburb-suggest'  : 'saveDataToModel',
			'change @ui.selects'    : 'selectChange',
			'change @ui.checkboxes' : 'saveDataToModel',
			'change @ui.radios'     : 'saveDataToModel',
			'change .js-method-of-contact' : 'toggleInterpreterInputs',
			'change .js-interpreter'       : 'toggleLanguageInput'
		},

		isSending : false,

		onRender : function(){
			this.initFakeUi();
			this.initValidatePlugin();
			this.initSuburbSuggest();
		},

		initSuburbSuggest : function(){
			this.$('.js-suburb-suggest').suburbSuggestions();
		},

		initialize : function( options ){
			this.app = options.app;
			this.model.set('enquiryReference', this.app.appModel.enquiryReference());
			this.listenTo( this.app, 'enable:form', this.enableForm );
		},

		initFakeUi : function(){
			_.each( this.ui.selects, function( select ){
				this.fakeSelect( select );
			}, this);
		},

		selectChange : function( e ){
			this.fakeSelect( e.currentTarget );
			this.saveDataToModel( e );
		},

		fakeSelect : function( select ){
			var $select    = $(select),
				optionText = $select.find('option:selected').text() || '&nbsp;';

			// console.log('fakeSelect', select, optionText);

			$select.siblings('.select-val').html( optionText );
		},

		saveDataToModel : function( e ){
			console.log('input change', e);

			var $formEl = $(e.currentTarget),
				name    = $formEl.attr('name'),
				val     = $formEl.val();

			name = name.replace('life_assist[','').replace(']','');

			console.log('-- setting form model attribute:', name, val);

			this.model.set( name, val );
			this.saveFormDataToApp();
		},

		saveFormDataToApp : function(){
			var json = this.model.toJSON();

			// console.log('saving model to app model', json );

			this.app.appModel.set('formData', json );
			return json;
		},

		initValidatePlugin : function(){
			var view = this;

			console.log('initValidatePlugin', this.ui.form);


			this.ui.form.validate({
				errorElement : 'em',
				submitHandler : function( form ){

					var $form       = $(form),
						formAction  = $form.attr('action') || '#',
						$emailField = $form.find('input[name=email]'),
						email       = $emailField.val();
					
					if( view.isSending ){ return; }
					
					view.isSending = true;
					$form.addClass('form-sending');

					if( formAction === '#' ){
						console.log('Sending via AJAX!');
						view.app.vent.trigger('wizard:form:submit');
					}
					else {
						if( $.trim(email) === '' ){
							$emailField.val('test@example.com');
						}
						console.log('Normal form submit!');
						form.submit();
					}
				},
				highlight : function( element, errorClass ){
					$(element).closest('.form-item').addClass( errorClass );
				},
				unhighlight : function( element, errorClass ){
					$(element).closest('.form-item').removeClass( errorClass );
				}
			})
		},

		enableForm : function(){
			isSending = false;
			$(this.ui.form).removeClass('form-sending');
		},

		toggleInterpreterInputs : function(e){
			var $select = $(e.currentTarget),
				val     = $select.val(),
				target  = $select.data('target'),
				$target = this.$('.'+target);

			if( val === 'phone' ){
				$target.slideDown();
			}
			else {
				$target.slideUp();
			}
		},

		toggleLanguageInput : function(e){
			var $select    = $(e.currentTarget),
				val        = $select.val(),
				$target    = $select.closest('.form-row').find('.js-language'),
				isDisabled = (val !== 'yes');

			$target.prop('disabled', isDisabled);
			$target.closest('.form-item').toggleClass('disabled', isDisabled);
		}
	});



	return FormView;

});