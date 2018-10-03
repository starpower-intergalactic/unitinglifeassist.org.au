define([

    'wizard',

    'models/form_model',

    'views/final_step_layout',
    'views/answer_list_view',
    'views/form_view',
    'views/package_list_view',
    'views/done_view',
    'helpers/email_generator'

], function( App, FormModel, FinalStepLayout, AnswerListView, FormView, PackageListView, DoneView, EmailGenerator ){

    App.module('Controllers', function( Controllers, App, Backbone, Marionette, $, _ ){

        window.EmailGenerator = EmailGenerator;

        // --------------------------------------------------------------------- //

        Controllers.StepController = {};


        // --------------------------------------------------------------------- //


        Controllers.StepController.showStep = function( step ){

            console.log('@controller:StepController.showStep', step );

            if( typeof step !== 'number' || step < 1 || step > 6 ){
                throw new Error('Invalid step number: ' + step );
            }

            App.appModel.set('currentStep', step );

            if( step === 6 ){
                // Last step, show the signup form
                this.showForm();
                return;
            }

            var parentAnswer   = App.appModel.getParentAnswerForStep( step ),
                answersForStep = App.answerCollection.getAnswers({
                    step           : step,
                    parentAnswer   : parentAnswer,
                    disabilityPath : App.appModel.get('step_2_breadcrumb') === 'Disability'
                }),
                answerListView;

            console.log('SHOW STEP:');
            console.log('parentAnswer', parentAnswer);
            console.log('answersForStep', answersForStep);

            answerListView = new AnswerListView({
                app        : App,
                model      : new Backbone.Model({
                    stepShowing : step
                }),
                collection : new Backbone.Collection( answersForStep )
            });


            // App.answerRegion.show( answerListView );
            Controllers.StepController.switchMainView( answerListView );
        };


        // --------------------------------------------------------------------- //


        Controllers.StepController.showForm = function(){
            console.log('@controller:StepController.showForm' );

            var formData = App.appModel.get('formData');

            formData.form_action      = App.emailFormAction;
            formData.selectedAnswers  = EmailGenerator.getSelectedAnswers(App);
            formData.selectedPackages = EmailGenerator.getSelectedPackages(App);
            formData.targetEmail      = EmailGenerator.setTargetEmail(App);

            var layout   = new FinalStepLayout(),
                formView = new FormView({
                    model : new FormModel( formData ),
                    app   : App
                }),
                summaryView  = Controllers.StepController._createStepSummaryView(),
                packagesView = Controllers.StepController._createPackageListView();

            layout.on('show', function(){
                var $el = this.$el;
                setTimeout(function(){
                    $el.addClass('animate-in');
                }, 16 );
                
                this.formRegion.show( formView );
                this.packageListRegion.show( packagesView );
                this.stepSummaryRegion.show( summaryView );
            });

            // App.answerRegion.show( layout );
            Controllers.StepController.switchMainView( layout );
        };


        // --------------------------------------------------------------------- //


        Controllers.StepController._createPackageListView = function(){
            var selectedPackages = App.appModel.get('selectedPackages'),
                packages = App.answerCollection.filter(function(ans){
                    return selectedPackages.indexOf( ans.get('id') ) > -1;
                }),
                view = new PackageListView({
                    collection : new Backbone.Collection( packages ),
                    app        : App
                });

            return view;
        };


        // --------------------------------------------------------------------- //


        Controllers.StepController._createStepSummaryView = function(){

            // Get the models for the answers selecte in step 1 - 4

            var selectedAnswers = App.appModel.get('selectedAnswers');
            selectedAnswers = selectedAnswers.slice(1,5);

            var collection = App.answerCollection.filter(function(model){
                return selectedAnswers.indexOf( model.get('id') ) > -1;
            });
            collection = new Backbone.Collection( collection );

            console.log('collection', collection);

            // View setup

            var ItemView = Marionette.ItemView.extend({
                tagName : 'li',
                render : function(){
                    var answer = this.model.get('answer');
                    this.$el.html( answer );
                    return this;
                }
            });

            var CollectionView = Marionette.CollectionView.extend({
                itemView : ItemView
            });

            return new CollectionView({ collection : collection });
        };


        // --------------------------------------------------------------------- //


        Controllers.StepController.setAnswerForStep = function( params ){
            console.log('@controller:StepController.setAnswerForStep', params );

            var step              = params.step,
                next              = params.next,
                answerId          = params.answer,
                breadcrumb        = params.breadcrumb || ' - ',
                isNDISOption      = params.isNDISOption,
                updateObj         = {},
                lastCompletedStep = App.appModel.get('lastCompletedStep');

            if( !step || !next || ( next < 6 && !answerId ) ){
                throw new Error('Can set answer for this step, missing parameters!');
            }

            console.log('lastCompletedStep', lastCompletedStep, 'current step', step);
            if( step <= lastCompletedStep ){
                App.appModel.resetStepsFrom( step );
            }
            if( next > step + 1 ){
                App.appModel.setInactiveBetween( step, next );
            }

            if( isNDISOption ){
                this.togglePackage({
                    id     : 88884,
                    action : 'add'
                });
            }

            updateObj.lastCompletedStep = step;
            updateObj[ 'step_' + step + '_status' ]     = 'done';
            updateObj[ 'step_' + step + '_breadcrumb' ] = breadcrumb;
            updateObj[ 'step_' + next + '_status' ]     = 'active';

            App.appModel.set( updateObj );
            if( step < 5 ){
                App.appModel.setAnswer( step, answerId );
            }
            
            this.showStep( next );
        };


        // --------------------------------------------------------------------- //


        Controllers.StepController.togglePackage = function( params ){
            
            var packageId = params.id,
                action    = params.action;

            if( !packageId || ( action !== 'add' && action !== 'remove' ) ){
                throw new Error('Cannot toggle package, invalid params.');
            }

            if( action === 'add' ){
                App.appModel.addPackage( packageId );
            }
            else {
                App.appModel.removePackage( packageId );
            }

        };


        // --------------------------------------------------------------------- //


        Controllers.StepController.sendForm = function(){

            console.log('@StepController:sendForm');

            var DEBUG    = false,
                formData = EmailGenerator.createFormData( App ),
                doneView = new DoneView({
                    app : App
                }),
                sendDataDfr            = $.Deferred(),
                sendDataPromise        = sendDataDfr.promise(),
                sendClientEmailDfr     = $.Deferred(),
                sendClientEmailPromise = sendClientEmailDfr.promise(),
                dfrd     = $.Deferred(),
                minWait  = dfrd.promise(),
                promises = [];


            // MINIMUM WAIT PROMISE
            // The other AJAX request might resolve very quickly
            // which might make the user think something's gone
            // wrong. Adding a minimum wait.
            promises.push( minWait );
            setTimeout(function(){
                console.log('RESOLVING!')
                dfrd.resolve();
            }, 2.5*1000 );


            // SEND EMAIL TO USER IF EMAIL IS ENTERED
            if( formData.email && formData.email !== '' ){

                if( !DEBUG ){
                    $.ajax({
                        url      : App.clientEmailFormAction + '.js',
                        dataType : 'jsonp',
                        data     : formData
                    }).always(function(){
                        sendClientEmailDfr.resolve();
                    });
                }

                promises.push( sendClientEmailPromise );
            }


            // SAVE DATA AND SEND EMAIL TO LIFEASSIST
            if( !DEBUG ){
                $.ajax({
                    url      : App.emailFormAction + '.js',
                    dataType : 'jsonp',
                    data     : formData
                }).always(function(){
                    sendDataDfr.resolve();
                });
            }

            promises.push( sendDataPromise );



            $.when.apply( null, promises )
                .always(function(){
                    if( typeof window.ga === 'function' ){
                        ga('send', 'event', 'Form', 'click', 'contactus');
                    }

                    App.appModel.resetStepsFrom( 1 );
                    App.appModel.set( 'currentStep', 1 );
                    App.answerRegion.show( doneView );
                });
        };


        // --------------------------------------------------------------------- //

        Controllers.StepController.switchMainView = function( newView ){
            var currentView = App.answerRegion.currentView,
                delay = 1000;

            if( !currentView ){
                App.answerRegion.show( newView );
                return;
            }

            currentView.$el.removeClass('animate-in').addClass('animate-out');

            setTimeout(function(){
                App.answerRegion.show( newView );
            }, delay );
        };







        // --------------------------------------------------------------------- //
        
    });

    return App.Controllers;

});