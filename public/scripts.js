if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {

    ready();  //goes to setMoney
}
;

/* -----------------------------------------------------------------------------
   --------------- Function: add new Player ------------------------------------
   -----------------------------------------------------------------------------
 */

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
                <p id="wallet" class="wallet"> ${item.credits} </p>   <!---------------  credits as int oder string-->
                <form id= "set" action="">
                    <input type="text" placeholder="€€€" class="sets" id="sets"/>
                    <button  class="setBtn" id="setB">Set</button> <!------ disabled = true-->
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
   --------------- Function: set Starting Wallets ------------------------------
   -----------------------------------------------------------------------------
 */

const setWalletBtn = document.querySelector("#setWalletB"); //Button
const startW = document.querySelector("#startingW"); //inputFeld
const splitBtn = document.querySelector("#splitPotB"); //splitButton
setWalletBtn.onclick = setWallet; //Funktion aufrufen

async function setWallet(b) {
    b.preventDefault();

    	if (startW.value > 0 && startW.value < 10 ) {
			alert("Credits have to be over 10")
		} else {
			const response = await fetch('/api');
			const data = await response.json();

			for (item of data) {
				var toSend = item;
				//console.log(toSend);
				if (toSend.selected === true) {

					toSend.credits = startW.value.toString();
					console.log(toSend);
					const options = {
						method: 'PUT',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify(toSend)
					};
					fetch('/players', options); //returns to app.put("/players",... in index.js
				}


			}

			const responsePot = await fetch('/pot');
			const dataPot = await responsePot.json();

			for (item of dataPot) {
				if (item.username === "pot1") {
					//console.log(item)
					item.pot = "0";
					//console.log(dataPot)
					const options = {
						method: 'PUT',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify(item)
					};
					fetch('/pot', options);
                    /*var heading = document.getElementsByClassName('heading')[0];
                    var headingDiv = document.createElement('div');
                    var innerHeading = `
                            <div> Pot:
                                <t id="gamePot">${item.pot}</t>
                            </div>`;
                    headingDiv.innerHTML = innerHeading;
                    console.log(headingDiv);
                    console.log(heading);
                    heading.append(headingDiv);

                     */
                }
			}
			/*
            allPlayers = document.getElementsByClassName('card'); //alle Players speichern
            for (var i = 0; i < allPlayers.length; i++) { // alle Players durchgehen
                //var wallet = allPlayers[i]; //
                var wallet = allPlayers[i].querySelector("#wallet"); //wallet eines Players auswählen
                wallet.innerText = startW.value; //startV zuweisen
            }
             */

			//Buttons disablen, weil Spiel beginnt
			var setBtns = document.getElementsByClassName("setBtn");
			for (var i = 0; i < setBtns.length; i++) {
				//var input = setBtns[i].getElementsByClassName("sets");
				var btn = setBtns[i];
				btn.disabled = false;
			}
			setWalletBtn.disabled = true;
			splitBtn.disabled = false;
			startW.value = "";
		}
};

/* -----------------------------------------------------------------------------
   --------------------- Function: set Money -----------------------------------
   -----------------------------------------------------------------------------
   ToDo: wenn Credits unter 0 abfangen*/

const gamePot = document.querySelector("#gamePot");

async function ready() {

    const responsePot = await fetch('/pot');
    const dataPot = await responsePot.json();

    for (item of dataPot) {
        if (item.username === "pot1") {
            var heading = document.getElementsByClassName('heading')[0];
            var headingDiv = document.createElement('div');
            var innerHeading = `
                         <div> Pot:
                             <t id="gamePot">${item.pot}</t>
                         </div>`;
            headingDiv.innerHTML = innerHeading;
            console.log(headingDiv);
            console.log(heading);
            heading.append(headingDiv);
      }
    }


    var setBtns = document.getElementsByClassName("setBtn"); //alle setBtns speichern
    //console.log(setBtns);
    //console.log(setBtns.length);
    for (var i = 0; i < setBtns.length; i++) {
       // alert(setBtns);
        //var input = setBtns[i].getElementsByClassName("sets");
        var btn = setBtns[i];
        btn.onclick = setMoney; //Funktion aufrufen
    };
};

async function setMoney(e) {
    e.preventDefault();

    const btnCl = e.target; //target, damit nur dieser (geklickte) Button verwendent wird
    const playerCard = btnCl.parentElement.parentElement; //PlayerCard auswählen
    const playerName = playerCard.getElementsByClassName('playerID')[0].innerHTML;
	console.log(playerName)
    const gamePot = document.querySelector("#gamePot");
    const setVal = playerCard.getElementsByClassName('sets')[0].value; //input auswählen
    const inVal = parseInt(setVal, 10); //Input-Betrag speichern
    var wallet = playerCard.getElementsByClassName('wallet')[0]; //aktuelle Credits speichern
    const Nwallet = parseInt(wallet.innerText, 10) - parseInt(setVal, 10); //Betrag von Credits abziehen
	const Npot = parseInt(gamePot.innerText, 10) + inVal; // Betrag zu aktuellen Pot addieren

	const response = await fetch('/api');
	const data = await response.json();
	const responsePot = await fetch('/pot');
	const dataPot = await responsePot.json();
	//console.log(dataPot);

	if (Nwallet <= 0) {
        alert(playerName + " does not have enought money to bet.")
    } else {
        /*
		const pot = parseInt(gamePot.innerText, 10) + inVal; // Betrag zu aktuellen Pot addieren
        gamePot.innerText = pot; // neuen Pot anzeigen

        wallet.innerText = Nwallet; //neue Credits anzeigen
         */
		for (item of data) {
			if (item.username === playerName) {
				//console.log(item)
				item.credits = Nwallet.toString();
				const options = {
					method: 'PUT',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(item)
				};
				fetch('/players', options); //returns to app.put("/players",... in index.js
			}
		};

		for (item of dataPot) {
			if (item.username === "pot1") {
				console.log(item)
				item.pot = Npot.toString();
				//console.log(dataPot)
				const options = {
					method: 'PUT',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(item)
				};
				fetch('/pot', options);
			}
		}
        let setset = playerCard.getElementsByClassName('sets')[0].value = ""; //placeholder zurücksetzen
    }
};

/* -----------------------------------------------------------------------------
   --------------- Function: split the Pot -------------------------------------
   -----------------------------------------------------------------------------*/

splitBtn.onclick = splitPot; // Function zum Aufteilen aufrufen

async function splitPot(t) {
    t.preventDefault();

    const radiochecked = document.querySelector('input[name="player"]:checked');

    if (radiochecked === null) {
        alert("No player selected to split the pot!")
    } else {
        const gamePot = document.querySelector("#gamePot");
        const pot = parseInt(gamePot.innerText, 10); // aktueller Pot

        const playerID = radiochecked.id; //gewählter Player von radio Btns

        var allPlayers = document.getElementsByClassName('card');
        var playerName;
        var player;

        for (var i = 0; i < allPlayers.length; i++) { //Player-Card suchen
            playerName = allPlayers[i].getElementsByClassName("playerID")[0].innerHTML;
            if (playerName === playerID) {
                player = allPlayers[i];
                break;
            }
        }

        const wallet = player.getElementsByClassName('wallet')[0]; //aktuelle Credits auswählen
        const walletVal = wallet.innerHTML;
        const Nwallet = parseInt(walletVal, 10) + pot; // Pot zu Wallet addieren
        const Npot = "0";





        if (Nwallet <= 0) {
            alert(playerName + " does not have enought money to bet.")
        } else {

            // wallet.innerHTML = Nwallet; // neue Credits anzeigen
            //gamePot.innerText = 0; // Pot wieder auf 00 setzen

            const response = await fetch('/api');
            const data = await response.json();
            const responsePot = await fetch('/pot');
            const dataPot = await responsePot.json();

            for (item of data) {
                if (item.username === playerName) {
                    //console.log(item)
                    item.credits = Nwallet.toString();
                    const options = {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(item)
                    };
                    fetch('/players', options); //returns to app.put("/players",... in index.js
                }
            }
            ;

            for (item of dataPot) {
                if (item.username === "pot1") {
                    console.log(item)
                    item.pot = Npot;
                    //console.log(dataPot)
                    const options = {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(item)
                    };
                    fetch('/pot', options);
                }
            }

            const uncheck = document.querySelector('input[name="player"]:checked');
            uncheck.checked = false;


        }
    }
};


/* -----------------------------------------------------------------------------
	--------------- Function: deselect a Player ----------------------------------
	-----------------------------------------------------------------------------
*/

const endGameBtn = document.getElementById('endGameB') //Button
endGameBtn.onclick = endGame; //Funktion aufrufen

async function endGame(e) {
    e.preventDefault();
    console.log("endgame");

    const response = await fetch('/api');
    const data = await response.json();
    //console.log(data);

    for (item of data) {
        var toSend = item;
        //console.log(toSend);
        if (toSend.selected == true) {
            toSend.selected = false;
            toSend.credits = "0";
            console.log(toSend);
            const options = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(toSend)
            };
            fetch('/players', options); //returns to app.put("/players",... in index.js
        }
    }
    console.log("goToHome")
    //goToHome(e);
    window.location.href = "/home";
}

/*
async function goToHome() {
	fetch('/').then(res => res.redirect("/home"));
	//e.render('/home')
	//window.location.pathname = "/";
}*/


