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
