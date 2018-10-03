define([
	'marionette',
	'wizard',
	'tpl!templates/answer.tpl',
	'tpl!templates/answer_package.tpl'
], function( Marionette, App, answerTpl, answerPackageTpl ){

	var AnswerView = Marionette.ItemView.extend({

	    // template  : function( serializedModel ){
	    // 	console.log( typeof answerTpl );
	    // 	return serializedModel.step === 5 ? answerPackageTpl : answerTpl;
	    // },
	    // template : answerTpl,
	    className : function(){
	        var className    = 'wizard-answer',
	            step         = this.model.get('step'),
	            id           = this.model.get('id'),
	            isEmptyDummy = this.model.get('empty'),
	            isNDISOption = this.model.get('isNDISOption');

	        function isSelected( step, id ){
	        	var selected = false;

	            if( step < 5 ){
	            	selected = ( id === Wizard.appModel.getAnswerForStep( step ) );
	            }
	            else {
	            	selected = Wizard.appModel.isPackageSelected( id );
	            }

	            return selected;
	        }

	        if( step === 5 ){
	        	className += ' answer--package';
	        }

	        if( isNDISOption ){
	        	className += ' answer--package answer--ndis';
	        }

	        if( isSelected( step, id ) ){
	        	this.isSelected = true;
	            className += ' answer--selected';
	        }

	        if( isEmptyDummy ){
	        	className += ' answer--empty';
	        }

	        return className;
	    },

	    isSelected : false,

	    ui : {
	        selectBtn     : '.btn',
	        readMore      : '.package-read-more',
	        fullText      : '.package-full-text',
	        fullTextClose : '.full-text-close'
	    },

	    events : {
	        'click @ui.selectBtn'     : 'selectAnswer',
	        'click @ui.readMore'      : 'toggleReadMore',
	        'click @ui.fullTextClose' : 'toggleReadMore'
	    },

	    onRender : function(){
	    	if( this.isSelected ){
	    		this.ui.selectBtn.html('SELECTED<i class="icon icon--check"></i>');
	    	}
	    },

	    initialize : function(){
	    	this.template = ( this.model.get('step') === 5 ? answerPackageTpl : answerTpl );
	    },

	    selectAnswer : function(event){
	        console.log('answer selected', this.model.get('id'), 'step', this.model.get('step') );

	        var step  = this.model.get('step'),
	            model = this.model,
	            id    = this.model.get('id');

	        if( id === 99998 ){
	        	window.location = 'http://www.lifeassist.org.au/contact';
	        	return;
	        }
	        else if( id === 11300 ){
	        	window.location = 'http://www.lifeassist.org.au/transferring-a-home-care-package';
	        	return;
	        }
	        else if( id === 21300 ){
	        	window.location = 'http://www.lifeassist.org.au/transferring-a-home-care-package-for-a-friend';
	        	return;
	        }

	        if( step === 5 ){
	        	// Step 5 has multiple selects
	        	this.togglePackage();
	        }
	        else {
	        	this.triggerNextStep();
	        }      
	    },

	    toggleReadMore : function(e){
	    	e.preventDefault();
	    	this.ui.fullText.fadeToggle();
	    },

	    triggerNextStep: function(){
	    	this.$el
	    	    .addClass('answer--selected')
	    	    .siblings().removeClass('answer--selected');

	    	App.vent.trigger('answer:selected', {
	    		answer       : this.model.get('id'),
	    		step         : this.model.get('step'),
	    		next         : this.model.get('next'),
	    		breadcrumb   : this.model.get('breadcrumb'),
	    		isNDISOption : this.model.get('isNDISOption')
	    	});
	    },

	    togglePackage : function(){
	        this.isSelected = !this.isSelected;
	        this.$el.toggleClass('answer--selected', this.isSelected );

	        if( this.isSelected ){
	        	this.ui.selectBtn.html('SELECTED<i class="icon icon--check"></i>');
	        }
	        else {
	        	this.ui.selectBtn.html('SELECT');
	        }

	        App.vent.trigger('toggle:package', {
	        	id     : this.model.get('id'),
	        	action : this.isSelected ? 'add' : 'remove'
	        });
	    }
	});
	

	return AnswerView;
});