var SearchForm = (function(){

	'use strict';

	var _self = {},
		searchEndpoint = '/searches/pages.js',
		$searchBox,
		$searchForm,
		$searchToggle,
		$termInput,
		$resultWrap,
		isVisible = false,
		alertFn = window.alert;

	function init(){

		$searchBox    = $('.search-box');
		$searchForm   = $('.search-form');
		$searchToggle = $('.start_search');
		$resultWrap   = $('.search-result-list');
		$termInput    = $searchForm.find('input[name=term]')

		bindEvents();
	}

	function bindEvents(){

		$searchForm.on('submit', function(e){
			var $form      = $(this),
				searchTerm = $.trim( $termInput.val() );

			e.preventDefault();

			$form.addClass('form-sending');

			getSearchResults( searchTerm ).done(function(){
				$form.removeClass('form-sending');
			});
		});
		
		$searchToggle.on( EVENT_TYPE, function(){
			toggle();
		});

		$(document).on('menu-show', function(){
			toggle( 'off' );
		});
	}


	function getSearchResults( term ){
		var promise = $.ajax({
				url : searchEndpoint,
				dataType: 'json',
				data : {
					term      : term,
					per_page  : 100,
					site_only : true
				}
			});

		$resultWrap.slideUp();

		promise.done(function(data){

			var results = data[0],
				html = '';

			if( results.length === 0 ){
				alertFn('Sorry, there were no results for your query.')
				return;
			}

			for( var i = 0, max = results.length; i < max; i++ ){
				html += _searchResultTemplate( results[i] );
			}

			$resultWrap.html( html );
			$resultWrap.slideDown();
		});

		return promise;
	}


	function toggle( state ){
		if( state === 'off' ){
			isVisible = false;
		}
		else if( state == 'on' ){
			isVisible = true;
		}
		else {
			isVisible = !isVisible;
		}

		$('.page-header').toggleClass('show-search-form', isVisible);

		if( isVisible ){
			$termInput.focus();
			$(document).trigger('show-overlay');
			$(document).trigger('hide-menu', 'keep-overlay');
		}
		else {
			$(document).trigger('hide-overlay');
			$resultWrap.hide();
		}
	}


	function _searchResultTemplate( data ){
		var html = '';

		if( !data.site_url ){ return html; }

		html = '<a href="' + data.site_url + '/' + data.name + '" class="search-result">\n';
			html += '<strong class="search-result-title">' + ( data.name || data.title || '&nbsp;' ) + '</strong>\n';
			html += '<span class="search-result-description">' + ( data.description || '&nbsp;' ) + '</span>\n';
			html += '<i class="arrow"></i>\n';
		html += '</a>\n';

		return html;
	}


	_self = {
		init   : init,
		toggle : toggle,
		hide   : function(){ toggle( 'off' ); },
		show   : function(){ toggle( 'on' ); }
	};

	return _self;

}());