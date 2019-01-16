var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(3000, function(){
	console.log('listening on port *:3000');
});

// Static files
app.use(express.static('public'));
app.use(express.static('views'));

// Socket setup
var io = socket(server);



io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('chat', function(data) {
		io.emit('chat', data);
	})
});

