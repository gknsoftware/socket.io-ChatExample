// Make connection
var socket = io();
var timeout;

// Query DOM
var btn_login = document.getElementById('login'),
	username = document.getElementById('username'),
	message = document.getElementById('message'),
	output = document.getElementById('output'),
	feedback = document.getElementById('feedback'),
	LoginChatRoom = document.getElementById('LoginChatRoom'),
	ChatRoom = document.getElementById('ChatRoom'),
	LoggedInUsers = document.getElementById('logged_in_users');

// Emit events
btn_login.addEventListener('click', function() {
	socket.emit('new user', username.value, function(data) {
		if (data) {
			LoginChatRoom.style.display = 'none';
			ChatRoom.style.display = 'flex';
		}
	});
});

message.addEventListener('keypress', function(e) {
	if (e.keyCode == 13) {
		socket.emit('send message', message.value);
		message.value = "";
	}else{
		socket.emit('typing', true);
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			socket.emit('typing', false);
		}, 1000);
	}
});

// Listener for events
socket.on('typing', function(data) {
	if (data.typing) {
		feedback.innerHTML = '<p><em>' + data.username + ' is typing a message...</em></p>';
	}else{
		feedback.innerHTML = "";
	}
});

socket.on('new message', function(data) {
	feedback.innerHTML = "";
	output.innerHTML += '<li class="list-group-item d-flex align-items-center"><strong>' + data.username + '&nbsp;</strong> ' + data.message + '</li>';
});

socket.on('get users', function(data) {
	var html = '';
	for (i=0;i<data.length;i++) {
		html += '<li class="list-group-item">'+data[i]+'</li>';
	}

	LoggedInUsers.innerHTML = html;
});









