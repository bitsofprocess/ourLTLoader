const { getDynamoTable, addToDynamo } = require("./modules/aws");
const {
	getValidationDetails,
	validateCriteria,
} = require("./modules/validation");
const {
	csvToJson,
	assignIndexes,
	getNewSetId,
	wrapQuestionSet,
	addToExistingTable,
} = require("./modules/format");

const csvFile = process.argv[2];
const myCredentials = {
	accessKeyId: process.argv[3],
	secretAccessKey: process.argv[4],
};

// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");

// Set the region
AWS.config = new AWS.Config({
	credentials: myCredentials,
	region: "us-east-1",
});

// Create DynamoDB service object
const dynamodb = new AWS.DynamoDB.DocumentClient();

const postOurLT = async (file, dynamodb, title, owner, team_id) => {
	try {
		const questionsArray = await csvToJson(file);

		const dynamoTable = await getDynamoTable(dynamodb);

		const validationCriteriaObject = await getValidationDetails(
			questionsArray,
			title,
			dynamoTable
		);

		const allCriteriaValid = await validateCriteria(
			validationCriteriaObject
		);

		if (!allCriteriaValid) {
			console.log("CSV failed Validation: ", validationCriteriaObject);
		} else {
			const structuredQuestions = await assignIndexes(questionsArray);

			const newSetId = await getNewSetId(dynamoTable);

			const wrappedQuestionSet = await wrapQuestionSet(
				newSetId,
				owner,
				title,
				structuredQuestions
			);

			const updatedTable = await addToExistingTable(
				wrappedQuestionSet,
				dynamoTable
			);

			const result = await addToDynamo(team_id, updatedTable, dynamodb);
		}
	} catch (err) {
		console.error(err);
		throw new Error(err);
	}
};

// test data
const ownerTest = "google_10940940941049";
const newTitle = "fdfgd";
const myTeamId = "FIEO";

postOurLT(csvFile, dynamodb, newTitle, ownerTest, myTeamId);
