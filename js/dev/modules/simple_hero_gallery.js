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