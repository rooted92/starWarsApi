import { GetData, GetStarships } from "../services/data.js";
import { CreateStarshipElements, ActivateStarFighter } from "../services/functions.js";

// Global variables
const injectHere = document.querySelector('#injectHere');
const starFighter = document.querySelector('#starFighter');
let data = await GetData();
let starshipData = await GetStarships(data.starships);
console.log(starshipData);

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