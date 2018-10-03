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