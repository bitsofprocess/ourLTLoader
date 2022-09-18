module.exports.wrapQuestionSet = async (newSetId, owner, title, structuredQuestions) => {
    let obj = {
        set_id: newSetId,
        owner: owner,
        title: title,
        questions: structuredQuestions
      };
    
    return obj;
}