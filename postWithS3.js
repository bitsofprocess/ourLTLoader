const { getDynamoTable, addNewTeamToDynamo, addQuestSetToExistingTeamInDynamo } = require("./modules/aws");
const {
  getValidationDetails,
  validateCriteria,
} = require("./modules/validation");

const { checkTableForTeamId } = require('./modules/validation')

const {
  csvToJson,
  assignIndexes,
  getNewSetId,
  wrapQuestionSet,
  addToExistingTable,
} = require("./modules/format");
const { getCsvFromS3 } = require("./s3Test");

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
  
    const allCriteriaValid = await validateCriteria(validationCriteriaObject);

    const teamIdExistsInDynamo = await checkTableForTeamId(dynamoTable, team_id);

    if (!allCriteriaValid) {
      console.log("CSV failed Validation: ", validationCriteriaObject);
    } else {
      const structuredQuestions = await assignIndexes(questionsArray);

      const newSetId = await getNewSetId(teamIdExistsInDynamo, dynamoTable, team_id);
     
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

      let result; 
      
      if (teamIdExistsInDynamo) {
        result = await addQuestSetToExistingTeamInDynamo(team_id, updatedQuestionSetArray, dynamodb);
      } else {
        result = await addNewTeamToDynamo(team_id, wrappedQuestionSet, dynamodb);
      }
      return result;
    }
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

// test data
// const ownerTest = "google_10940940941049";
// const newTitle = "4th Quiz";
// const myTeamId = "TEST";

// postOurLT(csvFile, dynamodb, newTitle, ownerTest, myTeamId);
