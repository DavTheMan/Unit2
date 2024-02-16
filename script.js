const playerContainer = document.getElementById('all-players-container');
const singleContainer = document.getElementById('player-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2309-FTB-ET-WEB-PT';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/2309-FTB-ET-WEB-PT/`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
//let lonePlayerId;

const fetchAllPlayers = async () => {
    try {
        const response = await fetch(APIURL + "players");
        const json = await response.json();
        return json.data.players;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(APIURL + `players/${playerId}`);
        const json = await response.json();
        return json.data;
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(APIURL + "players", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  name: playerObj.name,
              breed: playerObj.breed,
              status: playerObj.status,
              imageUrl: playerObj.imageUrl
            }),
          });
        init();
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}players/${playerId}`, {
            method: 'DELETE',
          });
        init();
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */

let lonePlayerId; 
const renderAllPlayers = async (playerList) => {
    try {
        if(lonePlayerId){
            const lonePlayerObj = await fetchSinglePlayer(lonePlayerId);
            const importantPlayer = document.createElement("div");
            importantPlayer.setAttribute("id", "importantPlayer");
            importantPlayer.innerHTML = `<br>
            <h1>${lonePlayerObj.player.name}</h1>
            <br> 
            <p>${lonePlayerObj.player.status}<p>
            <br>
            <img src= "${lonePlayerObj.player.imageUrl}" alt= "Picture of ${lonePlayerObj.name}" width= "600">
            <br>
            <p>${lonePlayerObj.player.team.name}</p>
            <br>
            <p>${lonePlayerObj.player.status}</p>
            <br>`;
            const backButton = document.createElement("button");
            //backButton.setAttribute("id","backButton");
            backButton.innerText = "Return to all Players";
            importantPlayer.append(backButton);
            backButton.addEventListener("click", () => {
                lonePlayerId = undefined;
                init();
            });
            playerContainer.replaceChildren(importantPlayer);
            //playerContainer.style.justifyContent = "flex-start";
        }else if(!playerList){
            playerContainer.innerHTML ="<p>No Players on the Field.<p>"
        }else{
            const playerCards = playerList.map((player) => {
                const card = document.createElement("div");
                card.setAttribute("class", "card");
                card.innerHTML = `<br>
                    <h1>${player.name}</h1>
                    <br>
                    <img src= "${player.imageUrl}" alt= "Picture of ${player.name}" width= "300">
                    <br>
                    <h2>${player.breed}</h2>
                    <br>
                    <h2>${player.status}</h2>
                    <br>`;
                const infoButton = document.createElement("button");
                infoButton.setAttribute("class", "detailsButton");
                infoButton.innerText = `Info about ${player.name}`;
                card.append(infoButton);
                infoButton.addEventListener("click", () => {lonePlayerId = player.id; init();});
                //infoButton.addEventListener("click", () => {fetchSinglePlayer(player.id)});
                //infoButton.addEventListener("click", () => {renderPlayer(player.id)});
                const br = document.createElement("p");
                br.innerHTML = `<br>`;
                card.append(br);
                const deleteButton = document.createElement("button");
                deleteButton.setAttribute("class", "deleteButton");
                deleteButton.innerText = "Delete this player";
                card.append(deleteButton);
                deleteButton.addEventListener("click", () => {removePlayer(player.id)});
        
                return card;
            });
            playerContainer.replaceChildren(...playerCards);
            playerContainer.style.justifyContent = "flex-start";
        
        }
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {
        const form = document.createElement("form");
        form.setAttribute("id", "newPLayerForm");
        form.innerHTML = `<br>
            <label>
                Player Name
                <input type="text" name="name" />
            </label>
            <label>
                Breed
                <input type="text" name="breed" />
            </label>
            <label for="status">Status</label>
            <select id="status">
                <option value="field">Field</option>
                <option value="bench">Bench</option>
            </select>
            <label>
                Image URL
                <input type="tel" name="imageUrl" />
          </label>
            <button>Add Player</button>`;
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formObj = {
                name: event.target[0].value,
                breed: event.target[1].value,
                status: event.target[2].value,
                imageUrl: event.target[3].value
            }
            addNewPlayer(formObj);
        });
        newPlayerFormContainer.replaceChildren(form);
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}
const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);

    renderNewPlayerForm();
}

init();