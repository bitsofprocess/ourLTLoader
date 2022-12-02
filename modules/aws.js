// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
const dynamoTableName = process.env.dynamoTableName;
module.exports.getDynamoTable = async (dynamodb) => {
  var params = {
    TableName: "ourLT-prod",
  };

  try {
    const data = await dynamodb.scan(params).promise();
    return data.Items;
  } catch (error) {
    return {
      statusCode: 400,
      error: `Could not fetch: ${error.stack}`,
    };
  }
};

module.exports.addQuestSetToDynamo = async (team_id, updatedQuestionSetArray, dynamodb) => {
  let params = {
    RequestItems: {
      "ourLT-prod": [
        {
          PutRequest: {
            Item: {
              team_id: team_id,
              question_sets: updatedQuestionSetArray,
            },
          },
        },
      ],
    },
  };

  try {
    res = await dynamodb.batchWrite(params).promise();
    let data = res;
    console.log("Processed: ", `${JSON.stringify(params, null, 3)}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports.addNewTeamToDynamo = async (team_id, wrappedQuestionSet, dynamodb) => {

  let PutRequest = {
    PutRequest: {
        Item: {
          team_id: team_id,
          question_sets: [wrappedQuestionSet],
        }
      }
  }
  let RequestItems = {};
  RequestItems[dynamoTableName] = [];
  RequestItems[dynamoTableName][0] = PutRequest;
  let params = {};
  params.RequestItems = RequestItems;


  try {
    res = await dynamodb.batchWrite(params).promise();
    let data = res;
    console.log("Processed: ", `${JSON.stringify(params, null, 3)}`);
  } catch (err) {
    console.log(err);
  }
};

