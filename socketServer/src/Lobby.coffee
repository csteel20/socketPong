###
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
###

class Lobby
  numberOfWaitingUsers = 0
  currentWaitingUsers = []
  currentReadyUsers = []
  newGameId = 0
  
  addUser: (userSocketId) ->
    numberOfWaitingUsers += 1
    currentWaitingUsers.push(userSocketId)
    return this.tryToPair()

  tryToPair: ->
    if this.weShouldPair()
      newGameId += 1;
      numberOfWaitingUsers = 0
      currentReadyUsers = currentWaitingUsers
      currentWaitingUsers = []
      return true
    return false

  weShouldPair: ->
    if numberOfWaitingUsers is 2 then return true else return false
    
  getWaitingUsers: ->
    return currentWaitingUsers
  
  getReadyUsers: ->
    return currentReadyUsers
  
  getCount: ->
    return numberOfWaitingUsers
    
  getNewGameId: ->
    return newGameId