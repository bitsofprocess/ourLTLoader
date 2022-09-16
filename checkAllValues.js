const { csvToJson } = require("./functions/csvToJson");


module.exports.checkAllValues = async (file) => {
  const questionArray = await csvToJson(file);
  let valueCheck = [];
  let passedValueCheck;

  questionArray.forEach((element) => {
    const valuesArray = Object.values(element);

    if (valuesArray.includes("")) {
      valueCheck.push("false");
    } else {
      valueCheck.push("true");
    }
  });

  if (valueCheck.includes("false")) {
    passedValueCheck = false;
  }

  return passedValueCheck;
};

