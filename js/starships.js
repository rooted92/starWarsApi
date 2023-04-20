import { GetData, GetStarships } from "../services/data.js";
import { CreateStarshipElements } from "../services/functions.js";

// Global variables
const injectHere = document.querySelector('#injectHere');
let data = await GetData();
let starshipData = await GetStarships(data.starships);
console.log(starshipData);

// Functions
CreateStarshipElements(starshipData, injectHere);

// Event Listeners