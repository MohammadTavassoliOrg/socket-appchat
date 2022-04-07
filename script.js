const socket = io(`http://${host}:${port}`);
require("dotenv").config();
const messageFrom = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container")
const name = prompt("please insert your name");

let port = process.env.PORT
let host = process.env.HOST
appendMessage("you Joined")
socket.emit("new-user", name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message} `)
});

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
});

socket.on('user-disconnect', name => {
    appendMessage(`${name} disconnected`)
});

messageFrom.addEventListener("submit", e => {
    e.preventDefault()
    const message = messageInput.value
    if (message === "") return(alert("please type message first"))
    appendMessage(`You: ${message}`)
    socket.emit("send-chat-message", message)
    messageInput.value = ''
});

function appendMessage(message) {
    const messageElement = document.createElement("div")
    messageElement.innerText = message
    messageContainer.append(messageElement)
}