define([
	'marionette',
	'tpl!templates/final_step_layout.tpl'
], function( Marionette, finalStepTpl ){

	var FinalStepLayout = Marionette.Layout.extend({
		
		className : 'wizard-form-step',

		template : finalStepTpl,

		regions : {
			stepSummaryRegion : '.step_summary',
			packageListRegion : '.package-list-region',
			formRegion        : '.column-2 .padded-content'
		}
	});

	return FinalStepLayout;
});