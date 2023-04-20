import { GetData, GetStarships } from "../services/data.js";
import { CreateStarshipElements, ActivateStarFighter } from "../services/functions.js";

// Global variables
const injectHere = document.querySelector('#injectHere');
const starFighter = document.querySelector('#starFighter');

injectHere.innerHTML = `
    <div class="row">
        <div class="col-12 d-flex flex-column align-items-center floater">
            <img src="../assets/images/icons8-baby-yoda-144.png" alt="Baby Yoda Loading Icon">
            <p class="text-white font-monospace fs-2">Loading...</p>
        </div>
    </div>
`;

let data = await GetData();
let starshipData = await GetStarships(data.starships);
console.log(starshipData);

injectHere.innerHTML = '';
// Functions
await CreateStarshipElements(starshipData, injectHere);

const TestData = async () => {
    const response = await fetch('https://swapi.dev/api/starships/?page=2');
    const data = await response.json();
    console.log(data);
}
TestData();
// Event Listeners
starFighter.addEventListener('click', () => ActivateStarFighter(starFighter));