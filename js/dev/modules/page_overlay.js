var PageOverlay = (function(){

	'use strict';

	var _self = {},
		$overlay,
		isVisible = false;

	function init(){

		$overlay = $('.page-overlay');

		bindEvents();
	}

	function bindEvents(){

		$(document).on('hide-overlay', function(){ toggle( false ); });
		$(document).on('show-overlay', function( event, mode ){ toggle( true, mode ); });
	}

	function toggle( changeTo, mode ){

		if( changeTo ){
			isVisible = true;
			$overlay.addClass('show' + ( mode === 'full' ? ' full' : '' ) );
		}
		else {
			isVisible = false;
			$overlay.removeClass('show full');
		}
	}


	_self = {
		init   : init,
		toggle : toggle,
		hide   : function(){ toggle( false ); },
		show   : function(){ toggle( true ); }
	};

	return _self;

}());