let socket = new WebSocket('ws://localhost:9999/ws');

let result = null, userData = {username: 'user', trueAnswer: 0, idx: 0};

document.forms["publish"].onsubmit = function () {
    let outgoingMessage = this.message.value;

    if (result) {
        if (result === outgoingMessage) {
            socket.send(JSON.stringify({data: outgoingMessage, method: '1'}));
        } else {
            document.getElementById('userMess').innerText = 'Этот ответ не верный';
        }
    } else {
        socket.send(JSON.stringify({data: outgoingMessage, method: '0'}));
        document.getElementById('mess').value = "";
    }

    return false;
};

socket.onmessage = (event) => {
    const mess = JSON.parse(event.data);

    const {method, userArr, data} = mess;

    switch (method) {
        case 'creatUser': {
            userData.username = data.mess;
            userData.trueAnswer = data.trueAnswer;
            userData.idx = data.idx;
            User();
        }
            break;
        case 'upDateUsers': {
            console.log(mess)
            upDateUsers(userArr);
        }
            break;
        case 'time': {
            upDateTime(data.time)
        }
            break;
        case 'question': {
            result = data.trueAnswer;
            showQuestion(data);
            upDateTime(data.time, 'quiz');
        }

            break;
        case 'messageUser': {
            messageUser(data.mess);
        }
            break;
        case 'wining': {
            messageUser(data.mess);
            socket.close()
        }
    }
}


function User() {
    document.getElementById('user').innerText = `you (${userData.username})`;
    document.getElementById('answer').innerText = userData.trueAnswer;
}

function upUser() {
    document.getElementById('answer').innerText = userData.trueAnswer;
}

function upDateUsers(arr) {
    document.getElementById('users').innerHTML = '';
    for (let key of arr) {
        document.getElementById('users').innerHTML +=
            `<li>
                <span class="list-group-item d-flex justify-content-between align-items-center">${key.username}</span>
                <span class="badge bg-primary rounded-pill" style="height: 21px">${key.trueAnswer}</span>
            </li>`
    }
}

function showQuestion(data) {
    result = data.mess.trueAnswer;
    document.getElementById('quiz').innerHTML = data.mess.quest;
}

function upDateTime(time, idx = null) {
    if (!idx) {
        let count = time;
        const int = setInterval(() => {
            document.getElementById('time').innerText = count;

            if (count <= 0) {
                clearInterval(int);
            }
            count--;
        }, 1000)
    } else {
        let count = time;
        const int = setInterval(() => {

            if (count <= 0) {
                document.getElementById('quiz').innerHTML = `Время кончилось(`;
                clearInterval(int);
            }
            count--;
        }, 1000)

    }

}

function messageUser(mess) {
    document.getElementById('userMess').innerHTML = mess;
}

socket.onclose = event => console.log(`Closed ${event.code}`);