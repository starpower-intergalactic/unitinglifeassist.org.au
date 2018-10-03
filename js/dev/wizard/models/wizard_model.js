define([
    'backbone'
], function( Backbone ){

    var WizardModel = Backbone.Model.extend({
        defaults : {
            currentStep       : 1,
            lastCompletedStep : 0,

            step_1_status     : 'active',
            step_1_breadcrumb : '',

            step_2_status     : 'not-yet-selected',
            step_2_breadcrumb : '',

            step_3_status     : 'not-yet-selected',
            step_3_breadcrumb : '',

            step_4_status     : 'not-yet-selected',
            step_4_breadcrumb : '',

            step_5_status     : 'not-yet-selected',
            step_5_breadcrumb : '',

            step_6_status     : 'not-yet-selected',
            step_6_breadcrumb : '',

            selectedAnswers   : [ null, null, null, null, null, null ],

            selectedPackages  : [],

            formData          : {}
        },

        initialize : function(){

        },

        enquiryReference : function(){
            var answers = this.get('selectedAnswers'),
                answerOne = answers[1]+'',
                reference = {
                    '10000' : 'myself',
                    '20000' : 'family',
                    '30000' : 'patient'
                };

            return reference[answerOne] || 'not selected';
        },

        getAnswerForStep : function( step ){
            var answers = this.get('selectedAnswers');

            if( step < 0 || step > 4 ){
                throw new Error('Can only get answers for steps 1 to 4');
            }

            return answers[ step ];
        },

        getParentAnswerForStep : function( step ){
            var lastValidStep = step - 1;

            console.log('getParentAnswerForStep for step', step );

            if( step === 1 ){
                return null;
            }

            while( this.get('step_'+lastValidStep+'_status') !== 'done' && lastValidStep > 0 ){
                console.log('Going back 1 step');
                lastValidStep -= 1;
            }

            if( lastValidStep < 1 ){
                throw new Error('Could not find a valid parent step.');
            }

            console.log('Last valid parent step is', lastValidStep);

            return this.getAnswerForStep( lastValidStep );
        },

        setAnswer : function( step, answer ){
            var answers = this.get('selectedAnswers');

            if( step < 1 || step > 4 ){
                throw new Error('Can only set answers for steps 1 to 4');
            }

            answers = _.map( answers, function( aw, i ){
                if( i < step ){
                    return aw;
                }
                if( i === step ){
                    return answer;
                }
                else {
                    return null;
                }
            });

            this.set('selectedAnswers', answers);

            return answers;
        },

        resetStepsFrom : function( step ){
            
            for(var max = 7; step < max; step++ ){

                this.resetStep( step );
            }
        },

        // setStatus : function( step, config ){
        //     var setObj     = {},
        //         breadcrumb = config.breadcrumb || '',
        //         answer     = config.answer || null,
        //         status     = config.status || '';

        //     if( status === '' && answer !== null ){
        //         status = 'done';
        //     }
        //     if( answer === null && status === '' ){
        //         status = 'not-yet-selected';
        //     }

        //     setObj['step_'+step+'_status']     = status;
        //     setObj['step_'+step+'_breadcrumb'] = breadcrumb;

        //     if( step < 5 ){
        //         // set next step's parent to the selected answer
        //         setObj['step_'+(step+1)+'_parent']     = answer;
        //     }

        //     console.log('@model:setStatus', setObj);

        //     this.set( setObj );
        // },

        resetStep : function( step ){
            var resetObj = {};

            if( step < 0 || step > 6 ){
                throw new Error('Cannot reset step. Step must be in between 1 and 5');
            }

            resetObj['step_'+step+'_status']     = step === 1 ? 'active' : 'not-yet-selected';
            resetObj['step_'+step+'_breadcrumb'] = '';

            this.set( resetObj );

            if( step === 5 ){
                this.set('selectedPackages', []);
            }

            return true;
        },

        // setInactive : function( from, to ){
        //     for(var i = from+1; i < to; i++ ){
        //         this.setStatus(i, {
        //             status : 'inactive'
        //         });
        //     }
        // },

        // setCurrent : function( answer, nextStep ){
        //     var previousCurrent = this.get('currentStep');

        //     this.setAnswer( previousCurrent, answer);

        //     this.set('currentStep', nextStep );
        //     this.setStatus( nextStep, {
        //         status : 'active'
        //     });


        //     if( previousCurrent > nextStep ){
        //         this.setInactive( step, previousCurrent );
        //     }
        // },

        addPackage : function( packageId ){
            var selectedPackages = this.get('selectedPackages');

            if( _.indexOf( selectedPackages, packageId ) > -1 ){
                console.log('Package already selected');
                return;
            }

            selectedPackages.push( packageId );
            this.set('selectedPackages', selectedPackages );

            return selectedPackages;
        },  

        removePackage : function( packageId ){
            var selectedPackages = this.get('selectedPackages');

            selectedPackages = _.without( selectedPackages, packageId );
            this.set('selectedPackages', selectedPackages );

            return selectedPackages;
        },

        isPackageSelected : function( packageId ){
            var selectedPackages = this.get('selectedPackages');
            return _.indexOf( selectedPackages, packageId ) > -1;
        },

        setInactiveBetween : function( from, to ){

            for( var i = from + 1; i < to; i++ ){
                this.set('step_'+i+'_status','inactive');
                this.set('step_'+i+'_breadcrumb','n/a');
            }
        }
    });

    return WizardModel;
});