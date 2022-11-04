// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");

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

module.exports.addNewTeamToDynamo = async (team_id, wrappedQuestionSet, dynamodb) => {
  let params = {
    RequestItems: {
      "ourLT-prod": [
        {
          PutRequest: {
            Item: {
              team_id: team_id,
              question_sets: [wrappedQuestionSet],
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

module.exports.addQuestSetToExistingTeamInDynamo = async (team_id, updatedQuestionSetArray, dynamodb) => {
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