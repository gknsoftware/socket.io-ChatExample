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

	// Disconnect
	socket.on('disconnect', function(data) {
		if (socket.username != undefined)
			users.splice(users.indexOf(socket.username), 1);
			updateUsernames();
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disconnected: %s user connected', connections.length);
	});

	// Typing message
	socket.on('typing', function(data) {
		socket.broadcast.emit('typing', {username: socket.username, typing: data});
	});

	// Senc message
	socket.on('send message', function(data) {
		io.emit('new message', {message: data, username: socket.username});
	});

	// New user
	socket.on('new user', function(data, callback) {
		callback(true);
		socket.username = data;
		users.push(socket.username);
		updateUsernames();
	});

	function updateUsernames() {
		io.emit('get users', users);
	}
});

