import { GetAllFilms, GetData, GetFilms, GetNextOrPrevData } from "../services/data.js";
import { ActivateStarFighter, CreateFilmsElements } from "../services/functions.js";

// Global Variables
const injectHere = document.querySelector('#injectHere');
const starFighter = document.querySelector('#starFighter');

injectHere.innerHTML = `
<div class="row"><div class="col-12 d-flex flex-column align-items-center floater"><img src="../assets/images/icons8-baby-yoda-144.png" alt="Baby Yoda Loading Icon"><p class="text-white font-monospace fs-2">Loading...</p></div></div>
`;

let data = await GetData();
console.log(data.films)
let films = await GetAllFilms(data.films);

injectHere.innerHTML = '';

// Functions
CreateFilmsElements(films, injectHere);

// Event Listeners
starFighter.addEventListener('click', () => ActivateStarFighter(starFighter));