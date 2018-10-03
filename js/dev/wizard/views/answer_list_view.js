define([
	'marionette',
	'views/answer_view',
	'tpl!templates/answer_list.tpl'
], function( Marionette, AnswerView, answerListTpl ){

	var AnswerListView = Marionette.CompositeView.extend({
	    className : 'answer-list-wrap',
	    template  : answerListTpl,

	    itemView          : AnswerView,
	    itemViewContainer : '.answer-list-inner-wrap',

	    ui : {
	    	nextBtn : '.wizard-next-step button'
	    },

	    events : {
	    	'click @ui.nextBtn' : 'showFinalStep'
	    },

	    onRender : function(){
	    	var $el = this.$el,
	    		view = this;


	    	setTimeout(function(){
	    		$el.addClass('animate-in');
	    	}, 16);

	    	if( this.currentStep === 5 ){
	    		setTimeout(function(){
	    			view.watchWindowHeight();
	    		}, 120 );
	    	}
	    },

	    onClose : function(){
	    	$(window).off('resize.answer_list');
	    },

	    initialize : function( options ){
	    	this.app = options.app;
	    	this.currentStep = this.app.appModel.get('currentStep');
	    },

	    showFinalStep : function(){

	    	// Only go on if 1+ packages are selected
	    	var selectedPackages = this.app.appModel.get('selectedPackages');
	    	if( selectedPackages.length === 0 ){

	    		this.app.vent.trigger('alert:no:packages');
	    		return;
	    	}


	    	this.app.vent.trigger('answer:selected', {
	    		step       : 5,
	    		next       : 6,
	    		breadcrumb : 'Packages'
	    	});
	    },

	    _timeout : null,
	    watchWindowHeight : function(){
	    	var view = this;
	    	this.toggleFixedNextStep();

	    	console.log('watchWindowheight');

	    	$(window).on('resize.answer_list', function(){
	    		clearTimeout( view._timeout );
	    		view._timeout = setTimeout(function(){
	    			view.toggleFixedNextStep();
	    		}, 200);
	    	});
	    },

	    $pageHeader  : null,
	    $pageContent : null,
	    toggleFixedNextStep : function(){
	    	this.$pageHeader   = this.$pageHeader || $('.page-header');
	    	this.$pageContent  = this.$pageContent || $('.page-content');

	    	var	headerHeight  = this.$pageHeader.height(),
	    		contentHeight = this.$pageContent.height(),
	    		windowHeight  = $(window).height(),
	    		showClass     = false;

	    	console.log('toggleFixedNextStep', headerHeight, contentHeight, windowHeight );
	    	console.log( this.$pageHeader, this.$pageHeader );

	    	showClass = ( headerHeight + contentHeight + 50 ) > windowHeight;

	    	this.$el.find('.wizard-next-step').toggleClass('fixed', showClass )
	    }
	});

	return AnswerListView;
});