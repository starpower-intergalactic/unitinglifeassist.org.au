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