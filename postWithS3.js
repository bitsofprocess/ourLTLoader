const myCredentials = {
  accessKeyId: process.argv[2],
  secretAccessKey: process.argv[3],
};

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

// Set the region
AWS.config = new AWS.Config({
  credentials: myCredentials,
  region: "us-east-1",
});

//******

const { getDynamoTable, addQuestSetToDynamo } = require('./modules/aws');
const {
	getValidationDetails,
	validateCriteria,
} = require('./modules/validation');

const { checkTableForTeamId } = require('./modules/validation');

const {
	assignIndexes,
	getNewSetId,
	wrapQuestionSet,
	addToExistingTable,
} = require('./modules/format');

const { getCsvFromS3 } = require('./s3Test');

const { addNewTeamToDynamo } = require('./modules/aws');

// Load the AWS SDK for Node.js
// const AWS = require('aws-sdk');

// Create DynamoDB service object
const dynamodb = new AWS.DynamoDB.DocumentClient();

// module.exports.
const postWithS3 = async (file, dynamodb, title, owner, team_id) => {
	// let result;
	try {
	// const dynamoTable = await getDynamoTable(dynamodb);
	// console.log(dynamoTable)

		const questionsArray = await getCsvFromS3(file);
	// 	console.log('questionsArray' + questionsArray);

		const dynamoTable = await getDynamoTable(dynamodb);
		console.log('dynamoTable' + JSON.stringify(dynamoTable));

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
		
		// console.log(teamIdExistsInDynamo);

		if (!allCriteriaValid) {
			console.log(validationCriteriaObject);
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
		
			result = await addQuestSetToDynamo(
				team_id,
				updatedQuestionSetArray,
				dynamodb
			);
		}
	
	} 
	catch (err) {
		console.error(err);
		throw new Error(err);
	}
// return result;
};

// const file = 'test.csv'
// const title = 'Quiz 1'
// const owner = "google923028492834"
// const team_id = 'OOOO'

// postWithS3(file, dynamodb, title, owner, team_id);