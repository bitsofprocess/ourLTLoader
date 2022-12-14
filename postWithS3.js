const { getDynamoTable, addQuestSetToDynamo } = require('./modules/aws');
const {
	getValidationDetails,
	validateCriteria,
} = require('./modules/validation');

const { checkTableForTeamId } = require('./modules/validation');

const {
	csvToJson,
	assignIndexes,
	getNewSetId,
	wrapQuestionSet,
	addToExistingTable,
} = require('./modules/format');

const { getCsvFromS3 } = require('./s3Test');

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

// Create DynamoDB service object
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.postWithS3 = async (file, dynamodb, title, owner, team_id) => {
	try {
		const questionsArray = await getCsvFromS3(file);

		const dynamoTable = await getDynamoTable(dynamodb);

		const validationCriteriaObject = await getValidationDetails(
			questionsArray,
			title,
			dynamoTable,
			team_id
		);

		const allCriteriaValid = await validateCriteria(
			validationCriteriaObject
		);
		
		const teamIdExistsInDynamo = await checkTableForTeamId(
			dynamoTable,
			team_id
		);
		
		if (!allCriteriaValid) {
		} else {
			const structuredQuestions = await assignIndexes(questionsArray);
		
			const newSetId = await getNewSetId(
				teamIdExistsInDynamo,
				dynamoTable,
				team_id
			);
		
			const wrappedQuestionSet = await wrapQuestionSet(
				teamIdExistsInDynamo,
				newSetId,
				owner,
				title,
				structuredQuestions
			);
		
			const updatedQuestionSetArray = await addToExistingTable(
				wrappedQuestionSet,
				dynamoTable,
				team_id
			);
		
			const result = await addQuestSetToDynamo(
				team_id,
				updatedQuestionSetArray,
				dynamodb
			);
		}
	} catch (err) {
		console.error(err);
		throw new Error(err);
	}
};

