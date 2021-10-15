
const socket = io('http://localhost:8000', { transports: ['websocket', 'polling', 'flashsocket'] });


const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}   


//send message function//

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''

})

const name = prompt('Hey, please enter your name to join');
socket.emit("new-user-joined", name);

socket.on('user-joined', function(name){
   append(`> ${name} joined the chat!`, 'right')
})
socket.on('receive', function(data){
    append(`${data.name}: ${data.message}`, 'left')
})
