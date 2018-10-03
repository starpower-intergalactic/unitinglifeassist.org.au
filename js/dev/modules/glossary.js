var Glossary = (function(){

	var glossaryTerms = [];

	function init(){
		if( !$('html').hasClass('article_page') ){ return; }
		$(window).load( start );
	}

	function start(){
		if( !window.localStorage || localStorage.getItem('glossaryTerms') === null ){

			// either local storage isn't available
			// or there is no cached file
			
			loadTermsJSON();
		}
		else if( window.localStorage && window.JSON ){

			// check localStorage for cached glossary terms
			// if too old, update

			glossaryTerms = JSON.parse( localStorage.getItem('glossaryTerms') ) || [];

			var lastUpdated = localStorage.getItem('glossaryTermsUpdated') || 0;
			lastUpdated = parseInt( lastUpdated, 10 );


			if( getCurrentTimestamp() - lastUpdated > 24 * 3600 ){
				// it's been a day since JSON has been updated
				loadTermsJSON();
			}
			else if( glossaryTerms instanceof Array && glossaryTerms.length > 0 ){
				addGlossarizer();
			}
			else {
				// nothing valid found
				// try loading JSON again
				loadTermsJSON();
			}
		}
	}

	function loadTermsJSON(){
		$.ajax({
			url      : '/templates/life_assist/js/json/glossary.json',
			dataType : 'json'
		}).done(function(data){

			var timestamp = getCurrentTimestamp(); // timestamp in seconds

			glossaryTerms = data;

			if( window.localStorage && window.JSON ){
				// cache glossary in local storage and set timestamp
				// for updating later
				localStorage.setItem('glossaryTerms', JSON.stringify(glossaryTerms) );
				localStorage.setItem('glossaryTermsUpdated', timestamp);
			}
			addGlossarizer();
		});
	}

	function addGlossarizer(){

		$('.editable-text').glossarizer({
			sourceURL : glossaryTerms,
			callback  : function(){
				new tooltip();
			}
		});
	}


	function getCurrentTimestamp(){
		var ts = new Date();
		ts = ts.getTime();
		ts = Math.round(ts/1000);
		return ts;
	}

	return {
		init    : init,
		refresh : loadTermsJSON
	};

}());