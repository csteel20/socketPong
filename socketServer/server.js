// Generated by CoffeeScript 1.3.1

/*
  Lobby Class
  Used for player pairing
  Logic Involved..
   - There should never be more than 2 users in a lobby at a time.
   - Once the lobby reaches 2 active users, they should be paired and passed on to the game. Lobby count should be set to 0.
   - If a user in the lobby disconnects or loses their connection, the counter needs to reflect that.
   - If a user loses a connection during the setup of a game, their partner should be bounced back to the lobby.
  
  Exposed Methods and Values
   - addUser(userSocketId) : Adds a User to the Lobby. Takes 1 arguement, user's connection/socket ID.
   - getCount : Returns the number of waiting users. 
   - getUsers : Returns an Object of waiting users.
*/


(function() {
  var Game, Lobby, app, io, lobby;

  Lobby = (function() {
    var currentReadyUsers, currentWaitingUsers, newGameId, numberOfWaitingUsers;

    Lobby.name = 'Lobby';

    function Lobby() {}

    numberOfWaitingUsers = 0;

    currentWaitingUsers = [];

    currentReadyUsers = [];

    newGameId = 0;

    Lobby.prototype.addUser = function(userSocketId) {
      numberOfWaitingUsers += 1;
      currentWaitingUsers.push(userSocketId);
      return this.tryToPair();
    };

    Lobby.prototype.tryToPair = function() {
      if (this.weShouldPair()) {
        newGameId += 1;
        numberOfWaitingUsers = 0;
        currentReadyUsers = currentWaitingUsers;
        currentWaitingUsers = [];
        return true;
      }
      return false;
    };

    Lobby.prototype.weShouldPair = function() {
      if (numberOfWaitingUsers === 2) {
        return true;
      } else {
        return false;
      }
    };

    Lobby.prototype.getWaitingUsers = function() {
      return currentWaitingUsers;
    };

    Lobby.prototype.getReadyUsers = function() {
      return currentReadyUsers;
    };

    Lobby.prototype.getCount = function() {
      return numberOfWaitingUsers;
    };

    Lobby.prototype.getNewGameId = function() {
      return newGameId;
    };

    return Lobby;

  })();

  Game = (function() {
    var gameId, playerOne, playerTwo;

    Game.name = 'Game';

    gameId = 0;

    playerOne = "";

    playerTwo = "";

    function Game(gId, playersArray) {
      gameId = gId;
      playerOne = playersArray[0];
      playerTwo = playersArray[1];
      return true;
    }

    Game.prototype.getPlayerOne = function() {
      return playerOne;
    };

    return Game;

  })();

  app = require('express').createServer();

  io = require('socket.io').listen(app);

  lobby = new Lobby;

  app.listen(80);

  app.get('/', function(req, res) {
    return res.sendfile(__dirname + '/index.html');
  });

  io.sockets.on('connection', function(socket) {
    var game;
    if (lobby.addUser(socket.id)) {
      game = new Game(lobby.getNewGameId, lobby.getReadyUsers());
      socket.emit('news', lobby.getReadyUsers());
    }
    return socket.emit('news', "connected, your connection id is " + socket.id + ".");
  });

}).call(this);
