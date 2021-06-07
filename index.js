const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let users = [];

function newUser() {
    const color = ["Red", "Green", "Blue", "Yellow", "Purple"]
    const adjective = ["Shy", "Brave", "Hungry", "Diminutive", "Intelligent"]
    const animal = ["Racoon", "Bear", "Ox", "Panda", "Gecko"]

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    let username = `${color[getRandomInt(5)]}${adjective[getRandomInt(5)]}${animal[getRandomInt(5)]}`
    users.push(username);
}

app.get('/', (req, res) => {
  res.sendFile(__dirname +'/index.html');
});

io.on('connection', (socket) => {
    newUser();

    const user = users[users.length - 1];
    io.emit('chat message', `Welcome, ${user}`)

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message',`${user}: ${msg}`);
    });
  });


server.listen(3000, () => {
  console.log('listening on *:3000');
});
