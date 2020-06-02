if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
};

getPlayers();
async function getPlayers() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        if (item.selected === false) {
            var newPlayer = document.createElement('div'); //neue Player-Card anlegen
            var allPlayers = document.getElementsByClassName('card-wrapper')[0];

            var newPlayerContent = `
			         <div class="card">
                         <h1>${item.username}</h1>
                         <!--form> action="/players" method="POST"> </form-->
                         <form id = "choose" action="">
                            <button type="submit" id="chooseBtn" class="ChBtn">Choose!</button>
                         </form>                        
                     </div>`;
            newPlayer.innerHTML = newPlayerContent;
            allPlayers.append(newPlayer); //neue Play-card zu card-wrapper hinzufügen
        }
    }
}


function ready (e) {
    var chooseBtns = document.getElementsByClassName("ChBtn");
    console.log(chooseBtns.length);
    for (var i=0; i < chooseBtns.length; i++) {
        console.log(chooseBtns[i]);
        var btn = chooseBtns[i];
        //btn.onclick = selectPlayer;
    };
};

/*
function selectPlayer (r) {
    r.preventDefault();
    alert("choose");

   /* const btnCl = e.target; //target, damit nur dieser (geklickte) Button verwendent wird
    const playerCard = btnCl.parentElement.parentElement; //PlayerCard auswählen
    console.log(playerCard);

}*/