

/*
------------- check if website is done loading

if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready)
} else {
	ready()
}

function ready () {
	// onClick Functions
}
*/

/*
----------- für dynamisches erstellen von Player
use classes for buttons to select similar buttons --> creates array of buttons
--> iterate over array with eventListener and execute one function (use event.target to use right button in function)
use hierarchy to find values

 */

// wallet ~= credits
const startW = 200; //jeder Spieler beginnt mit 200

//Element von html zum Bearbeiten in JS speichern
const Cwallet1 = document.querySelector("#wallet1");
const Cwallet2 = document.querySelector("#wallet2");
const Cwallet3 = document.querySelector("#wallet3");
const Cwallet4 = document.querySelector("#wallet4");

//jedem player das gleiche Startgeld zuweisen
Cwallet1.innerHTML = startW;
Cwallet2.innerHTML = startW;
Cwallet3.innerHTML = startW;
Cwallet4.innerHTML = startW;


//Element von html zum Bearbeiten in JS speichern
const gamePot = document.querySelector("#gamePot");

const button1 = document.querySelector("#setB1");
const input1 = document.querySelector("#gives1");

const button2 = document.querySelector("#setB2");
const input2 = document.querySelector("#gives2");

const button3 = document.querySelector("#setB3");
const input3 = document.querySelector("#gives3");

const button4 = document.querySelector("#setB4");
const input4 = document.querySelector("#gives4");

// Funktion zum Einzahlen in den Pot
// wird noch für jeden Button einzel aufgerufen
button1.onclick = function (e) {
	e.preventDefault();
	
	const inVal = parseInt(input1.value, 10); //Input-Betrag speichern
	
	const pot = parseInt(gamePot.innerText, 10) + inVal; // Betrag zu aktuellen Pot addieren
	gamePot.innerText = pot; // neuen Pot anzeigen
	
	const Nwallet = parseInt(Cwallet1.innerText, 10) - inVal; //Betrag von Credits abziehen
	Cwallet1.innerText = Nwallet; //neue Credits anzeigen
	
	input1.value = ""; //placeholder zurücksetzen

};

const splitB = document.querySelector("#splitPotB"); //splitButton

splitB.onclick =  splitPot; // Function zum Aufteilen aufrufen


// ------------- Funktion zum Aufteilen des Potts -----------
// derzeit wird nur dem Player1 der Pot zugeteilt

function splitPot(t) {
	t.preventDefault();

	//const playerID = document.querySelector('input[name="player"]:checked').value; //gewählter Player von radio Btns

	const pot = parseInt(gamePot.innerText, 10); // aktueller Pot

	const wallet = parseInt(Cwallet1.innerText, 10) + pot; // Pot zu Wallet Player1 zuteilen
	Cwallet1.innerText = wallet; // neue Credits anzeigen
	gamePot.innerText = 0; // Pot wieder auf 00 setzen

	//alert(document.querySelector('input[name="player"]:checked').value); //Kontrolle PlayerID

};


// --------------------- restliche Funktionen zum Einzahlen in den Pot


button2.onclick = function (f) {
	f.preventDefault();
	
	const inVal = parseInt(input2.value, 10);
	
	const pot = parseInt(gamePot.innerText, 10) + inVal; //var?
	gamePot.innerText = pot;
	
	const Nwallet = parseInt(Cwallet2.innerText, 10) - inVal;
	Cwallet2.innerText = Nwallet;
	
	input2.value = "";

};

button3.onclick = function (g) {
	g.preventDefault();
	
	const inVal = parseInt(input3.value, 10);
	
	const pot = parseInt(gamePot.innerText, 10) + inVal; //var?
	gamePot.innerText = pot;
	
	const Nwallet = parseInt(Cwallet3.innerText, 10) - inVal;
	Cwallet3.innerText = Nwallet;
	
	input3.value = "";

};

button4.onclick = function (h) {
	h.preventDefault();
	
	const inVal = parseInt(input4.value, 10);
	
	const pot = parseInt(gamePot.innerText, 10) + inVal; //var?
	gamePot.innerText = pot;
	
	const Nwallet = parseInt(Cwallet4.innerText, 10) - inVal;
	Cwallet4.innerText = Nwallet;
	
	input4.value = "";

};

