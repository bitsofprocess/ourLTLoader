module.exports.addToExistingTable = async (wrappedQuestionSet, dynamoTable) => {
    
    const newTable = dynamoTable;
    newTable[0].question_sets.push(wrappedQuestionSet);

    return newTable;
}