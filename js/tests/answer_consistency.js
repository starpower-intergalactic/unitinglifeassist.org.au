var answersJSON = require('../json/wizard.json'),
	optionsWithoutAnswers = [];

function hasAnswers( id ){
	id = id+'';
	var answers = answersJSON.filter(function(ans){
		return id === ans.parentId;
	});

	return answers.length > 0;
}

answersJSON.forEach(function( ans ){
	if( ans.step < 5 && !hasAnswers(ans.id) ){
		optionsWithoutAnswers.push( ans.id );
	}
});

console.log('optionsWithoutAnswers', optionsWithoutAnswers );