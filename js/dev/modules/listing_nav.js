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