// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");

const { getDynamoTable, addQuestSetToDynamo } = require("./modules/aws");
const {
  getValidationDetails,
  validateCriteria,
  checkTableForTeamId,
} = require("./modules/validation");

const {
  assignIndexes,
  getNewSetId,
  wrapQuestionSet,
  addToExistingTable,
} = require("./modules/format");

const { getCsvFromS3 } = require("./s3Test");

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.postWithS3 = async (file, dynamodb, title, owner, team_id) => {
  let result;
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

    const teamIdExistsInDynamo = await checkTableForTeamId(
      dynamoTable,
      team_id
    );

    if (!allCriteriaValid) {
      console.error("CSV failed Validation: ", validationCriteriaObject);
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
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
  return result;
};
