/* Lobby Class
 * Used for player pairing
 * Logic Involved..
 *  - There should never be more than 2 users in a lobby at a time.
 *  - Once the lobby reaches 2 active users, they should be paired and passed on to the game. Lobby count should be set to 0.
 *  - If a user in the lobby disconnects or loses their connection, the counter needs to reflect that.
 *  - If a user loses a connection during the setup of a game, their partner should be bounced back to the lobby.
 * 
 * * Exposed Methods and Values
 *  - addUser(userSocketId) : Adds a User to the Lobby. Takes 1 arguement, user's connection/socket ID.
 *  - count : Returns the number of waiting users. 
 *  - users : Returns an Object of waiting users.
 */

var LobbyInstance = function(){
	var numberOfWaitingUsers = 0;
	var currentWaitingUsers = [];
	
	function addUserToQueue(userSocketId){
		numberOfwaitingUsers += 1;
		currentWaitingUsers.push(userSocketId);
		tryToPair();
	}
	
	function tryToPair(){
		if(shouldWePair){
			//PairLogic Here //TODO
			numberOfWaitingUsers = 0;
			currentWaitingUsers = [];
		}
	}
	
	function shouldWePair(){
		if(numberOfWaitingUsers == 2){
			return true;
		} 
		return false;
	}
	
	function getCount(){
		return numberOfWaitingUsers;
	}
	
	function getUsers(){
		return currentWaitingUsers;
	}
	
	return {
		addUser : addUserToQueue,
		count : getCount,
		users : getUsers
	}
}
