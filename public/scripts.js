
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

/* -----------------------------------------------------------------------------
   --------------- Function: set Starting Wallets ------------------------------
   -----------------------------------------------------------------------------
   ToDo: Iterate over cards and apply to every Button
   */

const setWalletBtn = document.querySelector("#setWalletB");
const startW =document.querySelector("#startingW");

setWalletBtn.onclick = setWallet;

function setWallet (b) {
	b.preventDefault();
	// alert("setMoney");

	var wallet = document.querySelector("#wallet");
	wallet.innerText = startW.value;

	setWalletBtn.disabled = true;
	addPlayerBtn.disabled = true;
	removePlayerBtn.disabled = true;

	startW.value = "";

}

/* -----------------------------------------------------------------------------
   --------------- Function: add new Player ------------------------------------
   -----------------------------------------------------------------------------*/

const addPlayerBtn = document.querySelector("#addPlayerB");
addPlayerBtn.onclick = addPlayer;

function addPlayer(a) {
	a.preventDefault();
	//alert("newPlayer");
	const userName =document.querySelector("#addID");

	var newPlayer = document.createElement('div');
	var newPlayerContent = `
			<div class="card">
                <h1>${userName.value}</h1>
                <p id="wallet"> 0 </p>
                <form id= "set" action="">
                    <input type="text" placeholder="€€€" id="sets"/>
                    <button id="setB">Set</button>
                </form>
            </div>`
	newPlayer.innerHTML = newPlayerContent;
	var allPlayers = document.getElementsByClassName('card-wrapper')[0];
	allPlayers.append(newPlayer);

	userName.value = '';

}

/* -----------------------------------------------------------------------------
	--------------- Function: remove a Player ----------------------------------
	-----------------------------------------------------------------------------*/

const removePlayerBtn = document.querySelector("#removePlayerB");
//const userName =document.querySelector("#userID");
removePlayerBtn.onclick = removePlayer;


function removePlayer(a) {
	a.preventDefault();
	alert("removePlayer");
}

/* -----------------------------------------------------------------------------
   --------------------- Function: set Money -----------------------------------
   -----------------------------------------------------------------------------*/

const gamePot = document.querySelector("#gamePot");
const setBtn = document.querySelector("#setB");
const set = document.querySelector("#sets");

setBtn.onclick = setMoney;

function setMoney (e) {
	e.preventDefault();
	
	const inVal = parseInt(set.value, 10); //Input-Betrag speichern
	
	const pot = parseInt(gamePot.innerText, 10) + inVal; // Betrag zu aktuellen Pot addieren
	gamePot.innerText = pot; // neuen Pot anzeigen

	const wallet = document.querySelector("#wallet");

	const Nwallet = parseInt(wallet.innerText, 10) - inVal; //Betrag von Credits abziehen
	wallet.innerText = Nwallet; //neue Credits anzeigen

	set.value = ""; //placeholder zurücksetzen

};

/* -----------------------------------------------------------------------------
   --------------- Function: split the Pot -------------------------------------
   -----------------------------------------------------------------------------*/

const splitBtn = document.querySelector("#splitPotB"); //splitButton
splitBtn.onclick =  splitPot; // Function zum Aufteilen aufrufen

function splitPot(t) {
	t.preventDefault();
	//alert("splitPot");
	//const playerID = document.querySelector('input[name="player"]:checked').value; //gewählter Player von radio Btns

	const pot = parseInt(gamePot.innerText, 10); // aktueller Pot
	var wallet = document.querySelector("#wallet");

	const Nwallet = parseInt(wallet.innerText, 10) + pot; // Pot zu Wallet Player1 zuteilen

	wallet.innerText = Nwallet; // neue Credits anzeigen
	gamePot.innerText = 0; // Pot wieder auf 00 setzen

	alert(document.querySelector('input[name="player"]:checked').value); //Kontrolle PlayerID

};



