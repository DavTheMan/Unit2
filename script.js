const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2309-FTB-ET-WEB-PT';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/2309-FTB-ET-WEB-PT/players`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
let lonePlayerId;
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
        const response = await fetch(`${APIURL}players/${playerId}`);
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
const renderAllPlayers = (playerList) => {
    try {
        if (LonePlayerId){
            const 
        } 
        else if (!playerList){
            playerContainer.innerHTML = "<p>No Players on the Field.<p>"
        }
        else{

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