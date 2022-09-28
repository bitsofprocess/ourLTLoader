// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");

module.exports.getDynamoTable = async (dynamodb) => 
{

  var params = {
      TableName: "ourLT-prod"
  }

  try {
      const data = await dynamodb.scan(params).promise();
      return data.Items;
      
    }
  catch (error) {
    return {
      statusCode: 400,
      error: `Could not fetch: ${error.stack}`
    };
  } 
 
};
