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