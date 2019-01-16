var socket = io();

var btn = document.getElementById('send'),
	handler = document.getElementById('handler'),
	message = document.getElementById('message'),
	output = document.getElementById('output');

btn.addEventListener('click', function() {
	socket.emit('chat', {
		message: message.value,
		handler: handler.value
	});
});

socket.on('chat', function(data) {
	output.innerHTML += '<li class="list-group-item d-flex align-items-center"><strong>' + data.handler + '&nbsp;</strong> ' + data.message + '</li>';
});