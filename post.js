const { csvToJson } = require("./subFunctions/csvToJson");
const { getDynamoTable } = require("./mainFunctions/getDynamoTable");
const {
  getValidationDetails,
} = require("./mainFunctions/getValidationDetails");
const { validateCriteria } = require("./mainFunctions/validateCriteria");
const { assignIndexes } = require("./mainFunctions/assignIndexes");
const { getNewSetId } = require("./getNewSetId");
const { wrapQuestionSet } = require('./wrapQuestionSet');

const csvFile = process.argv[2];
const tableName = "ourLT-prod";
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

const postOurtLT = async (file, tableName, dynamodb, title, owner) => {
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


    dynamoTable[0].question_sets.push(wrappedQuestionSet);

    console.log(dynamoTable)
    // const updatedTable = addToExistingTable(wrappedArray, dynamoTable);

  
    // // add new object to question sets
    // const success = await addToDynamo(team_id, wrappedArray);
  }
};

const ownerTest = "google_10940940941049"
const newTitle = "newTitle";
postOurtLT(csvFile, tableName, dynamodb, newTitle, ownerTest);
