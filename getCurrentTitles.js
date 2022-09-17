module.exports.getCurrentTitles = (dynamoTable) => {
  const titleArray = [];
  const questionSetArray = dynamoTable[0].question_sets;

  for (element of questionSetArray) {
    titleArray.push(element.title);
  }
  return titleArray;
};
