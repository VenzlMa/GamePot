/*
----------- für dynamisches erstellen von Player
use classes for buttons to select similar buttons --> creates array of buttons
--> iterate over array with eventListener and execute one function (use event.target to use right button in function)
use hierarchy to find values

 */
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', ready)
} else {
	ready()  //setMoney
}

/* -----------------------------------------------------------------------------
   --------------- Function: add new Player ------------------------------------
   -----------------------------------------------------------------------------*/

//let allPlayersGlobal = document.getElementsByClassName('card');

const addPlayerBtn = document.querySelector("#addPlayerB");
addPlayerBtn.onclick = addPlayer;

function addPlayer(a) {
	a.preventDefault();
	//alert("newPlayer");
	const userName =document.querySelector("#addID");

	var newPlayer = document.createElement('div');
	var newPlayerContent = `
			<div class="card">
                <h1 class="playerID">${userName.value}</h1>
                <p id="wallet" class="wallet"> 0 </p>
                <form id= "set" action="">
                    <input type="text" placeholder="€€€" class="sets" id="sets"/>
                    <button disabled = true class="setBtn" id="setB">Set</button>
                </form>
            </div>`;
	newPlayer.innerHTML = newPlayerContent;
	var allPlayers = document.getElementsByClassName('card-wrapper')[0];
	allPlayers.append(newPlayer);
	newPlayer.getElementsByClassName('setBtn')[0].onclick = setMoney;

	var newRadio = document.createElement('div');
	var newPlayerRadio = `<input class="radio" type="radio" name="player" id="${userName.value}">${userName.value}<br>`

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
		//allPlayersGlobal[i] = allPlayers[i];
		//console.log(allPlayersGlobal[i]);
	}

	var setBtns = document.getElementsByClassName("setBtn");
	//console.log(setBtns);
	for(var i = 0; i < setBtns.length; i++) {
		//var input = setBtns[i].getElementsByClassName("sets");
		var btn = setBtns[i];
		btn.disabled = false;
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
setBtn = document.getElementsByClassName("setBtn");
setBtn.onclick = setMoney;

function ready (e) {
var setBtns = document.getElementsByClassName("setBtn");
//console.log(setBtns);
	for(var i = 0; i < setBtns.length; i++) {
		//var input = setBtns[i].getElementsByClassName("sets");
		var btn = setBtns[i];
		btn.onclick = setMoney;
	};
};

function setMoney(e) {
	e.preventDefault();

	const btnCl = e.target;
	const playerCard = btnCl.parentElement.parentElement;

	const gamePot = document.querySelector("#gamePot");

	const set = playerCard.getElementsByClassName('sets')[0].value;
	const inVal = parseInt(set, 10); //Input-Betrag speichern

	const pot = parseInt(gamePot.innerText, 10) + inVal; // Betrag zu aktuellen Pot addieren
	gamePot.innerText = pot; // neuen Pot anzeigen

	var wallet = playerCard.getElementsByClassName('wallet')[0];
	var walletValue = wallet.innerText;

	const Nwallet = parseInt(wallet.innerText, 10) - parseInt(set, 10); //Betrag von Credits abziehen
	wallet.innerText = Nwallet; //neue Credits anzeigen

	/*
	console.log("playerCard"); console.log(playerCard);
	console.log("set"); console.log(set);
	console.log("inVal"); console.log(inVal);
	console.log("pot"); console.log(pot)
	console.log("gamePot");	console.log(gamePot)
	console.log("wallet"); console.log(wallet);
	console.log("Nwallet");	console.log(Nwallet)
	*/

	let setset = playerCard.getElementsByClassName('sets')[0].value = ""; //placeholder zurücksetzen
};

/* -----------------------------------------------------------------------------
   --------------- Function: split the Pot -------------------------------------
   -----------------------------------------------------------------------------*/

const splitBtn = document.querySelector("#splitPotB"); //splitButton
splitBtn.onclick =  splitPot; // Function zum Aufteilen aufrufen

function splitPot(t) {
	t.preventDefault();
	const playerID = document.querySelector('input[name="player"]:checked').id; //gewählter Player von radio Btns
	var allPlayers = document.getElementsByClassName('card');
	var playerName;
	var player;

	for(var i = 0; i < allPlayers.length; i++) {
		playerName = allPlayers[i].getElementsByClassName("playerID")[0].innerHTML;
		if (playerName === playerID) {
			player = allPlayers[i];
			break;
		}
	}


	const pot = parseInt(gamePot.innerText, 10); // aktueller Pot

	const wallet = player.getElementsByClassName('wallet')[0];
	const walletVal = wallet.innerHTML;

	const Nwallet = parseInt(walletVal, 10) + pot; // Pot zu Wallet Player1 zuteilen

/*
	console.log("pot"); console.log(pot);
	console.log("wallet"); console.log(wallet);
	console.log("walletVal"); console.log(walletVal);
	console.log("Nwallet");console.log(Nwallet);
*/
	wallet.innerHTML = Nwallet; // neue Credits anzeigen
	gamePot.innerText = 0; // Pot wieder auf 00 setzen

	//const btnCl = t.target;
	//const radioWrapper = btnCl.parentElement;

	//console.log(radioWrapper);
	//console.log(allPlayers);
	//console.log(playerID); //Kontrolle PlayerID

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
};

