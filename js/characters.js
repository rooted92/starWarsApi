import { GetData, GetAllCharacters } from "../services/data.js";

import { CreateCharacterCard, ActivateStarFighter } from "../services/functions.js";

// selected objects
const injectHere = document.querySelector('#injectHere');
const starFighter = document.getElementById('starFighter');
// console.log(injectHere);

// Global variables
injectHere.innerHTML = '<div class="row"><div class="col-12 d-flex flex-column align-items-center floater"><img src="../assets/images/icons8-baby-yoda-144.png" alt="Baby Yoda Loading Icon"><p class="text-white font-monospace fs-2">Loading...</p></div></div>';
let data = await GetData();
console.log(data);
let allCharacters = await GetAllCharacters(data.people);
injectHere.innerHTML = '';
console.log('All Characters func starts with...');
console.log(allCharacters);

// Event Listeners
starFighter.addEventListener('click', function(){
    ActivateStarFighter(starFighter);
});

// Functions


// When page first loads populate data
CreateCharacterCard(allCharacters, injectHere);