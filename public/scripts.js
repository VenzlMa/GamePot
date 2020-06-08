if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', ready)
} else {
	ready();  //goes to setMoney
};


getPlayers();
async function getPlayers() {
	const response = await fetch('/api');
	const data = await response.json();

	for (item of data) {
		if (item.selected === true) {
			var newPlayer = document.createElement('div'); //neue Player-Card anlegen
			var allPlayers = document.getElementsByClassName('card-wrapper')[0];

			var newPlayerContent = `
			<div class="card">
                <h1 class="playerID">${item.username}</h1>
                <p id="wallet" class="wallet"> 0 </p>
                <form id= "set" action="">
                    <input type="text" placeholder="€€€" class="sets" id="sets"/>
                    <button disabled = true class="setBtn" id="setB">Set</button>
                </form>
            </div>`;
			newPlayer.innerHTML = newPlayerContent;
			allPlayers.append(newPlayer); //neue Play-card zu card-wrapper hinzufügen
			newPlayer.getElementsByClassName('setBtn')[0].onclick = setMoney; //Funktion aufrufen, falls Button geklickt wird

			// RADIO Buttons
			var newRadio = document.createElement('div');
			var allRadio = document.getElementsByClassName('radioWrapper')[0];
			var newPlayerRadio = `<input class="radio" type="radio" name="player" id="${item.username}">${item.username}<br>`

			newRadio.innerHTML = newPlayerRadio;
			allRadio.append(newRadio);
		}
	}
}


/* -----------------------------------------------------------------------------
   --------------- Function: add new Player ------------------------------------
   -----------------------------------------------------------------------------
   ToDo: check if name already exists

//let allPlayersGlobal = document.getElementsByClassName('card');

const addPlayerBtn = document.querySelector("#addPlayerB");
//addPlayerBtn.onclick = addPlayer; // addPlayer ausführen wenn Klick auf addPlayer-Button

function addPlayer(a) {
	a.preventDefault();
	//alert("newPlayer"); // test ob funktion aufgerufen wird
	const userName =document.querySelector("#addID"); //input-Feld speichern

	var newPlayer = document.createElement('div'); //neue Player-Card anlegen
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
	allPlayers.append(newPlayer); //neue Play-card zu card-wrapper hinzufügen
	newPlayer.getElementsByClassName('setBtn')[0].onclick = setMoney; //Funktion aufrufen, falls Button geklickt wird

	//selbes für Radio-Button statt Player-Card
	var newRadio = document.createElement('div');
	var newPlayerRadio = `<input class="radio" type="radio" name="player" id="${userName.value}">${userName.value}<br>`

	newRadio.innerHTML = newPlayerRadio;
	var allRadio = document.getElementsByClassName('radioWrapper')[0];
	allRadio.append(newRadio);

	userName.value = ''; // userName wiedre auf placholder setzten
}
*/

/* -----------------------------------------------------------------------------
   --------------- Function: set Starting Wallets ------------------------------
   -----------------------------------------------------------------------------
   ToDO: min Credits?*/

const setWalletBtn = document.querySelector("#setWalletB"); //Button
const startW =document.querySelector("#startingW"); //inputFeld
const splitBtn = document.querySelector("#splitPotB"); //splitButton

setWalletBtn.onclick = setWallet; //Funktion aufrufen

function setWallet (b) {
	b.preventDefault();

	allPlayers = document.getElementsByClassName('card'); //alle Players speichern

	for(var i = 0; i < allPlayers.length; i++) { // alle Players durchgehen
		//var wallet = allPlayers[i]; //
		var wallet = allPlayers[i].querySelector("#wallet"); //wallet eines Players auswählen
		wallet.innerText = startW.value; //startV zuweisen
	}

	//Buttons disablen, weil Spiel beginnt
	var setBtns = document.getElementsByClassName("setBtn");
	//console.log(setBtns);
	for(var i = 0; i < setBtns.length; i++) {
		//var input = setBtns[i].getElementsByClassName("sets");
		var btn = setBtns[i];
		btn.disabled = false;
	}
	setWalletBtn.disabled = true;
	//addPlayerBtn.disabled = true;
	// removePlayerBtn.disabled = true;
	splitBtn.disabled = false;

	startW.value = "";
};

/* -----------------------------------------------------------------------------
   --------------------- Function: set Money -----------------------------------
   -----------------------------------------------------------------------------
   ToDo: wenn Credits unter 0 abfangen*/

const gamePot = document.querySelector("#gamePot");

function ready (e) {
	var setBtns = document.getElementsByClassName("setBtn"); //alle setBtns speichern
	console.log(setBtns);
	console.log(setBtns.length);
	for(var i = 0; i < setBtns.length; i++) {
		alert(setBtns);
		//var input = setBtns[i].getElementsByClassName("sets");
		var btn = setBtns[i];
		btn.onclick = setMoney; //Funktion aufrufen
	};
};

function setMoney(e) {
	e.preventDefault();

	const btnCl = e.target; //target, damit nur dieser (geklickte) Button verwendent wird
	const playerCard = btnCl.parentElement.parentElement; //PlayerCard auswählen

	const gamePot = document.querySelector("#gamePot");

	const set = playerCard.getElementsByClassName('sets')[0].value; //input auswählen
	const inVal = parseInt(set, 10); //Input-Betrag speichern

	const pot = parseInt(gamePot.innerText, 10) + inVal; // Betrag zu aktuellen Pot addieren
	gamePot.innerText = pot; // neuen Pot anzeigen

	var wallet = playerCard.getElementsByClassName('wallet')[0]; //aktuelle Credits speichern

	const Nwallet = parseInt(wallet.innerText, 10) - parseInt(set, 10); //Betrag von Credits abziehen
	wallet.innerText = Nwallet; //neue Credits anzeigen

	/* Tests
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


splitBtn.onclick =  splitPot; // Function zum Aufteilen aufrufen

function splitPot(t) {
	t.preventDefault();
	const playerID = document.querySelector('input[name="player"]:checked').id; //gewählter Player von radio Btns
	var allPlayers = document.getElementsByClassName('card');
	var playerName;
	var player;

	for(var i = 0; i < allPlayers.length; i++) { //Player-Card suchen
		playerName = allPlayers[i].getElementsByClassName("playerID")[0].innerHTML;
		if (playerName === playerID) {
			player = allPlayers[i];
			break;
		}
	}

	const pot = parseInt(gamePot.innerText, 10); // aktueller Pot

	const wallet = player.getElementsByClassName('wallet')[0]; //aktuelle Credits auswählen
	const walletVal = wallet.innerHTML;

	const Nwallet = parseInt(walletVal, 10) + pot; // Pot zu Wallet addieren

	const uncheck = document.querySelector('input[name="player"]:checked');
	uncheck.checked = false;

/* Tests
	console.log("pot"); console.log(pot);
	console.log("wallet"); console.log(wallet);
	console.log("walletVal"); console.log(walletVal);
	console.log("Nwallet");console.log(Nwallet);
	const btnCl = t.target;
	const radioWrapper = btnCl.parentElement;
	console.log(radioWrapper);
	console.log(allPlayers);
	console.log(playerID); //Kontrolle PlayerID
*/
	wallet.innerHTML = Nwallet; // neue Credits anzeigen
	gamePot.innerText = 0; // Pot wieder auf 00 setzen



};


/* -----------------------------------------------------------------------------
	--------------- Function: remove a Player ----------------------------------
	-----------------------------------------------------------------------------
	ToDO: ALLES, aber ist diese Funktion nötig

const removePlayerBtn = document.querySelector("#removePlayerB");
//const userName =document.querySelector("#userID");
removePlayerBtn.onclick = removePlayer;

function removePlayer(a) {
	a.preventDefault();
	alert("removePlayer");
};

*/