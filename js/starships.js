import { GetStarships } from "../services/data.js";
import { CreateStarshipElements } from "../services/functions.js";

// Global variables
const injectHere = document.querySelector('#injectHere');
const starshipData = await GetStarships();
console.log(starshipData);

// Functions
CreateStarshipElements(starshipData, injectHere);

// Event Listeners