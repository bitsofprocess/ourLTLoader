module.exports.checkAllValues = async (questionsArray) => {
  let valueCheck = [];
  let passedValueCheck;

  questionsArray.forEach((element) => {
    const valuesArray = Object.values(element);

    if (valuesArray.includes("")) {
      valueCheck.push(false);
    } else {
      valueCheck.push(true);
    }
  });

  if (valueCheck.includes(false)) {
    passedValueCheck = false;
  } else {
    passedValueCheck = true;
  }

  return passedValueCheck;
};

module.exports.maxLengthCheck = async (questionsArray) => {
  const lengthCheck = [];
  let passesLengthCheck;

  questionsArray.forEach((element) => {
    for (key in element) {
      if (element[key].length < 200) {
        lengthCheck.push(true);
      } else {
        lengthCheck.push(false);
      }
    }
  });

  if (lengthCheck.includes(false)) {
    passesLengthCheck = false;
  } else {
    passesLengthCheck = true;
  }
  return passesLengthCheck;
};

module.exports.questionFreeOfSpecialChar = async (str) => {
  const specialChars = /[^`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/~]/;
  return specialChars.test(str);
};

module.exports.answerFreeOfSpecialChar = async (str) => {
  const specialChars = /[^`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
};

module.exports.checkForSpecialChar = async (questionsArray) => {
  const requiredKeys = [
    "question",
    "correct_answer",
    "wrong_answer_1",
    "wrong_answer_2",
    "wrong_answer_3",
  ];

  let validationArray = [];
  let passedValidation;

  questionsArray.forEach((element) => {
    for (const key of requiredKeys) {
      if (key === "question") {
        let result = exports.questionFreeOfSpecialChar(element[key]);
        validationArray.push(result);
      } else if (
        key === "wrong_answer_1" ||
        "wrong_answer_2" ||
        "wrong_answer_3"
      ) {
        let result = exports.answerFreeOfSpecialChar(element[key]);
        validationArray.push(result);
      }
    }
  });

  if (validationArray.includes(false)) {
    passedValidation = false;
  } else {
    passedValidation = true;
  }
  return passedValidation;
};

module.exports.compareTitles = async (dynamoTable, title, team_id) => {
  let titleArray = [];
  let titleCheckPassed;

  dynamoTable.forEach(object => {
    if (object.team_id === team_id) {
      const questionSetArray = object.question_sets;
      questionSetArray.forEach(set => titleArray.push(set.title));
    }
  })

  if (titleArray.includes(title)) {
    titleCheckPassed = false;
  } else {
    titleCheckPassed = true;
  }

  return titleCheckPassed;
};

module.exports.validateCriteria = async (validationCriteriaObject) => {
  let csvPassesValidation;
  const validationArray = Object.values(validationCriteriaObject);

  if (validationArray.includes(false)) {
    csvPassesValidation = false;
  } else {
    csvPassesValidation = true;
  }

  return csvPassesValidation;
};

module.exports.getValidationDetails = async (
  questionsArray,
  title,
  dynamoTable,
  team_id
) => {
  let passesCharCheck;
  let allValuesPresent;
  let passesLengthCheck;
  let passesTitleCheck;
  let validationCriteria = {
    passesCharCheck,
    allValuesPresent,
    passesLengthCheck,
    passesTitleCheck,
  };

  validationCriteria.passesCharCheck = await exports.checkForSpecialChar(
    questionsArray
  );

  validationCriteria.allValuesPresent = await exports.checkAllValues(
    questionsArray
  );

  validationCriteria.passesLengthCheck = await exports.maxLengthCheck(
    questionsArray
  );

  validationCriteria.passesTitleCheck = await exports.compareTitles(
    dynamoTable,
    title,
    team_id
  );

  return validationCriteria;
};
