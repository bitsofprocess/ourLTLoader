module.exports.questionHasSpecialCharacters = (str) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/~]/;
    return specialChars.test(str);
  }

module.exports.answerHasSpecialCharacters = (str) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

