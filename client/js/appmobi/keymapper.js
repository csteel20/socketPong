/*
//example element
<div id="Leftbutn" ontouchstart="handleInput('lDown');" ontouchend="handleInput('lUp');" ></div>
<div id="Rightbutn" ontouchstart="handleInput('rDown');" ontouchend="handleInput('rUp');"></div>
<div id="Jumpbutn" ontouchstart="handleInput('jDown');" ontouchend="handleInput('jUp');" ></div>
<div id="Shootbutn" ontouchstart="handleInput('sDown');" ontouchend="handleInput('sUp');"></div>

//bind keys to buttons
mapKeyToElement("left", "Leftbutn");
mapKeyToElement("right", "Rightbutn");
mapKeyToElement("space", "Jumpbutn");
mapKeyToElement("f", "Shootbutn");
*/


//library code
var map = {};

function mapKeyToElement(key, id) {
	var code = "";
	
	switch(key) {
		case "up":
			code = 38;
			break;
		case "down":
			code = 40;
			break;
		case "left":
			code = 37;
			break;
		case "right":
			code = 39;
			break;
		case "space":
			code = 32;
			break;
		default:
			code = key.toUpperCase().charCodeAt(0);
			break;
	}
	
	map[code] = id;
}

function handleKey(event) {
	var id = map[event.keyCode];
	var element = document.getElementById(id);
	if(element == null) return;

	var touchevt = document.createEvent("Event");
	if('keydown'==event.type) {
		touchevt.initEvent('touchstart', true, true);
	} else if('keyup'==event.type) {
		touchevt.initEvent('touchend', true, true);
	}
	element.dispatchEvent(touchevt);		
}

//add event listeners to document
document.addEventListener('keydown', handleKey, false);
document.addEventListener('keyup', handleKey, false);

