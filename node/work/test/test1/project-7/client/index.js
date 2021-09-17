

let socket = new WebSocket('ws://localhost:8080/ws');

document.forms.publish.onsubmit = function() {
    let outgoingMessage = this.message.value;

    socket.send(outgoingMessage);
    return false;
};

socket.onmessage = function(event) {
    let incomingMessage = event.data;
    showMessage(incomingMessage);
};

socket.onclose = event => console.log(`Closed ${event.code}`);

function showMessage(message) {
    let messageElem = document.createElement('div');
    messageElem.textContent = message;
    document.getElementById('messages').prepend(messageElem);
}