const socket = new WebSocket('ws://localhost:9999/ws');
let timerId = null;

const userData = {username: 'user', trueAnswer: 0, idx: 0};

document.forms["publish"].onsubmit = function () {
  let outgoingMessage = this.message.value;

  socket.send(JSON.stringify({data: outgoingMessage}));

  document.getElementById('mess').value = "";
  return false;
};

socket.onmessage = (event) => {
  const mess = JSON.parse(event.data);
  const {method, userArr, data} = mess;

  switch (method) {
    case 'createUser': {
      userData.username = data.mess;
      userData.trueAnswer = data.trueAnswer;
      userData.idx = data.idx;
    }
      break;
    case 'upDateUsers': {
      upDateUsers(userArr);
      User();
    }
      break;
    case 'time': {
      if (timerId) {
        clearInterval(timerId);
      }

      upDateTime(data.time)
    }
      break;
    case 'question': {
      showQuestion(data.mess);
    }
      break;
    case 'messageUser': {
      messageUser(data.mess);
    }
      break;
    case 'upUser': {
      upUser();
    }
      break;
    case 'wining': {
      if (timerId) {
        clearInterval(timerId);
      }
      messageUser(data.mess);
      socket.close();
    }
  }
}

function User() {
  document.getElementById(`user_${userData.idx}`).innerText = `you (${userData.username})`;
  document.getElementById(`answer_${userData.idx}`).innerText = userData.trueAnswer;
}

function upUser() {
  userData.trueAnswer++;
  document.getElementById(`answer_${userData.idx}`).innerText = userData.trueAnswer;
}

function upDateUsers(arr) {
  document.getElementById('users').innerHTML = '';
  for (let key of arr) {
    document.getElementById('users').innerHTML +=
      `<li>
                <span class="list-group-item d-flex justify-content-between align-items-center" id="user_${key.idx}">${key.username}</span>
                <span class="badge bg-primary rounded-pill" style="height: 21px" id="answer_${key.idx}">${key.trueAnswer}</span>
            </li>`
  }
}

function showQuestion(data) {
  document.getElementById('quiz').innerHTML = data;
}

function upDateTime(time) {
  let count = time - Math.round(new Date().getTime() / 1000);

  const int = setInterval(() => {
    document.getElementById('time').innerText = String(count);

    if (count <= 0) {
      clearInterval(int);
      document.getElementById('time').innerText = '0';
    }
    count--;
  }, 1000);

  timerId = int;
}

function messageUser(mess) {
  document.getElementById('userMess').innerHTML = mess;
}

socket.onclose = event => console.log(`Closed ${event.code}`);
