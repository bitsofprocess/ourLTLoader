const { csvToJson } = require("./subFunctions/csvToJson");
const { getDynamoTable } = require("./mainFunctions/getDynamoTable");
const {
  getValidationDetails,
} = require("./mainFunctions/getValidationDetails");
const { validateCriteria } = require("./mainFunctions/validateCriteria");
const { assignIndexes } = require("./mainFunctions/assignIndexes");
const { getNewSetId } = require("./getNewSetId");
const { wrapQuestionSet } = require('./wrapQuestionSet');
const { addToExistingTable } = require('./addToExistingTable');

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

    const updatedTable = await addToExistingTable(wrappedQuestionSet, dynamoTable)
    
    // https://stackoverflow.com/questions/60695821/dynamodb-exception-supplied-attributevalue-has-more-than-one-datatypes-set

    // console.log(JSON.stringify(params))

    let params = {
      RequestItems: {
        'ourLT-prod': [
          {
            PutRequest: {
             Item: {
              team_id: 'FIEO',
              question_sets: 'test'
             }
            }
          }
        ]
      }
    }


    try {
      res = await dynamodb.batchWrite(params).promise()
      let data = res;
      console.log('Processed: ', JSON.stringify(updatedTable, null, 3))
    } catch(err) {
      console.log(err)
    }

    // const success = await addToDynamo(team_id, wrappedArray);
  }
};

const ownerTest = "google_10940940941049"
const newTitle = "newTitle";
postOurtLT(csvFile, tableName, dynamodb, newTitle, ownerTest);
