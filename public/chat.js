// Make connection
var socket = io();
var timeout;

// Query DOM
var btn = document.getElementById('send'),
	handle = document.getElementById('handle'),
	message = document.getElementById('message'),
	output = document.getElementById('output'),
	feedback = document.getElementById('feedback')

// Emit events
btn.addEventListener('click', function() {
	socket.emit('send message', {
		message: message.value,
		handle: handle.value
	});

	message.value = "";
});

message.addEventListener('keypress', function(e) {
	if (e.keyCode == 13) {
		socket.emit('send message', {
			message: message.value,
			handle: handle.value
		});

		message.value = "";
	}else{
		socket.emit('typing', handle.value);
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			socket.emit('typing', false);
		}, 1000);
	}
});

// Listener for events
socket.on('new message', function(data) {
	feedback.innerHTML = "";
	output.innerHTML += '<li class="list-group-item d-flex align-items-center"><strong>' + data.handle + '&nbsp;</strong> ' + data.message + '</li>';
});

socket.on('typing', function(data) {
	if (data) {
		feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
	}else{
		feedback.innerHTML = "";
	}
});