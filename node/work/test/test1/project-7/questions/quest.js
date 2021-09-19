const questions = require('./index.js');

function quest() {
    let idx = Math.round(Math.random() * questions.length)
    let quest = questions[idx];

    questions.splice(idx, 1);
    return quest
}

function getQuest() {
    if (questions.length > 0) {
        return quest();
    } else {
        return {quest: 'Пусто', trueAnswer: 'Нету'}
    }
}

module.exports = getQuest;