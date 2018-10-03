define([
    'marionette',
    'tpl!templates/step_nav_view.tpl'
], function( Marionette, stepNavTpl ){

    var StepNavView = Marionette.ItemView.extend({

        template  : stepNavTpl,
        className : 'view-wrapper',
        
        ui : {
            doneSteps  : '.step--done',
            activeStep : '.step--active'
        },

        events : {
            'click @ui.doneSteps'  : 'goToStep',
            'click @ui.activeStep' : 'goToStep'
        },

        onRender : function(){
            var view = this;
            if( $(window).width() < 481 ){
                setTimeout(function(){
                    // view.makeSticky();
                }, 400);
            }

            setTimeout(function(){
                $('.wizard-navigation').addClass('show');
            }, 16);
        },

        initialize : function( options ){
            this.app = options.app;
            this.listenTo( this.model, 'change', this.render );
        },

        goToStep : function( event ){
            var $target   = $(event.currentTarget),
                stepIndex = $target.data('step-index');

            if( $target.hasClass('step--showing') ){ return; }

            if( stepIndex === 6 ){
                // Check if any packages selected
                var selectedPackages = this.app.appModel.get('selectedPackages');
                if( selectedPackages.length === 0 ){

                    this.app.vent.trigger('alert:no:packages');
                    return;
                }
            }

            console.log('goToStep', stepIndex );
            this.app.vent.trigger('show:step', stepIndex ); 
        },

        makeSticky : function(){

            if( typeof window.scrollY === 'undefined' && typeof window.pageYOffset === 'undefined' ){
                return;
            }

            var $el = $('.wizard-header'),
                triggerPoint = $el.offset().top,
                view         = this;

                console.log('triggerPoint', triggerPoint);


            $(window).on('scroll', function(){
                // console.log('Scrolling', ( window.scrollY > triggerPoint ), window.scrollY );
                var scrollY = ( typeof window.pageYOffset === 'undefined' ) ? window.scrollY : window.pageYOffset;

                if( window.scrollY > triggerPoint ){
                    $el.addClass('fixed');
                    $('.wizard-wrap').css({
                        paddingTop : $el.height() + 'px'
                    });
                }
                else {
                    $el.removeClass('fixed');
                    $('.wizard-wrap').css({
                        paddingTop : 0
                    });
                }

                
            });
        }
    });

    return StepNavView;

});