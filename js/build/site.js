// INIT MODULES

var fakeConsole = {
	error : function(){},
	log : function(){},
	debug : function(){},
	dir : function(){}
};

window.console = window.console || fakeConsole;

$(function(){
	// DOM READY

	window.EVENT_TYPE = 'click';

	PageOverlay.init();
	MainNav.init();
	SearchForm.init();
	ListingNav.init();
	ContactForm.init();
	// StickyFooter.init();
	Sitemap.init();
	StickyHeader.init();
	// Glossary.init();

	if( $('html').hasClass('ie8') ){
		SimpleHeroGallery.init();
		VideoOverlayVideojs.init();
	}
	else {
		HeroGallery.init();
		VideoOverlay.init();
	}
});
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
var Glossary = (function(){

	var glossaryTerms = [];

	function init(){
		if( !$('html').hasClass('article_page') ){ return; }
		$(window).load( start );
	}

	function start(){
		if( !window.localStorage || localStorage.getItem('glossaryTerms') === null ){

			// either local storage isn't available
			// or there is no cached file
			
			loadTermsJSON();
		}
		else if( window.localStorage && window.JSON ){

			// check localStorage for cached glossary terms
			// if too old, update

			glossaryTerms = JSON.parse( localStorage.getItem('glossaryTerms') ) || [];

			var lastUpdated = localStorage.getItem('glossaryTermsUpdated') || 0;
			lastUpdated = parseInt( lastUpdated, 10 );


			if( getCurrentTimestamp() - lastUpdated > 24 * 3600 ){
				// it's been a day since JSON has been updated
				loadTermsJSON();
			}
			else if( glossaryTerms instanceof Array && glossaryTerms.length > 0 ){
				addGlossarizer();
			}
			else {
				// nothing valid found
				// try loading JSON again
				loadTermsJSON();
			}
		}
	}

	function loadTermsJSON(){
		$.ajax({
			url      : '/templates/life_assist/js/json/glossary.json',
			dataType : 'json'
		}).done(function(data){

			var timestamp = getCurrentTimestamp(); // timestamp in seconds

			glossaryTerms = data;

			if( window.localStorage && window.JSON ){
				// cache glossary in local storage and set timestamp
				// for updating later
				localStorage.setItem('glossaryTerms', JSON.stringify(glossaryTerms) );
				localStorage.setItem('glossaryTermsUpdated', timestamp);
			}
			addGlossarizer();
		});
	}

	function addGlossarizer(){

		$('.editable-text').glossarizer({
			sourceURL : glossaryTerms,
			callback  : function(){
				new tooltip();
			}
		});
	}


	function getCurrentTimestamp(){
		var ts = new Date();
		ts = ts.getTime();
		ts = Math.round(ts/1000);
		return ts;
	}

	return {
		init    : init,
		refresh : loadTermsJSON
	};

}());
var HeroGallery = (function(){

	'use strict';

	var _self = {},
		$gallery,
		$wrap,
		$items,
		$nav,
		$window,
		count = 0,
		scroller,
		autoPlayTimeout,
		autoPlayDelay = 5 * 1000,
		autoPlayActive = true,
		scrollingSpeed = 2 * 1000,
		resizeTimeout,
		mobileBreakPoint = 601;


	function init(){

		$gallery = $('.hero-gallery');
		if( $gallery.length === 0 ){ return; }
		
		$wrap    = $gallery.find('.item-wrap');
		$items   = $wrap.find('.gallery-item');
		$nav     = $gallery.find('.gallery-nav');
		$window  = $(window);

		count = $items.length;

		if( detectMobileMode() ){
			return;
		}

		if( count < 2 ){
			_mobileDetectionEvent();
			return;
		}

		setTimeout(function(){

			setImageSrc();

			setUpCSS();

			createIScroll();

			createNav();

			bindEvents();

			setTimeout(function(){
				autoPlay();
			}, 4000 );

		}, 500 );

		
	}


	function setImageSrc(){
		$items.each(function(){
			var $img = $(this).find('img'),
				dataSrc = $img.data('src');

			if( dataSrc && dataSrc.length > 0 ){
				$img[0].src = dataSrc;
			}
		});
	}


	function bindEvents(){
		$nav.on('click', '.nav-dot', function(e){
			var index = $(this).index();
			scroller.goToPage( index, 0, scrollingSpeed );
			updateNav( index );
		});

		$gallery.one('touchstart click', stopAutoPlay );

		_mobileDetectionEvent();
	}

	function _mobileDetectionEvent(){
		$window.on('resize.mobileDetection', function(){
			clearTimeout( resizeTimeout );
			resizeTimeout = setTimeout(function(){
				detectMobileMode();
			}, 333);
		});
	}


	function detectMobileMode(){
		if( $window.width() < mobileBreakPoint ){

			$gallery.addClass('gallery-mobile');
			stopAutoPlay();
			destroyScroller();
			$nav.hide();
			$window.off('resize.mobileDetection');

			return true;
		}
		return false;
	}


	function setUpCSS(){
		// Set sizes
		$wrap.css({
			width : ( count * 100 ) + '%'
		});

		$items.css({
			display : 'block',
			float   : 'left',
			width   : ( 100 / count ) + '%'
		});
		
		$items.each(function(i){
			$(this).css({
				left : ( i * 100 / count ) + '%'
			});
		});
	}


	function createIScroll(){
		scroller = new IScroll( $gallery[0], {
			scrollX  			: true,
			scrollY  			: false,
			momentum 			: false,
			snap     			: '.gallery-item',
			click    			: true,
			eventPassthrough	: true
		});

		scroller.on('scrollEnd', function(){
			var currentPage = this.currentPage.pageX;

			updateNav( currentPage );
		});
	}


	function createNav(){
		var navDot = '';

		for( var i = 0; i < count; i ++ ){
			navDot += '<div class="nav-dot' + ( i===0 ? ' current' : '' ) + '" />';
		}

		$nav.html( navDot );
	}


	function updateNav( index ){
		$nav.children()
			.removeClass('current')
			.eq( index ).addClass('current');
	}


	function autoPlay(){
		if( !autoPlayActive ){ return; }

		var currentPage = scroller.currentPage.pageX;

		if( currentPage < count - 1 ){
			scroller.next( scrollingSpeed );
		}
		else {
			scroller.goToPage(0,0, 0 );
		}

		autoPlayTimeout = setTimeout(autoPlay, autoPlayDelay);
	}


	function stopAutoPlay(){
		autoPlayActive = false;
		clearTimeout( autoPlayTimeout );
	}

	function destroyScroller(){
		if( scroller && typeof scroller.destroy === 'function' ){
			scroller.destroy();
			scroller = null;
		}
	}


	_self = {
		init     : init,
		scroller : function(){ return scroller; }
	};

	return _self;

}());
(function($){

    $.fn.suburbSuggestions = function(){

        var apiUrl             = 'http://services.blocksglobal.com/postcodes',
            minimumQueryLength = 2,
            dataCache          = {};

        return this.each(function(){

            var $input         = $(this),
                selectId       = $input.data('state-select'),
                $select        = $input.closest('.form-row').find('select'),
                $list          = $('<ul class="suggestions" />'),
                listHidden     = true,
                data           = [],
                highlightIndex = 0,
                timeout        = null,
                delay          = 200,
                req            = null;

            console.log('START >>>');

            // START
          
            $input.after($list);
            hideList();



            // EVENTS

            $input.on('input', function(){
                // console.log('INPUT');
              
                var val = $input.val();
                clearTimeout(timeout);
                setTimeout(function(){
                    getSuggestions(val);
                }, delay);
            });
            
            $input.on('keydown', function(e){
              
              if( listHidden ){
                return;
              }
              
              if( e.keyCode === 38 ){
                // UP ARROW
                highlightUp();
              }
              else if( e.keyCode === 40 ){
                // DOWN ARROW
                highlightDown();
              }
              else if( e.keyCode === 13 ){
                // ENTER
                e.preventDefault();
                e.stopPropagation();
                setSelectedSuburb();
                $input.trigger('change');
                return false;
              }
              
            });
          
            $list.on('click', 'li', function(){
              setSelectedSuburb();
            });
          
            $list.on('mouseenter', 'li', function(){
               setHighlight($(this).index());
            });



            // METHODS
            
            function highlightUp(){
              var newIndex = highlightIndex -= 1;
              
              if( newIndex < 0 ){
                newIndex = data.length - 1;
              }
              
              setHighlight(newIndex);
            }
          
            function highlightDown(){
              var newIndex = highlightIndex + 1;
              
              if( newIndex >= data.length ){
                newIndex = 0;
              }
              
              setHighlight(newIndex);
            }
          
            function setSelectedSuburb(){
                var selectedData = data[highlightIndex],
                    suburb = downcaseSuburb(selectedData.suburb);
              
                $input.val(suburb);
                $select.val(selectedData.state).trigger('change');
              
                hideList();
            }

            function getSuggestions(query){
                query = $.trim(query.toLowerCase());
              
                if( query.length < minimumQueryLength ){
                    hideList();
                    return;
                }

                if( req ){
                  req.abort();
                }
              
                if( dataCache[query] ){
                  // console.log('Cached version found!');
                  data = dataCache[query];
                  createList();
                  return;
                }
              
              // console.log('Starting new ajax query!');

                req = $.ajax({
                    url: apiUrl,
                    data: {
                        q: query
                    },
                    dataType: 'jsonp'
                }).done(function(res){
                    // console.log('RESPONSE');
                    if( res.length > 0 ){
                      dataCache[query] = res;
                    }
                    data = res;
                    createList();
                });
            }

            function createList(){
                var html = '';

                data.forEach(function(d){
                    html += '<li>';
                        html += downcaseSuburb(d.suburb);
                        html += ' (' + d.state + ')';
                    html += '</li>';
                });
              
                $list.html(html);
                showList();

                setHighlight(0);
            }

            function setHighlight(nr){
                highlightIndex = nr;
              
                $list.children().removeClass('selected')
                .eq(highlightIndex).addClass('selected');
            }

            function hideList(){
                $list.hide();
                listHidden = true;
            }

            function showList(){
                $list.show();
                listHidden = false;
            }

            function downcaseSuburb(suburb){
                var parts    = suburb.split(' '),
                    newParts = [];
                
                parts.forEach(function(w){
                    newParts.push(w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
                });

                return newParts.join(' ');
            }
        });
    };

}(jQuery));
var ListingNav = (function(){

	'use strict';

	var _self     = {},
		current   = 0,
		pageCount = 0,

		isTransitioning = false,
		transitionTime  = 1000,

		$mediaBlockListing,
		$nav,
		$prev,
		$next,
		$rows;


	function init(){

		$mediaBlockListing = $('.media-block-listing');

		if( $mediaBlockListing.length === 0 ){ return };

		$nav  = $('.listing-nav');
		$prev = $nav.find('.nav-item--prev');
		$next = $nav.find('.nav-item--next');
		$rows = $('.three-media-blocks');
		
		if( $rows.length < 3 ){
			return;
		}
		$nav.show();

		if( $('html').hasClass('no-csstransitions') ){
			transitionTime = 16;
		}

		pageCount = Math.ceil( $rows.length/2 );

		togglePrevNext();

		bindEvents();
	}


	function bindEvents(){

		$nav.on('click','.nav-item--prev', prev );
		$nav.on('click','.nav-item--next', next );
	}


	function prev(){
		if( current - 1 >= 0 ){
			showPage( current - 1 );
		}
	}


	function next(){
		if( current + 1 < pageCount ){
			showPage( current + 1 );
		}
	}


	function showPage( index ){
		var $rowsToShow = $rows.eq( 2*index ).add( $rows.eq( 2*index+1 ) ),
			$rowsToHide = $rows.eq( 2*current ).add( $rows.eq( 2*current+1 ) );
		

		if( index === current ){
			console.log('index is current page');
			return;
		}

		if( index < 0 || index >= pageCount ){
			console.log('index is invalid');
			return;
		}

		if( isTransitioning ){
			console.log('listing is tansitioning already');
			return;
		}

		isTransitioning = true;
		current = index;

		togglePrevNext();

		console.log('showPage', index );
		console.log( $rowsToHide, $rowsToShow );
		console.log(' --- ');
		console.log(' animating out ');

		$rowsToHide
			.removeClass('animate-in')
			.addClass('animate-out');

		setTimeout(function(){
			$rowsToHide.hide();
			$rowsToShow.show();

			console.log(' toggling visibility ');

			setTimeout(function(){
				console.log(' animating in ');
				$rowsToShow
					.addClass('animate-in')
					.removeClass('animate-out');
				
				setTimeout(function(){
					isTransitioning = false;
				}, transitionTime );

			}, 16);
		}, transitionTime );

		console.log('$rowsToShow', $rowsToShow);
	}


	function togglePrevNext(){
		var showPrev = current > 0,
			showNext = current + 1 < pageCount;

		$prev.toggleClass( 'show', showPrev );
		$next.toggleClass( 'show', showNext );
	}


	_self = {
		init     : init,
		showPage : showPage
	};

	return _self;

}());
var MainNav = (function(){

	'use strict';

	var _self = {},
		$mainNav,
		$toggle,
		$firstLevelLinks,

		isShowing = false;

	function init(){

		$mainNav         = $('.main-nav');
		$toggle          = $mainNav.find('.menu_toggle');
		$firstLevelLinks = $mainNav.find('.nav-lvl-1-item').children('a');

		bindEvents();
	}

	function bindEvents(){

		$(document).on('hide-menu', hideMenu );
		$(document).on('show-menu', showMenu );
		$(document).on('toggle-menu', toggleMenu );
		
		$toggle.on( EVENT_TYPE, toggleMenu );

		$firstLevelLinks.on( EVENT_TYPE, function(e){
			var $link = $(this),
				$wrap = $link.closest('.nav-lvl-1-item');

			if( $toggle.is(':visible') && $wrap.find('.nav-lvl-2').length === 1 ){
				// mobile nav is showing and this has subitems
				// toggle their visibility
				// prevent link from changing url
				e.preventDefault();
				$wrap.toggleClass('open-item');
				return false;
			}
			
			// normal link behavior
			// desktop mode or no children
			return true;
		});
	}

	function toggleMenu(){
		if( isShowing ){
			hideMenu();
		}
		else {
			showMenu();
		}
	}

	function hideMenu(){

		isShowing = false;
		$mainNav.removeClass('show');
		$(document).trigger('menu-hide');
		
		if( arguments[1] !== 'keep-overlay' ){
			$(document).trigger('hide-overlay');
		}
	}

	function showMenu(){
		isShowing = true;
		$mainNav.addClass('show');
		$(document).trigger('menu-show').trigger('show-overlay');
	}


	_self = {
		init : init
	};

	return _self;

}());
var PageOverlay = (function(){

	'use strict';

	var _self = {},
		$overlay,
		isVisible = false;

	function init(){

		$overlay = $('.page-overlay');

		bindEvents();
	}

	function bindEvents(){

		$(document).on('hide-overlay', function(){ toggle( false ); });
		$(document).on('show-overlay', function( event, mode ){ toggle( true, mode ); });
	}

	function toggle( changeTo, mode ){

		if( changeTo ){
			isVisible = true;
			$overlay.addClass('show' + ( mode === 'full' ? ' full' : '' ) );
		}
		else {
			isVisible = false;
			$overlay.removeClass('show full');
		}
	}


	_self = {
		init   : init,
		toggle : toggle,
		hide   : function(){ toggle( false ); },
		show   : function(){ toggle( true ); }
	};

	return _self;

}());
var SearchForm = (function(){

	'use strict';

	var _self = {},
		searchEndpoint = '/searches/pages.js',
		$searchBox,
		$searchForm,
		$searchToggle,
		$termInput,
		$resultWrap,
		isVisible = false,
		alertFn = window.alert;

	function init(){

		$searchBox    = $('.search-box');
		$searchForm   = $('.search-form');
		$searchToggle = $('.start_search');
		$resultWrap   = $('.search-result-list');
		$termInput    = $searchForm.find('input[name=term]')

		bindEvents();
	}

	function bindEvents(){

		$searchForm.on('submit', function(e){
			var $form      = $(this),
				searchTerm = $.trim( $termInput.val() );

			e.preventDefault();

			$form.addClass('form-sending');

			getSearchResults( searchTerm ).done(function(){
				$form.removeClass('form-sending');
			});
		});
		
		$searchToggle.on( EVENT_TYPE, function(){
			toggle();
		});

		$(document).on('menu-show', function(){
			toggle( 'off' );
		});
	}


	function getSearchResults( term ){
		var promise = $.ajax({
				url : searchEndpoint,
				dataType: 'json',
				data : {
					term      : term,
					per_page  : 100,
					site_only : true
				}
			});

		$resultWrap.slideUp();

		promise.done(function(data){

			var results = data[0],
				html = '';

			if( results.length === 0 ){
				alertFn('Sorry, there were no results for your query.')
				return;
			}

			for( var i = 0, max = results.length; i < max; i++ ){
				html += _searchResultTemplate( results[i] );
			}

			$resultWrap.html( html );
			$resultWrap.slideDown();
		});

		return promise;
	}


	function toggle( state ){
		if( state === 'off' ){
			isVisible = false;
		}
		else if( state == 'on' ){
			isVisible = true;
		}
		else {
			isVisible = !isVisible;
		}

		$('.page-header').toggleClass('show-search-form', isVisible);

		if( isVisible ){
			$termInput.focus();
			$(document).trigger('show-overlay');
			$(document).trigger('hide-menu', 'keep-overlay');
		}
		else {
			$(document).trigger('hide-overlay');
			$resultWrap.hide();
		}
	}


	function _searchResultTemplate( data ){
		var html = '';

		if( !data.site_url ){ return html; }

		html = '<a href="' + data.site_url + '/' + data.name + '" class="search-result">\n';
			html += '<strong class="search-result-title">' + ( data.name || data.title || '&nbsp;' ) + '</strong>\n';
			html += '<span class="search-result-description">' + ( data.description || '&nbsp;' ) + '</span>\n';
			html += '<i class="arrow"></i>\n';
		html += '</a>\n';

		return html;
	}


	_self = {
		init   : init,
		toggle : toggle,
		hide   : function(){ toggle( 'off' ); },
		show   : function(){ toggle( 'on' ); }
	};

	return _self;

}());
var SimpleHeroGallery = (function(){

	var $gallery,
		$wrap,
		$items,
		$nav,
		current = 0,
		max = 0,
		autoPlayTimeout,
		autoPlayActive = true,
		autoPlayDelay = 6 * 1000;


	function init(){
		console.log('i n i t');

		$gallery = $('.hero-gallery');
		if( $gallery.length === 0 ){ return; }
		
		$wrap  = $gallery.find('.item-wrap');
		$items = $wrap.find('.gallery-item');
		
		max = $items.length;
		if( max < 2 ){ return; }

		$nav = $gallery.find('.gallery-nav');
		createNav();

		bindEvents();

		autoPlayTimeout = setTimeout( autoPlay, autoPlayDelay );
	}


	function bindEvents(){

		$nav.on('click', '.nav-dot', function(e){
			var index = $(this).index();
			console.log('click', index);
			gotoSlide( index );
		});

		$gallery.one( 'touchstart click', stopAutoPlay );
	}


	function autoPlay(){
		if( !autoPlayActive ){ return; }

		nextSlide();

		autoPlayTimeout = setTimeout( autoPlay, autoPlayDelay );
	}


	function nextSlide(){
		var next = current + 1 < max ? current + 1 : 0;
		gotoSlide( next );
	}


	function gotoSlide( index ){
		$items.eq( current ).fadeOut();
		$items.eq( index ).fadeIn();

		current = index;

		updateNav( current );
	}


	function createNav(){
		var navDot = '';

		for( var i = 0; i < max; i ++ ){
			navDot += '<div class="nav-dot' + ( i===0 ? ' current' : '' ) + '" />';
		}

		$nav.html( navDot );
	}


	function updateNav( index ){
		$nav.children()
			.removeClass('current')
			.eq( index ).addClass('current');
	}


	function stopAutoPlay(){
		autoPlayActive = false;
		clearTimeout( autoPlayTimeout );
	}


	return {
		init : init
	};

}());
var Sitemap = (function(){

	var $wrap,
		$sitemap,
		$toggle,
		$window,
		$pageHeader,
		$pageContent,
		$pageFooter,
		isOpen = false,
		resizeTimeout,

		marginBottom  = 0,
		sitemapHeight = 0,
		windowHeight  = 0,
		footerHeight  = 0,
		pageHeight    = 0,

		mobileBreakPoint = 601;


	function init(){

		$wrap        = $('.page-sitemap-wrap');
		$sitemap     = $('.page-sitemap');
		$toggle      = $('.toggle-sitemap');
		$window      = $(window);
		$pageHeader  = $('.page-header');
		$pageContent = $('.page-content');
		$pageFooter  = $('.page-footer');

		bindEvents();
	}


	function bindEvents(){

		$(window).on('load', function(){
			setVariables();

			$(document).on('footer-reset', setVariables );
			
			$toggle.on('click', function(e){
				e.preventDefault();
				toggleSitemap();
			});

			$window.on('resize', function(){
				clearTimeout( resizeTimeout );
				resizeTimeout = setTimeout( setVariables, 250 );
			});
		});
	}


	function setVariables(){
		isOpen = false;
		$wrap.css( 'height', 0 );

		marginBottom = $pageContent.css('margin-bottom');
		marginBottom = parseInt( marginBottom, 10 );

		sitemapHeight = $sitemap.outerHeight(),
		windowHeight  = $window.height(),
		footerHeight  = $pageFooter.outerHeight(),
		pageHeight    = $pageHeader.height() + $pageContent.height();
	}


	function toggleSitemap(){

		if( $window.width() < mobileBreakPoint ){
			
			$('html,body').animate({
				scrollTop: 0
			}, 1000, function(){
				$(document).trigger('show-menu');
			});
			return;
		}

		if( isOpen ){
			closeSitemap();
		}
		else {
			openSitemap();
		}
	}


	function closeSitemap(){

		isOpen = false;

		$wrap.animate({
			height : 0
		}, 750 );

		$pageContent.animate({
			marginBottom : footerHeight
		}, 750 );

		$('html, body').animate({
			scrollTop : pageHeight - ( windowHeight - footerHeight )
		}, 750 );
	}


	function openSitemap(){

		isOpen = true;

		$wrap.animate({
			height : sitemapHeight
		}, 1000 );

		$pageContent.animate({
			marginBottom : marginBottom + sitemapHeight
		}, 1000 );

		$('html, body').animate({
			scrollTop : pageHeight - ( windowHeight - sitemapHeight - footerHeight )
		}, 1000 );
	}


	return {
		init   : init,
		toggle : toggleSitemap
	};

}());
var StickyFooter = (function(){

	var _self = {},
		$html,
		$pageHeader,
		$pageContent,
		$pageFooter,
		$window,
		resizeTimeout;


	function init(){

		$html        = $('html'),
		$window      = $(window);
		$pageHeader  = $('.page-header');
		$pageContent = $('.page-content');
		$pageFooter  = $('.page-footer');



		bindEvents();
	}


	function bindEvents(){

		$window.on('load', setStickyFooter );

		$window.on('resize', function(){
			clearTimeout( resizeTimeout );
			resizeTimeout = setTimeout( setStickyFooter, 250 );
		});
	}


	function setStickyFooter(){
		var headerHeight  = $pageHeader.height(),
			contentHeight = $pageContent.height(),
			footerHeight  = $pageFooter.outerHeight(),
			windowHeight  = $window.height(),
			isSticky      = false;

		if( windowHeight < headerHeight + contentHeight ){
			// header and content take up more than window
			isSticky = true;
		}

		$html.toggleClass( 'sticky-footer', isSticky );
		$pageContent.css({
			marginBottom : isSticky ? footerHeight : 0
		});

		$(document).trigger('footer-reset');
	}


	_self.init = init;
	return _self;

}());
var StickyHeader = (function(){

	'use strict';

	var $window,
		$helpBar,
		$pageHeader,
		$document,
		$mainNav,
		windowWidth      = 0,
		windowHeight     = 0,
		navHeight        = 0,
		headerHeight     = 0,
		documentHeight   = 0,
		scrollLimit      = 0,
		minWindowHeight  = 600,
		mobileBreakPoint = 601,
		resizeTimeout,
		canBeSticky = false,
		isSticky    = false;


	function init(){

		$window      = $(window);
		$helpBar     = $('.help-bar');
		$pageHeader  = $('.page-header');
		$document    = $(document);
		$mainNav     = $('.main-nav');

		if( isMobileDevice() ){ return; }

		setValues();

		bindEvents();
	}


	function bindEvents(){

		$window.on('load', function(){

			checkStickyness();

			$window.on('resize', function(){
				clearTimeout( resizeTimeout );
				resizeTimeout = setTimeout(function(){
					setValues();
					checkStickyness();
				}, 250 );
			});

		});
	}


	function setValues(){
		scrollLimit   = $helpBar.outerHeight();
		windowWidth   = $window.width();
		windowHeight  = $window.height();
		navHeight     = $mainNav.outerHeight();
		documentHeight = $document.height();

		if( windowWidth < mobileBreakPoint ){
			// too small for fixed nav
			canBeSticky = false;
		}
		else if( documentHeight - scrollLimit <= windowHeight ){
			// document doesn't scroll
			canBeSticky = false;
		}
		else if ( windowHeight < minWindowHeight ){
			// too small for fixed nav
			canBeSticky = false;
		}
		else {
			canBeSticky = true;
		}

		if( canBeSticky ){
			$window.on('scroll.stickyheader', checkStickyness );
		}
		else {
			$window.off('scroll.stickyheader');
		}
	}


	function checkStickyness(){
		if( !canBeSticky ){
			unstick();
			return;
		}

		var scrollY = getScrollY();

		if( scrollY >= scrollLimit ){
			stick();
		}
		else {
			unstick();
		}
	}


	function stick(){
		if( isSticky ){ return; }
		isSticky = true;

		$mainNav.addClass('sticky');
		$pageHeader.css('padding-bottom', navHeight );
	}


	function unstick(){
		if( !isSticky ){ return; }
		isSticky = false;

		$mainNav.removeClass('sticky');
		$pageHeader.css('padding-bottom', 0 );
	}

	function getScrollY(){
		var y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

		return y;
	}

	function isMobileDevice(){
		var userAgent = window.navigator.userAgent.toLowerCase();

		if( userAgent.indexOf('android') > -1 || userAgent.indexOf('iphone') > -1 || userAgent.indexOf('ipad') > -1 ){
			return true;
		}

		return false;
	}


	return {
		init : init
	};

}());
var VideoOverlay = (function(){

	var _self = {},
		$playIcons,
		$videoWraps;


	function init(){
		$playIcons  = $('.play-icon');
		$videoWraps = $('.video-box-wrap');

		if( $playIcons.length === 0 || $videoWraps.length === 0 ){
			// There is nothing to see here, move along!
			return;
		}

		bindEvents();
	}


	function bindEvents(){
		$playIcons.on('click', function(){
			var $closestVideoWrap = $(this).closest('.video-item-overlay').siblings('.video-box-wrap');
			showVideoLightbox( $closestVideoWrap );
		});

		$videoWraps.on('click', '.video-close, .video-backdrop', function(){
			hideVideoLightbox( $(this).closest('.video-box-wrap') );
		});

		$videoWraps.on('click', '.video-stop', function(){
			pauseVideo( $(this).closest('.video-box-wrap') );
		});

		$videoWraps.on('click', '.video-play', function(){
			playVideo( $(this).closest('.video-box-wrap') );
		});
	}


	function showVideoLightbox( $videoWrap ){
		$videoWrap.addClass('show');
		playVideo( $videoWrap );
	}


	function hideVideoLightbox( $videoWrap ){
		$videoWrap.removeClass('show');
		stopVideo( $videoWrap );
	}


	function playVideo( $videoWrap ){
		$videoWrap.find('video')[0].play();
	}


	function pauseVideo( $videoWrap ){
		$videoWrap.find('video')[0].pause();
	}


	function stopVideo( $videoWrap ){

		var videoElement = $videoWrap.find('video')[0];
		if( !videoElement ){ return; }
		
		videoElement.pause();
		videoElement.currentTime = 0;
	}


	_self.init = init;
	return _self;

}());
var VideoOverlayVideojs = (function(){

	var $playIcons,
		$videoWraps,
		players = [],
		currentPlayer = null;


	function init(){
		$playIcons  = $('.play-icon');
		$videoWraps = $('.video-box-wrap');

		if( $playIcons.length === 0 || $videoWraps.length === 0 ){
			// There is nothing to see here, move along!
			return;
		}

		bindEvents();
	}


	function bindEvents(){
		$playIcons.on('click', function(){
			var $closestVideoWrap = $(this).closest('.video-item-overlay').siblings('.video-box-wrap');
			showVideoLightbox( $closestVideoWrap );
		});

		$videoWraps.on('click', '.video-close, .video-backdrop', function(){
			hideVideoLightbox( $(this).closest('.video-box-wrap') );
		});

		$videoWraps.on('click', '.video-stop', function(){
			pauseVideo( $(this).closest('.video-box-wrap') );
		});

		$videoWraps.on('click', '.video-play', function(){
			playVideo( $(this).closest('.video-box-wrap') );
		});
	}


	function showVideoLightbox( $videoWrap ){
		initPlayer( $videoWrap );
		$videoWrap.addClass('show');
		playVideo( $videoWrap );
	}


	function initPlayer( $videowrap ){
		var playerIndex = parseInt( $videowrap.data('player-index'), 10);
		
		if( isNaN(playerIndex) ){

			$videowrap.data( 'player-index', players.length );

			videojs( $videowrap.find('video')[0], { autoplay : true, controls : false, width : 640 , height : 360 }, function(){
				players.push( this );
			});
		}
		else {
			currentPlayer = players[ playerIndex ];
		}
	}


	function hideVideoLightbox( $videoWrap ){
		$videoWrap.removeClass('show');
		stopVideo( $videoWrap );
	}


	function playVideo( $videoWrap ){
		if( currentPlayer ){
			currentPlayer.play();
		}
	}


	function pauseVideo( $videoWrap ){
		if( currentPlayer ){
			currentPlayer.pause();
		}
	}


	function stopVideo( $videoWrap ){
		if( currentPlayer ){
			currentPlayer.currentTime( 0 );
		}
	}


	return {
		init : init
	};

}());