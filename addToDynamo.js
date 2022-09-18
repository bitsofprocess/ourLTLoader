const addToDynamo = async (team_id, wrappedQuestionSet) => {
  let params = {
    RequestItems: {
      "ourLT-prod": [
        {
          PutRequest: {
            Item: {
              team_id: team_id,
              question_sets: wrappedQuestionSet,
            },
          },
        },
      ],
    },
  };

  try {
    res = await dynamodb.batchWrite(params).promise();
    let data = res;
    console.log("Processed: ", JSON.stringify(wrappedQuestionSet, null, 3));
  } catch (err) {
    console.log(err);
  }
};
