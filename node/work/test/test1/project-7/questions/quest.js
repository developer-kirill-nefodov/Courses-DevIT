const questions = require('./index.js');

function quest() {
    let idx = Math.round(Math.random() * questions.length)
    let quest = questions[idx];

    questions.splice(idx, 1);
    return quest
}

function getQuest() {
    // if (quests.length > 0) {
        return quest()
    // } else {
    //     return null
    // }
}

function add() {
    document.getElementById('quiz').innerHTML = getQuest().quest
}

document.addEventListener('click', add)