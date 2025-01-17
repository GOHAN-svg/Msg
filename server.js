const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize express app
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Create HTTP server and integrate with socket.io
const server = http.createServer(app);
const io = socketIo(server);

// Real-time communication with Socket.io
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for chat messages from clients
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg); // Broadcast the message to all clients
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Set the server to listen on the specified port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
