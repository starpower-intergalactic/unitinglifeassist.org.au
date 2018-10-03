define([
    'wizard',
    'controllers/step_controller'
], function( App, StepController ){


    App.module('Router', function( Router, App, Backbone, Marionette, $, _ ){


        App.vent.on('show:step', function( step ){
            console.log('ROUTER', 'show:step', arguments);
            App.Controllers.StepController.showStep( step );
        });


        App.vent.on('show:form', function(){
            console.log('ROUTER', 'show:form', arguments);
            App.Controllers.StepController.showForm();
        });


        App.vent.on('answer:selected', function( params ){
            console.log('ROUTER', 'answer:selected', params);
            App.Controllers.StepController.setAnswerForStep( params );
        });

        
        App.vent.on('toggle:package', function( params ){
            console.log('ROUTER', 'toggle:package', params);
            App.Controllers.StepController.togglePackage( params );
        });


        App.vent.on('alert:no:packages', function(){
            App.alert('Please select at least 1 package.');
        });

        App.vent.on('wizard:form:submit', function(){
            App.Controllers.StepController.sendForm();
        });

    });

    return App.Router;
});
