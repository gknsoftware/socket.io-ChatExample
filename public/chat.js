var socket = io();

var btn = document.getElementById('send'),
	handler = document.getElementById('handler'),
	message = document.getElementById('message'),
	output = document.getElementById('output'),
	feedback = document.getElementById('feedback')

btn.addEventListener('click', function() {
	socket.emit('chat', {
		message: message.value,
		handler: handler.value
	});
});

message.addEventListener('keypress', function() {
	socket.emit('typing', handler.value);
});

socket.on('chat', function(data) {
	message.value = "";
	feedback.innerHTML = "";

	output.innerHTML += '<li class="list-group-item d-flex align-items-center"><strong>' + data.handler + '&nbsp;</strong> ' + data.message + '</li>';
});

socket.on('typing', function(data) {
	feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});