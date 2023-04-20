import { GetVehicles, GetData } from "../services/data.js";
import { ActivateStarFighter, CreateVehicleElements } from "../services/functions.js";

// TODO - Work on pagination, make CreateEl function an imported function

// Global Variables
// Selected Objects
const injectHere = document.getElementById('injectHere');
const starFighter = document.getElementById('starFighter');

//Loading...
injectHere.innerHTML = `
    <div class="row">
        <div class="col-12 d-flex flex-column align-items-center floater">
            <img src="../assets/images/icons8-baby-yoda-144.png" alt="Baby Yoda Loading Icon">
            <p class="text-white font-monospace fs-2">Loading...</p>
        </div>
    </div>
`;

// Event Listeners
starFighter.addEventListener('click', () => ActivateStarFighter(starFighter));

// Functions
let data = await GetData();
let vehicleData = await GetVehicles(data.vehicles);
// console.log(vehicleData);
injectHere.innerHTML = '';

CreateVehicleElements(vehicleData, injectHere);