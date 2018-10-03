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