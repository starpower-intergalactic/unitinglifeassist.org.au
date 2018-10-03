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