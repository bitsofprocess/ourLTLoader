const { csvToJson } = require("./csvToJson");



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
  }
  
  module.exports.answerFreeOfSpecialChar = async (str) => {
  const specialChars = /[^`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
  }

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
      return passedValidation
    
}

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
  