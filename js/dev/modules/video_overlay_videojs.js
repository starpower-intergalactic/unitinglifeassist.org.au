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