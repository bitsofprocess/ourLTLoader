const csv = require('csvtojson');

module.exports.csvToJson = async (csvFilePath) => {
	try {
		const data = await csv().fromFile(csvFilePath);

		// log the JSON array
		return data;
	} catch (err) {
		console.log(err);
	}
};

module.exports.assignIndexes = async (questionsArray) => {
	function generateRandomInteger(max) {
		return Math.floor(Math.random() * max);
	}

	let newJson = questionsArray.map((question) => {
		const correct_answer = generateRandomInteger(4);
		const incorrectAnswerArray = [
			question.wrong_answer_1,
			question.wrong_answer_2,
			question.wrong_answer_3,
		];

		let shuffledAnswers = incorrectAnswerArray.sort(
			(a, b) => 0.5 - Math.random()
		);
		shuffledAnswers.splice(correct_answer, 0, question.correct_answer);

		const json = {
			question: question.question,
			correct_answer: correct_answer,
			answers: shuffledAnswers,
		};

		return json;
	});

	return newJson;
};

module.exports.getNewSetId = async (teamIdExistsInDynamo, dynamoTable, team_id) => {
	let newSetId;
	
	if (teamIdExistsInDynamo) {
		dynamoTable.map(teamObj => {
			if (teamObj.team_id === team_id) {
				const questionSets = teamObj.question_sets;
				let existingSetIds = questionSets.map(set => set.set_id);

				newSetId = Math.max(...existingSetIds) + 1;
			} 
			
		})
	} else {
		newSetId = 1
	}
	
	return newSetId;
}


module.exports.wrapQuestionSet = async (
	teamIdExistsInDynamo,
	newSetId,
	owner,
	title,
	structuredQuestions
) => {
	
	// let wrappedQuestionSet;

	// if (teamIdExistsInDynamo) {
		let wrappedQuestionSet = {
			set_id: newSetId,
			owner: owner,
			title: title,
			questions: structuredQuestions,
		};
	// } else {
	// 	wrappedQuestionSet = [{
	// 		set_id: newSetId,
	// 		owner: owner,
	// 		title: title,
	// 		questions: structuredQuestions,
	// 	}];
	// }

	return wrappedQuestionSet;
};

module.exports.addToExistingTable = async (wrappedQuestionSet, dynamoTable, team_id) => {
	
	const newTable = dynamoTable;

	//*** let existingTeamIds = newTable.map(teamObj => teamObj.team_id)

	// let existingTeamIds = [];
	// newTable.forEach(teamObj => {
	// 	existingTeamIds.push(teamObj.team_id);
		
	// })
	
	// if (!existingTeamIds.includes(team_id)) {
	// 	const newTeamObj = {
	// 		question_sets: wrappedQuestionSet,
	// 		team_id: team_id
	// 	}

	// 	newTable.push(newTeamObj);

	// } else if (existingTeamIds.includes(team_id)) {
		let updatedQuestionSet;

		newTable.map(teamObj => {
			if (teamObj.team_id === team_id) {
				updatedQuestionSet = [...teamObj.question_sets, wrappedQuestionSet]
				// teamObj.question_sets.push(wrappedQuestionSet);
			} else {
				'format.addToExistingTable error'
			}
		}) 

		return updatedQuestionSet;
	// } else {
	// 	return 'addToExistingTable function error';
	// } return newTable;
	// newTable.forEach(teamObj => {
	// 	if (teamObj.team_id === team_id) {
	// 	  teamObj.question_sets.push(wrappedQuestionSet)
	// 	}
	// });
};
