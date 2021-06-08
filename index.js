const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const newUser = require("./scripts/usernameGenerator")

let users = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname +'/index.html');
});

io.on('connection', (socket) => {

    newUser(users)
    const user = users[users.length - 1];
    io.emit('chat message', `Welcome, ${user}`)

    io.emit('list users', users);

    socket.on('typing', (data) => {
        if(data.typing == true) {
            io.emit('typing indicator', {data, user})
        } else {
            io.emit('typing indicator', {data, user})
        }
    })

    socket.on('chat message', (msg) => {
    io.emit('chat message',`${user}: ${msg}`);
    });

    socket.on('disconnect', (user) => {
        users.splice(users.indexOf(user), 1)
        io.emit('list users', users);
    });
  });


server.listen(3000, () => {
  console.log('listening on *:3000');
});
