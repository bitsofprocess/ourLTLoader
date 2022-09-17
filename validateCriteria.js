module.exports.validateCriteria = async (validationCriteriaObject) => {
    let csvPassesValidation;
    const validationArray = Object.values(validationCriteriaObject);
  
    if (validationArray.includes(false)) {
      csvPassesValidation = false;
    } else {
      csvPassesValidation = true;
    }

    return csvPassesValidation;
}