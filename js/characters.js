import { GetData, GetAllCharacters, NextPage, PreviousPage, GetHomeworldFromCharacter, GetStarshipsFromCharacter, GetVehiclesFromCharacter, GetFilmsFromCharacter } from "../services/apiCalls.js";

import { CreateCharacterCard, ActivateStarFighter } from "../services/functions.js";

// selected objects
const injectHere = document.querySelector('#injectHere');
const starFighter = document.getElementById('starFighter');
// console.log(injectHere);

// Global variables
injectHere.innerHTML = '<div class="d-flex justify-content-center"><div class="spinner-border text-warning" role="status"></div></div>';
let data = await GetData();
let allCharacters = await GetAllCharacters(data.people);
injectHere.innerHTML = '';
// console.log('All Characters func starts with...');
// console.log(allCharacters);

// Event Listeners
starFighter.addEventListener('click', function(){
    ActivateStarFighter(starFighter);
});

// Functions


// When page first loads populate data
CreateCharacterCard(allCharacters, injectHere);