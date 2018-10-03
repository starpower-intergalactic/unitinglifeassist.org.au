define('jquery', [], function(){
    return jQuery;
});

requirejs.config({
    // baseUrl : '../js/dev/wizard/',
    baseUrl : '/templates/life_assist/js/dev/wizard/',
    paths : {
        backbone   : '../../libs/backbone',
        marionette : '../../libs/backbone.marionette.min',
        underscore : '../../libs/underscore',
        tpl        : '../../libs/tpl'
    },
    shim : {
        backbone : {
            exports : 'Backbone'
        },
        marionette : {
            deps    : ['backbone'],
            exports : 'Marionette'
        },
        underscore : {
            exports : '_'
        }
    }
});

require([
    'wizard',
    'router'
], function( Wizard, Router ){

    window.Wizard = Wizard;

    Wizard.start();

});
