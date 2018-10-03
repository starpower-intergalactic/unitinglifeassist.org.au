define([
    'marionette',
    'models/wizard_model',
    'collections/answer_collection',
    'views/step_nav_view',
    'data/data-answers',
    'data/data-packages'
], function( Marionette, WizardModel, AnswerCollection, StepNavView, AnswerData, PackageData ){

    window.AnswerData = AnswerData;

    // APP

    var Wizard = new Marionette.Application();

    Wizard.alert = function(message){
        window.alert.apply(window, message);
    };

    Wizard.addRegions({
        navRegion     : '#wizard-nav',
        answerRegion : '#wizard-answers'
    });

    Wizard.emailFormAction       = '';
    Wizard.clientEmailFormAction = '';


    // START

    Wizard.addInitializer(function(){
        console.log('App initializing');

        this.emailFormAction       = $.trim( $('#selector_form_action').html() );
        this.clientEmailFormAction = $.trim( $('#email_confirmation_form_action').html() );

        // Create model representing the state of the app
        this.appModel = new WizardModel();
        window.appModel = this.appModel;

        // Create view for the app navigation
        this.stepNavView = new StepNavView({
            app   : this,
            model : this.appModel
        });

        this.navRegion.show( this.stepNavView );
    });

    Wizard.on('start', function(){

        this.packageCollection = new Backbone.Collection( PackageData );
        this.answerCollection  = new AnswerCollection([], {
            packages : this.packageCollection
        });
        this.answerCollection.reset( AnswerData );
        this.vent.trigger('show:step', 1 );
        
    });

    return Wizard;

});