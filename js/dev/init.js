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