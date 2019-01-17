var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(3000, function(){
	console.log('listening on port *:3000');
});

// Socket setup
var io = socket(server);
var users = [];
var connections = [];

// Static files
app.use(express.static('public'));
app.use(express.static('views'));

// Make connection
io.on('connection', function(socket){
	connections.push(socket);
	console.log('Connected: %s user connected', connections.length);

	socket.on('send message', function(data) {
		io.emit('new message', data);
	});

	socket.on('typing', function(data) {
		socket.broadcast.emit('typing', data);
	});

	socket.on('disconnect', function(data) {
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disconnected: %s user connected', connections.length);
	});
});

