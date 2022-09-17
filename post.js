const { getDynamoTable } = require('./getDynamoTable');
const { validateCsv } = require("./mainFunctions/validateCsv");

const csvFile = process.argv[2];
const tableName = 'ourLT-prod'
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

const postOurtLT = async (tableName, dynamodb, file) => {
  // pull in data, check existing titles

  const dynamoTable = await getDynamoTable(tableName, dynamodb);
  console.log(dynamoTable)

  // const existingTitles = await checkExistingTitles(dynamoTable);

  // const allDataPresent = await validateCsv(file);

  // if (!allDataPresent) {
  //   console.log("CSV failed Validation");
  // } else {
    //     const structuredQuestions = await assignIndexes(file);
    //     const questionArray = await createQuestionArray(structuredQuestions);
    //     // pull in current data
    //     const newSetId = await getNewSetId(team_id); // get existing questions sets and add 1 to highest set id
    //     const wrappedArray = await wrapArray(newSetId, owner, title, questionArray);
    //     // add new object to question sets
    //     const success = await addToDynamo(team_id, wrappedArray);
  // }
};

postOurtLT(tableName, dynamodb, csvFile);
