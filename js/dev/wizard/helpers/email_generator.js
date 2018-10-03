define([

], function(){

	var EmailGenerator = {
		createFormData : function( app ){

			// FORM DATA

			var modelFormData = app.appModel.get('formData'),
				formData = {
					title             : modelFormData.title,
					first_name        : modelFormData.first_name,
					last_name         : modelFormData.last_name,
					home_phone        : modelFormData.home_phone,
					mobile            : modelFormData.mobile,
					email             : modelFormData.email,
					postcode          : modelFormData.postcode,
					suburb            : modelFormData.suburb,
					state             : modelFormData.state,
					'interests[]'     : 3,
					'life_assist[method_of_contact]' : modelFormData.method_of_contact,
					'life_assist[msg_comments]'      : modelFormData.msg_comments,

					'life_assist[personal_interpreter]'          : modelFormData.personal_interpreter,
					'life_assist[personal_interpreter_language]' : modelFormData.personal_interpreter_language,
					'life_assist[services_start]'                : modelFormData.services_start,

					'life_assist[family_name]'                 : modelFormData.family_name,
					'life_assist[family_relationship]'         : modelFormData.family_relationship,
					'life_assist[family_suburb]'               : modelFormData.family_suburb,
					'life_assist[family_state]'                : modelFormData.family_state,
					'life_assist[family_phone]'                : modelFormData.family_phone,
					'life_assist[family_email]'                : modelFormData.family_email,
					'life_assist[family_method_of_contact]'    : modelFormData.family_method_of_contact,
					'life_assist[family_who_to_contact]'       : modelFormData.family_who_to_contact,
					'life_assist[family_interpreter]'          : modelFormData.family_interpreter,
					'life_assist[family_interpreter_language]' : modelFormData.family_interpreter_language,
					'life_assist[family_consent]'              : modelFormData.family_consent,

					'life_assist[patient_relationship]'                : modelFormData.patient_relationship,
					'life_assist[patient_discharge_date]'              : modelFormData.patient_discharge_date,
					'life_assist[patient_diagnosis]'                   : modelFormData.patient_diagnosis,
					'life_assist[patient_formal_supports]'             : modelFormData.patient_formal_supports,
					'life_assist[patient_formal_support_case_manager]' : modelFormData.patient_formal_support_case_manager,
					'life_assist[patient_formal_support_contact]'      : modelFormData.patient_formal_support_contact,
					'life_assist[patient_formal_support_type]'         : modelFormData.patient_formal_support_type,
					'life_assist[patient_informal_support]'            : modelFormData.patient_informal_support,
					'life_assist[patient_informal_support_name]'       : modelFormData.patient_informal_support_name,
					'life_assist[patient_informal_support_contact]'    : modelFormData.patient_informal_support_contact,
					'life_assist[patient_informal_support_type]'       : modelFormData.patient_informal_support_type,
					'life_assist[patient_name]'                        : modelFormData.patient_name,
					'life_assist[patient_suburb]'                      : modelFormData.patient_suburb,
					'life_assist[patient_state]'                       : modelFormData.patient_state,
					'life_assist[patient_phone]'                       : modelFormData.patient_phone,
					'life_assist[patient_email]'                       : modelFormData.patient_email,
					'life_assist[patient_method_of_contact]'           : modelFormData.patient_method_of_contact,
					'life_assist[patient_who_to_contact]'              : modelFormData.patient_who_to_contact,
					'life_assist[patient_interpreter]'                 : modelFormData.patient_interpreter,
					'life_assist[patient_interpreter_language]'        : modelFormData.patient_interpreter_language,
					'life_assist[patient_consent]'                     : modelFormData.patient_consent,
				};

			formData['life_assist[answers]']      = this.getSelectedAnswers(app);
			formData['life_assist[packages]']     = this.getSelectedPackages(app);
			formData['life_assist[target_email]'] = this.setTargetEmail(app);

			console.log( 'formData', formData );
			return formData;
		},

		getSelectedPackages: function(app){
			// SELECTED PACKAGES

			var selectedPackages = app.appModel.get('selectedPackages'),
				// packageModels    = app.answerCollection.filter(function( model ){
				// 	console.log('is')
				// 	return model.get('id') !== null && _.indexOf(selectedPackages, model.get('id')) > 1
				// });
				packageModels = _.map(selectedPackages, function( packageId ){
					// console.log('getting package model for', packageId);
					// console.log('-> ', app.answerCollection.findWhere({ id : packageId }) );
					return app.answerCollection.findWhere({ id : packageId });
				});


			packageModels = _.map(packageModels, function(m){ return m.get('answer'); });
			packageModels = '- ' + packageModels.join('\n- ');

			return packageModels;
		},

		getSelectedAnswers : function(app){
			// SELECTED ANSWERS

			var selectedAnswers = app.appModel.get('selectedAnswers'),
				answerModels    = app.answerCollection.filter(function( model ){
					return model.get('id') !== null && _.indexOf(selectedAnswers, model.get('id')) > -1;
				});

			answerModels = _.map( answerModels, function(m){ return m.get('answer'); });
			answerModels = '- ' + answerModels.join('\r\n- ');

			return answerModels;
		},
		
		setTargetEmail : function(app){
			var selectedAnswers = app.appModel.get('selectedAnswers');

			// Any NDIS packages selected?
			if( _.some(selectedAnswers, function(id){ return id === 88881 || id === 88882 || id === 88883; }) ){
				return 'ndis@lifeassist.org.au';
			}
			else if( appModel.enquiryReference() === 'patient' ){
				// Professional enquiry
				return 'referrals@lifeassist.org.au';
			}

			// Default
			return 'help@lifeassist.org.au';
		}
	};

	return EmailGenerator;
});