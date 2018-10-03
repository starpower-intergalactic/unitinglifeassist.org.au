define([
	'marionette',
	'tpl!templates/done.tpl'
], function( Marionette, doneTpl ){

	var DoneView = Marionette.ItemView.extend({
		template : doneTpl,
		events : {
			'click' : 'triggerFirstStep'
		},
		initialize : function( options ){
			this.app = options.app;
		},
		triggerFirstStep : function(){
			this.app.vent.trigger('show:step', 1 );
		}
	});

	return DoneView;
});