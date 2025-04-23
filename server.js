const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const players = {};

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);
  players[socket.id] = { x: 100, y: 300, vy: 0 };

  socket.on('update', (data) => {
    players[socket.id] = data;
    io.emit('state', players);
  });

  socket.on('disconnect', () => {
    delete players[socket.id];
    io.emit('state', players);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
