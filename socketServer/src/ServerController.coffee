
app = require('express').createServer()
io = require('socket.io').listen(app)

lobby = new Lobby

app.listen 80

app.get('/', (req, res) -> 
  res.sendfile(__dirname + '/index.html'))

io.sockets.on('connection', (socket) -> 
  lobby.addUser(socket.id)
  socket.emit('news', "connected, your connection id is #{socket.id}"))




