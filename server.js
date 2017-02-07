var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

io.on('connection', function (socket) {
    console.log("io server is connected");

    // catch incoming 'draw' and broadcast it to all
    socket.on('draw', function (drawing) {

        socket.broadcast.emit('beginDrawing', drawing);
    });

    // catch incoming 'guess' and broadcast it to all
    socket.on('guess', function (guessed) {
        console.log("the user has guessed " + guessed);

        socket.broadcast.emit('guess', guessed);
    });
});







server.listen(process.env.PORT || 8080);
console.log("server listening on port 8080");
