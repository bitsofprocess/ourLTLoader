const { csvToJson } = require("./csvToJson");

const {
    questionFreeOfSpecialChar,
    answerFreeOfSpecialChar,
  } = require('../subFunctions/specialCharCheck');

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
            let result = questionFreeOfSpecialChar(element[key]);
            validationArray.push(result);

          } else if (
            key === "wrong_answer_1" ||
            "wrong_answer_2" ||
            "wrong_answer_3"
          ) {
            let result = answerFreeOfSpecialChar(element[key]);
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
