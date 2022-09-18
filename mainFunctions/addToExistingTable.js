module.exports.addToExistingTable = async (wrappedQuestionSet, dynamoTable) => {
    
    const newTable = dynamoTable[0];
    newTable.question_sets.push(wrappedQuestionSet);

    return newTable.question_sets;
}