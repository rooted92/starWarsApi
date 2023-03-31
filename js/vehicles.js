import { GetVehicles } from "../services/apiCalls.js";
import { ActivateStarFighter } from "../services/functions.js"

// Global Variables
let vehicleData = await GetVehicles();
console.log(vehicleData);

// Selected Objects
const injectHere = document.getElementById('injectHere');
const starFighter = document.getElementById('starFighter');

// Event Listeners
starFighter.addEventListener('click', () => ActivateStarFighter(starFighter));