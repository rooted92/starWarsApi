import { GetData, GetPlanets } from "../services/data.js";
import { ActivateStarFighter, CreatePlanetsElements } from "../services/functions.js";

// Global variables
const injectHere = document.querySelector('#injectHere');
const starFighter = document.querySelector('#starFighter');

injectHere.innerHTML = `
<div class="row"><div class="col-12 d-flex flex-column align-items-center floater"><img src="../assets/images/icons8-baby-yoda-144.png" alt="Baby Yoda Loading Icon"><p class="text-white font-monospace fs-2">Loading...</p></div></div>
`;

// Event listeners
starFighter.addEventListener('click', () => ActivateStarFighter(starFighter));

let data = await GetData();
let planets  = await GetPlanets(data.planets);
console.log(planets);

injectHere.innerHTML = '';

CreatePlanetsElements(planets, injectHere);