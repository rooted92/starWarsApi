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

// const CreateVehicleElements = async () => {
//     // let pilotArr = [];
//     // let filmArr = [];

//     const mainCont = document.createElement('div');
//     mainCont.className = 'container font-monospace';
//     const mainRow = document.createElement('div');
//     mainRow.className = 'row d-flex justify-content-center mb-5';
//     const firstCol = document.createElement('div');
//     firstCol.className = 'col-12 d-flex justify-content-between mb-5';
//     const prevButton = document.createElement('div');
//     prevButton.className = 'btn btn-danger text-dark fw-bolder';
//     prevButton.innerHTML = '&#10229; Previous';
//     const nextButton = document.createElement('div');
//     nextButton.className = 'btn btn-danger text-dark fw-bolder';
//     nextButton.innerHTML = 'Next &#10230;';

//     if(vehicleData.previous === null){
//         prevButton.setAttribute('disabled', true);
//     } else {
//         prevButton.removeAttribute('disabled');
//     }

//     if(vehicleData.next === null){
//         nextButton.setAttribute('disabled', true);
//     } else {
//         nextButton.removeAttribute('disabled');
//     }

//     firstCol.append(prevButton, nextButton);

//     const subRow = document.createElement('div');
//     subRow.className = 'row d-flex justify-content-center';

//     vehicleData.results.map(vehicle => {
//         // console.log(vehicle);
//         const mainColCard = document.createElement('div');
//         mainColCard.className = 'col-12 col-md-10 col-lg-8 card border border-light bg-dark text-light p-4 rounded-4 mb-5';
//         const firstInnerRow = document.createElement('div');
//         firstInnerRow.className = 'row';
//         const firstInnerColSix = document.createElement('div');
//         firstInnerColSix.className = 'col-12 col-sm-6';
//         const h1 = document.createElement('h1');
//         h1.className = 'text-info';
//         h1.textContent = `${vehicle.name}`;
//         const modelH4 = document.createElement('h4');
//         modelH4.innerHTML = `Model: <span class="text-warning fw-lighter">${vehicle.model}</span>`;

//         firstInnerColSix.append(h1, modelH4);

//         const secondInnerColSix = document.createElement('div');
//         secondInnerColSix.className = 'col-12 col-sm-6 d-flex flex-column align-items-start';
//         const classH4 = document.createElement('h4');
//         classH4.innerHTML = `Vehicle Class: <span class="fw-lighter text-success">${vehicle.vehicle_class}</span>`;
//         const manufacturerH4 = document.createElement('h4');
//         manufacturerH4.innerHTML = `Manufacturer: <span class="text-primary fw-lighter">${vehicle.manufacturer}</span>`;

//         secondInnerColSix.append(classH4, manufacturerH4);
//         firstInnerRow.append(firstInnerColSix, secondInnerColSix);

//         const secondInnerRow = document.createElement('div');
//         secondInnerRow.className = 'row';
//         const firstColTwelve = document.createElement('div');
//         firstColTwelve.className = 'col-12';
//         const h3 = document.createElement('h3');
//         h3.innerHTML = `Cost in Credits: <span class="text-danger text-opacity-75">${vehicle.cost_in_credits}</span>`;

//         firstColTwelve.append(h3);
//         secondInnerRow.append(firstColTwelve);

//         const thirdInnerRow = document.createElement('div')
//         thirdInnerRow.className = 'row';
//         const thirdInnerColSix = document.createElement('div');
//         thirdInnerColSix.className = 'col-12 col-sm-6';
//         const pilotsH4 = document.createElement('h4');
//         let pilotArr = [];
//         vehicle.pilots.length === 0 ? pilotsH4.innerHTML = 'Pilots: N/A' : vehicle.pilots.map(async pilotURL => {
//             let pilotName = await GetPilotNamesForVehicles(pilotURL);
//             // console.log(pilotName);
//             pilotArr.push(pilotName);
//             pilotsH4.innerHTML = `Pilots: ${pilotArr.join(', ')}`;
//         })
//         const passengersH4 = document.createElement(`h4`);
//         passengersH4.innerHTML = `Passengers: ${vehicle.passengers}`;
//         const crewH4 = document.createElement('h4');
//         crewH4.innerHTML = `Crew: ${vehicle.crew}`;

//         thirdInnerColSix.append(pilotsH4, passengersH4, crewH4);

//         const fourthInnerColSix = document.createElement('div');
//         fourthInnerColSix.className = 'col-12 col-sm-6';
//         const cargoH4 = document.createElement('h4');
//         cargoH4.innerHTML = `Cargo Capacity: ${vehicle.cargo_capacity}`;
//         const consumablesH4 = document.createElement('h4');
//         consumablesH4.innerHTML = `Consumables: ${vehicle.consumables}`;
//         const speedH4 = document.createElement('h4');
//         speedH4.innerHTML = `Max Speed: ${vehicle.max_atmosphering_speed}`;
//         const lengthH4 = document.createElement('h4');
//         lengthH4.innerHTML = `Length: ${vehicle.length}`;
//         // ADD CONSUMABLES

//         fourthInnerColSix.append(cargoH4, consumablesH4, speedH4, lengthH4);
//         thirdInnerRow.append(thirdInnerColSix, fourthInnerColSix);

//         const fourthInnerRow = document.createElement('div');
//         fourthInnerRow.className = 'row';
//         const secondInnerColTwelve = document.createElement('div');
//         secondInnerColTwelve.className = 'col-12';
//         const filmsH4 = document.createElement('h4');
//         // filmsH4.innerHTML = `Films: `;
//         let filmArr = [];
//         vehicle.films === 0 ? filmsH4.innerHTML = 'Films: N/A' : vehicle.films.map(async film => {
//             // console.log(film)
//             let filmName = await GetFilmsByTitle(film);
//             // console.log(filmData.title);
//             filmArr.push(filmName);
//             filmsH4.innerHTML = `Films: ${filmArr.join(', ')}`;
//         }) ;

//         secondInnerColTwelve.append(filmsH4);
//         fourthInnerRow.append(secondInnerColTwelve);
//         mainColCard.append(firstInnerRow, secondInnerRow, thirdInnerRow, fourthInnerRow);
//         subRow.append(mainColCard);
//     })

//     nextButton.addEventListener('click', function(){
//         injectHere.innerHTML = '<div class="row"><div class="col-12 d-flex flex-column align-items-center floater"><img src="../assets/images/icons8-baby-yoda-144.png" alt="Baby Yoda Loading Icon"><p class="text-white font-monospace fs-2">Loading...</p></div></div>';
//         GetNextVehicles();
//         injectHere.innerHTML = '';
//         CreateVehicleElements();
//     });

//     prevButton.addEventListener('clikc', function(){
//         injectHere.innerHTML = '<div class="row"><div class="col-12 d-flex flex-column align-items-center floater"><img src="../assets/images/icons8-baby-yoda-144.png" alt="Baby Yoda Loading Icon"><p class="text-white font-monospace fs-2">Loading...</p></div></div>';
//         GetPreviousVechicles();
//         injectHere.innerHTML = '';
//         CreateVehicleElements();
//     });

//     mainRow.append(firstCol, subRow);
//     mainCont.append(mainRow);
//     injectHere.append(mainCont);
// }

CreateVehicleElements(vehicleData, injectHere);