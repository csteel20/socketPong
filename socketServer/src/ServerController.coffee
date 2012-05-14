
app = require('express').createServer()
io = require('socket.io').listen(app)

lobby = new Lobby

app.listen 80

app.get('/', (req, res) -> 
  res.sendfile(__dirname + '/index.html'))

io.sockets.on('connection', (socket) -> 
  if lobby.addUser(socket.id)
    game = new Game(lobby.getNewGameId, lobby.getReadyUsers())
    socket.emit('news', lobby.getReadyUsers())
  socket.emit('news', "connected, your connection id is #{socket.id}."))