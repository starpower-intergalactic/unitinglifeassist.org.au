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