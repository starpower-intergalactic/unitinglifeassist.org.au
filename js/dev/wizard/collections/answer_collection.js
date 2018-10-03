define([
	'backbone',
	'models/answer_model'
], function( Backbone, AnswerModel ){

	var AnswerCollection = Backbone.Collection.extend({

		model : AnswerModel,

		initialize : function( models, options ){
			console.log('AnswerCollection:initialize', options);
			this.packagesCollection = options.packages;
			this.on('reset', this.addPackageInfoToStep5Answers );
		},

		addPackageInfoToStep5Answers : function(){
			var step5Models       = this.where({ step : 5 }),
				packageCollection = this.packagesCollection;

			// console.log('step5Models', step5Models );

			_.each(step5Models, function( model ){
				var packageName = model.get('answer'),
					packageId   = model.get('packageId'),
					packageInfo = packageCollection.findWhere({ id : packageId });

				// console.log('getting info for', packageName, packageInfo );

				if( packageInfo ){
					// console.log('package found, setting description to', packageInfo.get('description'));
					model.set({
						answer    : packageInfo.get('title'),
						shortText : packageInfo.get('shortText'),
						fullText  : packageInfo.get('fullText')
					});
				}
				else {
					console.log('Could not find package info for model', model.get('id'),model.get('answer'),' with packageId', packageId);
					model.set({
						shortText : '',
						fullText  : ''			
					});
				}
			});
		},

	    getAnswers : function( config ){
	        var step           = config.step,
	        	parentAnswer   = config.parentAnswer,
	        	disabilityPath = config.disabilityPath,
	        	filteredAnswers = this.filter(function( answer ){
	        		if( step === 5 && answer.get('id') == 99999 ){
	        			return true;
	        		}
	        		else if( step === 2 && answer.get('id') == 99998 ){
	        			return true;
	        		}
	        		else if( step === 4 && disabilityPath && answer.get('isNDISOption') ){
	        			return true;
	        		}

	            	return answer.get('parentId') === parentAnswer && answer.get('step') === step;
	        	}),
	        	answerCount = filteredAnswers.length;

	        if( answerCount < 6 ){
	        	filteredAnswers = this.addDummyModels( filteredAnswers, 6 - answerCount );
	        }
	        else if( answerCount > 6 ){
	        	filteredAnswers = this.addDummyModels( filteredAnswers, 9 - answerCount );	
	        }

	        return filteredAnswers;
	    },

	    addDummyModels : function( answers, addCount ){
	    	var model;

	    	for(var i = 0; i < addCount; i++ ){
	    		model = new AnswerModel({
	    			empty : true
	    		});
	    		answers.push( model );
	    	}

	    	return answers;
	    }
	});

	return AnswerCollection;
});