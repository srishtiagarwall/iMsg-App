const socket = io('http://localhost:8001');

const form = document.getElementById('send-container');
const msgInput = document.getElementById('send-msg');
const msgContainer1 = document.querySelector('.msg1');
const msgContainer = document.querySelector('.msg');
const msgContainer2 = document.querySelector('.msg2');

var audio = new Audio('ting_iphone.mp3');

const append = (message, position) => {
    const msgElement = document.createElement('div');
    msgElement.innerText = message;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    msgContainer.append(msgElement);

    if(position == 'left'){
        audio.play();
    }
}

const entername = prompt("Enter your name to join: ");
socket.emit('new-user-joined', entername);

socket.on('user-joined', name => {
    const systemMsg = document.createElement('div');
    systemMsg.innerText = `${name} joined the chat!`;
    systemMsg.classList.add('centered-message');
    msgContainer1.appendChild(systemMsg);
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', name => {
    const systemMsg = document.createElement('div');
    systemMsg.innerText = `${name} left the chat!`;
    systemMsg.classList.add('centered-message');
    msgContainer2.append(systemMsg);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    msgInput.value = '';
});