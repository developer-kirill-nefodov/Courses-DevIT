const questions = require('./index.js');

function quest() {
    let idx = Math.round(Math.random() * questions.length)
    if(idx >= questions.length - 1) {
        let quest = questions[0];
        questions.splice(0, 1);
        return quest
    }

    let quest = questions[idx];
    questions.splice(idx, 1);
    return quest
}

function getQuest() {
    if (questions.length > 0) {
        return quest();
    } else {
        return {quest: null, trueAnswer: 'Нету'}
    }
}

module.exports = getQuest;