//var lobby = LobbyInstance();

var app = require('express').createServer()
  , io = require('socket.io').listen(app);
  
app.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
	//lobby.addUser(socket.id);
  	socket.emit('news', {});

});





/*  T E S T  G A M E  D A T A  C O D E */

// moved to own file for now ..