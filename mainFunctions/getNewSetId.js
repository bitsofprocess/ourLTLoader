module.exports.getNewSetId = async (dynamoTable) => {
  const questionSets = dynamoTable[0].question_sets;

  let existingSetIds = [];

  questionSets.forEach((set) => existingSetIds.push(set.set_id));

  const newSetId = Math.max(...existingSetIds) + 1;

  return newSetId;
};
