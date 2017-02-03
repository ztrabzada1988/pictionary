var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

io.on('connection', function (socket) {
    console.log("io server is connected");

    socket.on('draw', function (drawing) {
        console.log("start drawing");

        socket.broadcast.emit('beginDrawing', drawing);
        console.log("server drawing function is working")
    })
})







server.listen(process.env.PORT || 8080);
console.log("server listening on port 8080");