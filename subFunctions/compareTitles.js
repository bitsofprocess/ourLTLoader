module.exports.compareTitles = async (dynamoTable, title) => {

  const titleArray = [];
  const questionSetArray = dynamoTable[0].question_sets;
  let titleCheckPassed;

  for (element of questionSetArray) {
    titleArray.push(element.title);
  }

  if (titleArray.includes(title)) {
    titleCheckPassed = false;
  } else {
    titleCheckPassed = true;
  }

  return titleCheckPassed;
};

 
