const { csvToJson } = require("./csvToJson");


module.exports.checkAllValues = async (questionsArray) => {
  
  let valueCheck = [];
  let passedValueCheck;

  questionsArray.forEach((element) => {
    const valuesArray = Object.values(element);

    if (valuesArray.includes("")) {
      valueCheck.push("false");
    } else {
      valueCheck.push("true");
    }
  });

  if (valueCheck.includes("false")) {
    passedValueCheck = false;
  } else {
    passedValueCheck = true;
  }

  return passedValueCheck;
};

