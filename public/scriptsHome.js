if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

let data;
let response;

getPlayers();

async function getPlayers() {
    response = await fetch('/api');
    data = await response.json();

    for (item of data) {
        if (item.selected === false) {
            var newPlayer = document.createElement('div'); //neue Player-Card anlegen
            var allPlayers = document.getElementsByClassName('card-wrapper')[0];

            var newPlayerContent = `
			         <div class="card choose-card">
                         <h1 id="PlayerCardName">${item.username}</h1>
                         <form <!--action="/players" method="PUT"--> 
                            <button type="submit" id="chooseBtn" class="ChBtn">Choose!</button>
                         </form>                        
                     </div>`;

            newPlayer.innerHTML = newPlayerContent;
            allPlayers.append(newPlayer); //neue Play-card zu card-wrapper hinzufügen
            newPlayer.getElementsByClassName('ChBtn')[0].onclick = selectPlayer; //Funktion aufrufen, falls Button geklickt wird
        }
    }
}

function ready (e) {
    //setInterval(function(){ location.reload(); }, 5000);

    let chooseBtns = document.getElementsByClassName("ChBtn");
    for (var i=0; i < chooseBtns.length; i++) {
        console.log(chooseBtns[i]);
        let btn = chooseBtns[i];
        btn.onclick = selectPlayer;
    }
}

function selectPlayer (r) {
    r.preventDefault();

    const btnCl = r.target; //target, damit nur dieser (geklickte) Button verwendent wird
    const playerCard = btnCl.parentElement.parentElement; //PlayerCard auswählen
    const playerName = playerCard.querySelector("#PlayerCardName").innerHTML;

    console.log(playerName);
    //console.log(data);

    for (item of data) {
        let toSend = item;
        if (toSend.username === playerName && toSend.selected === false) {
            toSend.selected = true;
            //console.log(toSend);
            const options = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(toSend)
            };
            fetch('/players', options); //returns to app.put("/players",... in index.js
            console.log(toSend)
           //
            break;
        }
    }
    window.location.pathname = "/players"
}