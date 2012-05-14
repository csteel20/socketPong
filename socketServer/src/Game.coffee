class Game
  gameId = 0
  playerOne = ""
  playerTwo = ""
  
  constructor: (gId, playersArray) ->
    gameId = gId
    playerOne = playersArray[0]
    playerTwo = playersArray[1]
    return true

  getPlayerOne: ->
    return playerOne