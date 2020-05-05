/*
----------- für dynamisches erstellen von Player
use classes for buttons to select similar buttons --> creates array of buttons
--> iterate over array with eventListener and execute one function (use event.target to use right button in function)
use hierarchy to find values

 */

if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready)
} else {
	ready()  //setMoney
}



/* -----------------------------------------------------------------------------
   --------------- Function: add new Player ------------------------------------
   -----------------------------------------------------------------------------*/

var allPlayersGlobal = document.getElementsByClassName('card');

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
                <p id="wallet" class="wallet"> 0 </p>
                <form id= "set" action="">
                    <input type="text" placeholder="€€€" class="sets" id="sets"/>
                    <button class="setBtn" id="setB">Set</button>
                </form>
            </div>`;
	newPlayer.innerHTML = newPlayerContent;
	var allPlayers = document.getElementsByClassName('card-wrapper')[0];
	allPlayers.append(newPlayer);

	var newRadio = document.createElement('div');
	var newPlayerRadio = `<input class="radio" type="radio" name="player" id="radioP">${userName.value}<br>`

	newRadio.innerHTML = newPlayerRadio;
	var allRadio = document.getElementsByClassName('radioWrapper')[0];
	allRadio.append(newRadio);

	userName.value = '';

}

/* -----------------------------------------------------------------------------
   --------------- Function: set Starting Wallets ------------------------------
   -----------------------------------------------------------------------------
   */

const setWalletBtn = document.querySelector("#setWalletB");
const startW =document.querySelector("#startingW");

setWalletBtn.onclick = setWallet;

function setWallet (b) {
	b.preventDefault();

	allPlayers = document.getElementsByClassName('card');

	for(var i = 0; i < allPlayers.length; i++) {
		var wallet = allPlayers[i];
		wallet = wallet.querySelector("#wallet");
		wallet.innerText = startW.value;
		allPlayersGlobal[i] = allPlayers[i];
		//console.log(allPlayersGlobal[i]);
	}

	setWalletBtn.disabled = true;
	addPlayerBtn.disabled = true;
	removePlayerBtn.disabled = true;

	startW.value = "";
};

/* -----------------------------------------------------------------------------
   --------------------- Function: set Money -----------------------------------
   -----------------------------------------------------------------------------*/

const gamePot = document.querySelector("#gamePot");

function ready (e) {
var setBtns = document.getElementsByClassName("setBtn");
	for(var i = 0; i < setBtns.length; i++) {
		//var input = setBtns[i].getElementsByClassName("sets");
		var btn = setBtns[i];
		btn.onclick = setMoney; //(input) ????
	};
};

function setMoney(e) {  // wie input übergeben?
	e.preventDefault();

	const btnCl = e.target;
	const playerForm = btnCl.parentElement; // <form class="set" id="set"> <input....>
	const playerCard = playerForm.parentElement;

	var set = playerForm.getElementsByClassName('sets')[0].innerText;

	const inVal = parseInt(set.value, 10); //Input-Betrag speichern

	const pot = parseInt(gamePot.innerText, 10) + inVal; // Betrag zu aktuellen Pot addieren
	gamePot.innerText = pot; // neuen Pot anzeigen

	var wallet = playerCard.getElementsByClassName('wallet')[0].innerText;

	console.log(playerCard);
	console.log(set);
	console.log(wallet);

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



