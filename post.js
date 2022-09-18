const { csvToJson } = require("./subFunctions/csvToJson");
const { getDynamoTable } = require("./mainFunctions/getDynamoTable");
const {
  getValidationDetails,
} = require("./mainFunctions/getValidationDetails");
const { validateCriteria } = require("./mainFunctions/validateCriteria");
const { assignIndexes } = require("./mainFunctions/assignIndexes");
const { getNewSetId } = require("./mainFunctions/getNewSetId");
const { wrapQuestionSet } = require('./mainFunctions/wrapQuestionSet');
const { addToExistingTable } = require('./mainFunctions/addToExistingTable');
const { addToDynamo } = require('./mainFunctions/addToDynamo');

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

const postOurtLT = async (file, dynamodb, title, owner, team_id) => {
  const questionsArray = await csvToJson(file);

  const dynamoTable = await getDynamoTable(tableName, dynamodb);

  const validationCriteriaObject = await getValidationDetails(
    questionsArray,
    title,
    dynamoTable
  );

  const allCriteriaValid = await validateCriteria(validationCriteriaObject);

  if (!allCriteriaValid) {
    console.log("CSV failed Validation: ", validationCriteriaObject);
  } else {
    const structuredQuestions = await assignIndexes(questionsArray);

    const newSetId = await getNewSetId(dynamoTable);

    const wrappedQuestionSet = await wrapQuestionSet(newSetId, owner, title, structuredQuestions);
   
    const updatedTable = await addToExistingTable(wrappedQuestionSet, dynamoTable);
    
    const result = await addToDynamo(team_id, updatedTable, dynamodb);

  }
};

// test data
const ownerTest = "google_10940940941049"
const newTitle = "test title";
const myTeamId = 'FIEO'
postOurtLT(csvFile, dynamodb, newTitle, ownerTest, myTeamId);
