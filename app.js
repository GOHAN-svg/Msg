const socket = io();

// Send message to the server
const sendButton = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');
const messagesList = document.getElementById('messages');

sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    socket.emit('chatMessage', message); // Send message to server
    messageInput.value = ''; // Clear the input field
  }
});

// Listen for incoming messages from the server
socket.on('chatMessage', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  messagesList.appendChild(li);
  messagesList.scrollTop = messagesList.scrollHeight; // Scroll to the bottom
});
