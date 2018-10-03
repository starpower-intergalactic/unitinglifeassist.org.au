define([
    'backbone'
], function( Backbone ){

    var FormModel = Backbone.Model.extend({
        defaults : {
            form_action : '#',

            title      : '',
            first_name : '',
            last_name  : '',
            home_phone : '',
            email      : '',
            mobile     : '',
            postcode   : '',
            suburb     : '',
            state      : '',

            personal_interpreter          : '',
            personal_interpreter_language : '',
            services_start                : '',

            family_name                 : '',
            family_relationship         : '',
            family_suburb               : '',
            family_state                : '',
            family_phone                : '',
            family_email                : '',
            family_method_of_contact    : '',
            family_who_to_contact       : '',
            family_interpreter          : '',
            family_interpreter_language : '',
            family_consent              : '',

            patient_relationship                : '',
            patient_discharge_date              : '',
            patient_diagnosis                   : '',
            patient_formal_supports             : '',
            patient_formal_support_case_manager : '',
            patient_formal_support_contact      : '',
            patient_formal_support_type         : '',
            patient_informal_support            : '',
            patient_informal_support_name       : '',
            patient_informal_support_contact    : '',
            patient_informal_support_type       : '',
            patient_name                        : '',
            patient_suburb                      : '',
            patient_state                       : '',
            patient_phone                       : '',
            patient_email                       : '',
            patient_method_of_contact           : '',
            patient_who_to_contact              : '',
            patient_interpreter                 : '',
            patient_interpreter_language        : '',
            patient_consent                     : '',

            method_of_contact : '',
            terms             : '',
            msg_comments      : '',
            smallprint        : '',

            selectedAnswers  : '',
            selectedPackages : '',
            targetEmail      : ''
        },
        initialize : function(){
            this.getSmallprint();
        },
        getSmallprint : function(){
            if( typeof window.smallprint !== 'string' ){
                window.smallprint = $('#terms_source').html() || '';
            }
            this.set('smallprint', window.smallprint );
        }
    });

    return FormModel;
});