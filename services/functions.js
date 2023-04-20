import { GetStarshipsFromCharacter, GetHomeworldFromCharacter, GetVehiclesFromCharacter, GetFilmsFromCharacter, PreviousPage, NextPage, GetFilmsByTitle, GetNextVehicles, GetPreviousVechicles, GetPilotNamesForVehicles, nextStarshipArray, prevStarshipArray, GetPilots, GetFilms, GetNextOrPrevData } from "./data.js";

// Make Character cards function/

const CreateCharacterCard = async (func, inject) => {
    // Make buttons section
    let prevButton = document.createElement('button');
    prevButton.id = 'prevBtn';
    prevButton.classList.add('btn', 'btn-danger', 'text-dark', 'fw-bolder');
    prevButton.textContent = '<< Previous';
    let nextButton = document.createElement('button');
    nextButton.id = 'nextBtn';
    nextButton.className = 'btn btn-danger text-dark fw-bolder';
    nextButton.textContent = 'Next >>'
    let btnColumns = document.createElement('div');
    btnColumns.className = 'col-12 d-flex flex-row justify-content-between text-center';
    btnColumns.append(prevButton, nextButton);
    let btnRow = document.createElement('div');
    btnRow.className = 'row justify-content-center mb-5';
    btnRow.append(btnColumns);

    if (func.previous === null) {
        prevButton.setAttribute('disabled', true);
    } else {
        prevButton.removeAttribute('disabled');
    }

    if (func.next === null) {
        nextButton.setAttribute('disabled', true);
    } else {
        nextButton.removeAttribute('disabled');
    }

    let cardsRow = document.createElement('div');
    cardsRow.className = 'row justify-content-center';

    func.results.map(async person => {
        // get homeworlddata
        let starshipArr = [];
        let vehicleArr = [];
        let filmsArr = [];
        let homeworldData = await GetHomeworldFromCharacter(person.homeworld);
        // console.log(person)
        let starships = document.createElement('h5');
        starships.className = 'card-text mx-1 text-wrap';

        if (person.starships.length > 0) {
            person.starships.map(async starship => {
                let starshipData = await GetStarshipsFromCharacter(starship);
                starshipArr.push(starshipData.name);
                starships.innerHTML = `Starships: <span class="text-success">${starshipArr.join(', ')}</span>`;
            });
        } else {
            starships.innerHTML = `Starships: <span class="text-success">N/A</span>`;
        }

        let vehicles = document.createElement('h5');
        vehicles.className = 'card-text mx-1 text-wrap';


        if (person.vehicles.length > 0) {
            // console.log(person.vehicles);
            person.vehicles.map(async vehicle => {
                // console.log(vehicle);
                let vehicleData = await GetVehiclesFromCharacter(vehicle);
                vehicleArr.push(vehicleData.name);
                vehicles.innerHTML = `Vehicles: <span class="text-info">${vehicleArr.join(', ')}</span>`;
            });
        } else {
            vehicles.innerHTML = `Vehicles: <span class="text-info">N/A</span>`;
        }

        // Make cards
        let films = document.createElement('h5');
        films.className = 'card-text mx-1 text-wrap';
        // films.textContent = `Films: ${person.films.length}`;
        if (person.films.length > 0) {
            person.films.map(async film => {
                // console.log(film);
                let filmData = await GetFilmsFromCharacter(film);
                // console.log(filmData.title);
                filmsArr.push(filmData.title);
                films.innerHTML = `Films: <span class="text-danger">${filmsArr.join(', ')}</span>`;
            })
        } else {
            films.innerHTML = `Films: <span class="text-secondary">N/A</span>`;
        }

        let homeworld = document.createElement('h5');
        homeworld.className = 'card-text mx-1 text-nowrap text-truncate';
        homeworld.innerHTML = `Homeworld: <span class="text-primary">${homeworldData.name}</span>`;// will fetch data later, same for ones above
        let birthyear = document.createElement('h5');
        birthyear.className = 'card-text mx-1 text-wrap';
        birthyear.textContent = `Birthyear: ${person.birth_year}`;

        let mass = document.createElement('h5');
        mass.className = 'card-text mx-1 text-wrap';
        mass.textContent = `Mass: ${person.mass}`;
        let height = document.createElement('h5');
        height.className = 'card-text mx-1 text-wrap';
        height.textContent = `Height: ${person.height}`;
        let skinColor = document.createElement('h5');
        skinColor.className = 'card-text mx-1 text-wrap';
        skinColor.textContent = `Skin Color: ${person.skin_color}`;
        let hairColor = document.createElement('h5');
        hairColor.className = 'card-text mx-1 text-wrap';
        hairColor.textContent = `Hair Color: ${person.hair_color}`;
        let eyeColor = document.createElement('h5');
        eyeColor.className = 'card-text mx-1 text-wrap';
        eyeColor.textContent = `Eye Color: ${person.eye_color}`;
        let gender = document.createElement('h5');
        gender.className = 'card-text mx-1 text-wrap';
        gender.textContent = `Gender: ${person.gender}`;
        let name = document.createElement('h3');
        name.className = 'card-title text-warning';
        name.textContent = `${person.name}`;

        let informationDiv = document.createElement('div');
        informationDiv.className = 'card-body';
        informationDiv.append(name, gender, eyeColor, hairColor, skinColor, height, mass, birthyear, homeworld, starships, vehicles, films);

        let cardDiv = document.createElement('div');
        cardDiv.className = 'card w-100 bg-dark text-white border-light';
        cardDiv.style = 'width: 18rem;';
        cardDiv.append(informationDiv);

        let infoColumn = document.createElement('div');
        infoColumn.className = 'col-12 col-lg-6 col-xl-4 d-flex justify-content-center mb-5';
        infoColumn.append(cardDiv);

        cardsRow.append(infoColumn);
    });

    let cont = document.createElement('div');
    cont.className = 'container font-monospace';
    cont.append(btnRow, cardsRow);

    prevButton.addEventListener('click', async function () {
        inject.innerHTML = '<div class="row"><div class="col-12 d-flex flex-column align-items-center floater"><img src="../assets/images/icons8-baby-yoda-144.png" alt="Baby Yoda Loading Icon"><p class="text-white font-monospace fs-2">Loading...</p></div></div>';
        func = await PreviousPage();
        inject.innerHTML = '';
        CreateCharacterCard(func, inject);
    })

    nextButton.addEventListener('click', async function () {
        inject.innerHTML = '<div class="row"><div class="col-12 d-flex flex-column align-items-center floater"><img src="../assets/images/icons8-baby-yoda-144.png" alt="Baby Yoda Loading Icon"><p class="text-white font-monospace fs-2">Loading...</p></div></div>';
        func = await NextPage();
        inject.innerHTML = '';
        CreateCharacterCard(func, inject);
    });

    inject.append(cont);
}

const CreateVehicleElements = async (func, inject) => {

    const mainCont = document.createElement('div');
    mainCont.className = 'container font-monospace';
    const mainRow = document.createElement('div');
    mainRow.className = 'row d-flex justify-content-center mb-5';
    const firstCol = document.createElement('div');
    firstCol.className = 'col-12 d-flex justify-content-between mb-5';
    let prevButton = document.createElement('div');
    prevButton.className = 'btn btn-danger text-dark fw-bolder';
    prevButton.innerHTML = '&#10229; Previous';
    let nextButton = document.createElement('div');
    nextButton.className = 'btn btn-danger text-dark fw-bolder';
    nextButton.innerHTML = 'Next &#10230;';

    firstCol.append(prevButton, nextButton);

    const subRow = document.createElement('div');
    subRow.className = 'row d-flex justify-content-center';

    if (!func.previous) {
        // console.log('Previous in IF statement: ', func.previous)
        prevButton.setAttribute('disabled', true);
    } else {
        prevButton.removeAttribute('disabled');
        prevButton.addEventListener('click', async function () {
            injectHere.innerHTML = '<div class="row"><div class="col-12 d-flex flex-column align-items-center floater"><img src="../assets/images/icons8-baby-yoda-144.png" alt="Baby Yoda Loading Icon"><p class="text-white font-monospace fs-2">Loading...</p></div></div>';
            let previous = await GetNextOrPrevData(func.previous);
            injectHere.innerHTML = '';
            CreateVehicleElements(previous, inject);
        });
    }

    if (!func.next) {
        nextButton.setAttribute('disabled', true);
    } else {
        nextButton.removeAttribute('disabled');
        nextButton.addEventListener('click', async function () {
            injectHere.innerHTML = '<div class="row"><div class="col-12 d-flex flex-column align-items-center floater"><img src="../assets/images/icons8-baby-yoda-144.png" alt="Baby Yoda Loading Icon"><p class="text-white font-monospace fs-2">Loading...</p></div></div>';
            let next = await GetNextOrPrevData(func.next);
            injectHere.innerHTML = '';
            CreateVehicleElements(next, inject);
        });
    }

    func.results.map(async vehicle => {
        // console.log(vehicle);
        const mainColCard = document.createElement('div');
        mainColCard.className = 'col-12 col-md-10 col-lg-8 card border border-light bg-dark text-light p-4 rounded-4 mb-5';
        const firstInnerRow = document.createElement('div');
        firstInnerRow.className = 'row';
        const firstInnerColSix = document.createElement('div');
        firstInnerColSix.className = 'col-12 col-sm-6';
        const h1 = document.createElement('h1');
        h1.className = 'text-info';
        h1.textContent = `${vehicle.name}`;
        const modelH4 = document.createElement('h4');
        modelH4.innerHTML = `Model: <span class="text-warning fw-lighter">${vehicle.model}</span>`;

        firstInnerColSix.append(h1, modelH4);

        const secondInnerColSix = document.createElement('div');
        secondInnerColSix.className = 'col-12 col-sm-6 d-flex flex-column align-items-start';
        const classH4 = document.createElement('h4');
        classH4.innerHTML = `Vehicle Class: <span class="fw-lighter text-success">${vehicle.vehicle_class}</span>`;
        const manufacturerH4 = document.createElement('h4');
        manufacturerH4.innerHTML = `Manufacturer: <span class="text-primary fw-lighter">${vehicle.manufacturer}</span>`;

        secondInnerColSix.append(classH4, manufacturerH4);
        firstInnerRow.append(firstInnerColSix, secondInnerColSix);

        const secondInnerRow = document.createElement('div');
        secondInnerRow.className = 'row';
        const firstColTwelve = document.createElement('div');
        firstColTwelve.className = 'col-12';
        const h3 = document.createElement('h3');
        h3.innerHTML = `Cost in Credits: <span class="text-danger text-opacity-75">${vehicle.cost_in_credits}</span>`;

        firstColTwelve.append(h3);
        secondInnerRow.append(firstColTwelve);

        const thirdInnerRow = document.createElement('div')
        thirdInnerRow.className = 'row';
        const thirdInnerColSix = document.createElement('div');
        thirdInnerColSix.className = 'col-12 col-sm-6';
        const pilotsH4 = document.createElement('h4');
        let pilotArr = [];
        vehicle.pilots.length === 0 ? pilotsH4.innerHTML = 'Pilots: N/A' : vehicle.pilots.map(async pilotURL => {
            let pilotName = await GetPilotNamesForVehicles(pilotURL);
            // console.log(pilotName);
            pilotArr.push(pilotName);
            pilotsH4.innerHTML = `Pilots: ${pilotArr.join(', ')}`;
        });
        const passengersH4 = document.createElement(`h4`);
        passengersH4.innerHTML = `Passengers: ${vehicle.passengers}`;
        const crewH4 = document.createElement('h4');
        crewH4.innerHTML = `Crew: ${vehicle.crew}`;

        thirdInnerColSix.append(pilotsH4, passengersH4, crewH4);

        const fourthInnerColSix = document.createElement('div');
        fourthInnerColSix.className = 'col-12 col-sm-6';
        const cargoH4 = document.createElement('h4');
        cargoH4.innerHTML = `Cargo Capacity: ${vehicle.cargo_capacity}`;
        const consumablesH4 = document.createElement('h4');
        consumablesH4.innerHTML = `Consumables: ${vehicle.consumables}`;
        const speedH4 = document.createElement('h4');
        speedH4.innerHTML = `Max Speed: ${vehicle.max_atmosphering_speed}`;
        const lengthH4 = document.createElement('h4');
        lengthH4.innerHTML = `Length: ${vehicle.length}`;
        // ADD CONSUMABLES

        fourthInnerColSix.append(cargoH4, consumablesH4, speedH4, lengthH4);
        thirdInnerRow.append(thirdInnerColSix, fourthInnerColSix);

        const fourthInnerRow = document.createElement('div');
        fourthInnerRow.className = 'row';
        const secondInnerColTwelve = document.createElement('div');
        secondInnerColTwelve.className = 'col-12';
        const filmsH4 = document.createElement('h4');
        // filmsH4.innerHTML = `Films: `;
        let filmArr = [];
        vehicle.films === 0 ? filmsH4.innerHTML = 'Films: N/A' : vehicle.films.map(async film => {
            // console.log(film)
            let filmName = await GetFilmsByTitle(film);
            // console.log(filmData.title);
            filmArr.push(filmName);
            filmsH4.innerHTML = `Films: ${filmArr.join(', ')}`;
        });

        secondInnerColTwelve.append(filmsH4);
        fourthInnerRow.append(secondInnerColTwelve);
        mainColCard.append(firstInnerRow, secondInnerRow, thirdInnerRow, fourthInnerRow);
        subRow.append(mainColCard);
    });

    mainRow.append(firstCol, subRow);
    mainCont.append(mainRow);

    injectHere.append(mainCont);
}


const ActivateStarFighter = (docObject) => {
    docObject.classList.add('zoomerOut');
    setTimeout(() => {
        docObject.classList.remove('zoomerOut');
    }, 1000);
}

const CreateSearchedCharacterCard = async (func, inject) => {

    let cardsRow = document.createElement('div');
    cardsRow.className = 'row justify-content-center';

    func.results.map(async person => {
        // get homeworlddata
        let starshipArr = [];
        let vehicleArr = [];
        let filmsArr = [];
        let homeworldData = await GetHomeworldFromCharacter(person.homeworld);
        // console.log(person)
        let starships = document.createElement('h5');
        starships.className = 'card-text mx-1 text-wrap';

        if (person.starships.length > 0) {
            starships.innerHTML = '<div class="d-flex align-items-center text-warning"><strong>Loading...</strong><div class="spinner-border ms-auto text-warning" role="status" aria-hidden="true"></div></div>';
            person.starships.map(async starship => {
                let starshipData = await GetStarshipsFromCharacter(starship);
                starshipArr.push(starshipData.name);
                starships.innerHTML = `Starships: <span class="text-success">${starshipArr.join(', ')}</span>`;
            });
        } else {
            starships.innerHTML = `Starships: <span class="text-success">N/A</span>`;
        }

        let vehicles = document.createElement('h5');
        vehicles.className = 'card-text mx-1 text-wrap';

        if (person.vehicles.length > 0) {
            // console.log(person.vehicles);
            vehicles.innerHTML = '<div class="d-flex align-items-center text-warning"><strong>Loading...</strong><div class="spinner-border ms-auto text-warning" role="status" aria-hidden="true"></div></div>';
            person.vehicles.map(async vehicle => {
                // console.log(vehicle);
                let vehicleData = await GetVehiclesFromCharacter(vehicle);
                vehicleArr.push(vehicleData.name);
                vehicles.innerHTML = `Vehicles: <span class="text-info">${vehicleArr.join(', ')}</span>`;
            });
        } else {
            vehicles.innerHTML = `Vehicles: <span class="text-info">N/A</span>`;
        }

        // Make cards
        let films = document.createElement('h5');
        films.className = 'card-text mx-1 text-wrap';
        // films.textContent = `Films: ${person.films.length}`;
        if (person.films.length > 0) {
            films.innerHTML = '<div class="d-flex align-items-center text-warning"><strong>Loading...</strong><div class="spinner-border ms-auto text-warning" role="status" aria-hidden="true"></div></div>';
            person.films.map(async film => {
                // console.log(film);
                let filmData = await GetFilmsFromCharacter(film);
                // console.log(filmData.title);
                filmsArr.push(filmData.title);
                films.innerHTML = `Films: <span class="text-danger">${filmsArr.join(', ')}</span>`;
            })
        } else {
            films.innerHTML = `Films: <span class="text-secondary">N/A</span>`;
        }

        let homeworld = document.createElement('h5');
        homeworld.className = 'card-text mx-1 text-nowrap text-truncate';
        homeworld.innerHTML = `Homeworld: <span class="text-primary">${homeworldData.name}</span>`;// will fetch data later, same for ones above
        let birthyear = document.createElement('h5');
        birthyear.className = 'card-text mx-1 text-wrap';
        birthyear.textContent = `Birthyear: ${person.birth_year}`;

        let mass = document.createElement('h5');
        mass.className = 'card-text mx-1 text-wrap';
        mass.textContent = `Mass: ${person.mass}`;
        let height = document.createElement('h5');
        height.className = 'card-text mx-1 text-wrap';
        height.textContent = `Height: ${person.height}`;
        let skinColor = document.createElement('h5');
        skinColor.className = 'card-text mx-1 text-wrap';
        skinColor.textContent = `Skin Color: ${person.skin_color}`;
        let hairColor = document.createElement('h5');
        hairColor.className = 'card-text mx-1 text-wrap';
        hairColor.textContent = `Hair Color: ${person.hair_color}`;
        let eyeColor = document.createElement('h5');
        eyeColor.className = 'card-text mx-1 text-wrap';
        eyeColor.textContent = `Eye Color: ${person.eye_color}`;
        let gender = document.createElement('h5');
        gender.className = 'card-text mx-1 text-wrap';
        gender.textContent = `Gender: ${person.gender}`;
        let name = document.createElement('h3');
        name.className = 'card-title text-warning';
        name.textContent = `${person.name}`;

        let informationDiv = document.createElement('div');
        informationDiv.className = 'card-body';
        informationDiv.append(name, gender, eyeColor, hairColor, skinColor, height, mass, birthyear, homeworld, starships, vehicles, films);

        let cardDiv = document.createElement('div');
        cardDiv.className = 'card w-100 bg-dark text-white border-light';
        // cardDiv.style = 'width: 18rem;';
        cardDiv.append(informationDiv);

        let infoColumn = document.createElement('div');
        infoColumn.className = 'col-8 d-flex justify-content-center mb-5';
        infoColumn.append(cardDiv);

        cardsRow.append(infoColumn);
    });

    let cont = document.createElement('div');
    cont.className = 'container font-monospace';
    cont.append(cardsRow);

    inject.append(cont);
}

const CreateSearchedVehicleElements = async (func, inject) => {
    // let pilotArr = [];
    // let filmArr = [];

    const mainCont = document.createElement('div');
    mainCont.className = 'container font-monospace';
    const mainRow = document.createElement('div');
    mainRow.className = 'row d-flex justify-content-center mb-5';

    const subRow = document.createElement('div');
    subRow.className = 'row d-flex justify-content-center';

    func.results.map(async vehicle => {
        // console.log(vehicle);
        const mainColCard = document.createElement('div');
        mainColCard.className = 'col-12 col-md-10 col-lg-8 card border border-light bg-dark text-light p-4 rounded-4 mb-5';
        const firstInnerRow = document.createElement('div');
        firstInnerRow.className = 'row';
        const firstInnerColSix = document.createElement('div');
        firstInnerColSix.className = 'col-12 col-sm-6';
        const h1 = document.createElement('h1');
        h1.className = 'text-info';
        h1.textContent = `${vehicle.name}`;
        const modelH4 = document.createElement('h4');
        modelH4.innerHTML = `Model: <span class="text-warning fw-lighter">${vehicle.model}</span>`;

        firstInnerColSix.append(h1, modelH4);

        const secondInnerColSix = document.createElement('div');
        secondInnerColSix.className = 'col-12 col-sm-6 d-flex flex-column align-items-start';
        const classH4 = document.createElement('h4');
        classH4.innerHTML = `Vehicle Class: <span class="fw-lighter text-success">${vehicle.vehicle_class}</span>`;
        const manufacturerH4 = document.createElement('h4');
        manufacturerH4.innerHTML = `Manufacturer: <span class="text-primary fw-lighter">${vehicle.manufacturer}</span>`;

        secondInnerColSix.append(classH4, manufacturerH4);
        firstInnerRow.append(firstInnerColSix, secondInnerColSix);

        const secondInnerRow = document.createElement('div');
        secondInnerRow.className = 'row';
        const firstColTwelve = document.createElement('div');
        firstColTwelve.className = 'col-12';
        const h3 = document.createElement('h3');
        h3.innerHTML = `Cost in Credits: <span class="text-danger text-opacity-75">${vehicle.cost_in_credits}</span>`;

        firstColTwelve.append(h3);
        secondInnerRow.append(firstColTwelve);

        const thirdInnerRow = document.createElement('div')
        thirdInnerRow.className = 'row';
        const thirdInnerColSix = document.createElement('div');
        thirdInnerColSix.className = 'col-12 col-sm-6';
        const pilotsH4 = document.createElement('h4');
        let pilotArr = [];
        vehicle.pilots.length === 0 ? pilotsH4.innerHTML = 'Pilots: N/A' : vehicle.pilots.map(async pilotURL => {
            pilotsH4.innerHTML = '<div class="d-flex align-items-center text-warning"><strong>Loading...</strong><div class="spinner-border ms-auto text-warning" role="status" aria-hidden="true"></div></div>';
            let pilotName = await GetPilotNamesForVehicles(pilotURL);
            // console.log(pilotName);
            pilotArr.push(pilotName);
            pilotsH4.innerHTML = `Pilots: ${pilotArr.join(', ')}`;
        });
        const passengersH4 = document.createElement(`h4`);
        passengersH4.innerHTML = `Passengers: ${vehicle.passengers}`;
        const crewH4 = document.createElement('h4');
        crewH4.innerHTML = `Crew: ${vehicle.crew}`;

        thirdInnerColSix.append(pilotsH4, passengersH4, crewH4);

        const fourthInnerColSix = document.createElement('div');
        fourthInnerColSix.className = 'col-12 col-sm-6';
        const cargoH4 = document.createElement('h4');
        cargoH4.innerHTML = `Cargo Capacity: ${vehicle.cargo_capacity}`;
        const consumablesH4 = document.createElement('h4');
        consumablesH4.innerHTML = `Consumables: ${vehicle.consumables}`;
        const speedH4 = document.createElement('h4');
        speedH4.innerHTML = `Max Speed: ${vehicle.max_atmosphering_speed}`;
        const lengthH4 = document.createElement('h4');
        lengthH4.innerHTML = `Length: ${vehicle.length}`;
        // ADD CONSUMABLES

        fourthInnerColSix.append(cargoH4, consumablesH4, speedH4, lengthH4);
        thirdInnerRow.append(thirdInnerColSix, fourthInnerColSix);

        const fourthInnerRow = document.createElement('div');
        fourthInnerRow.className = 'row';
        const secondInnerColTwelve = document.createElement('div');
        secondInnerColTwelve.className = 'col-12';
        const filmsH4 = document.createElement('h4');
        // filmsH4.innerHTML = `Films: `;
        let filmArr = [];
        vehicle.films === 0 ? filmsH4.innerHTML = 'Films: N/A' : vehicle.films.map(async film => {
            filmsH4.innerHTML = '<div class="d-flex align-items-center text-warning"><strong>Loading...</strong><div class="spinner-border ms-auto text-warning" role="status" aria-hidden="true"></div></div>';
            // console.log(film)
            let filmName = await GetFilmsByTitle(film);
            // console.log(filmData.title);
            filmArr.push(filmName);
            filmsH4.innerHTML = `Films: ${filmArr.join(', ')}`;
        });

        secondInnerColTwelve.append(filmsH4);
        fourthInnerRow.append(secondInnerColTwelve);
        mainColCard.append(firstInnerRow, secondInnerRow, thirdInnerRow, fourthInnerRow);
        subRow.append(mainColCard);
    });

    mainRow.append(subRow);
    mainCont.append(mainRow);

    inject.append(mainCont);
}

const CreateStarshipElements = async (func, inject) => {
    console.log(func.previous);
    console.log(func.next)
    const content = document.createElement('div');
    content.className = 'container'

    const btnRow = document.createElement('div');
    btnRow.className = 'row mt-3 mb-5';

    const btnCol = document.createElement('div');
    btnCol.className = 'col-12 d-flex flex-row justify-content-between';

    let prevBtn = document.createElement('div');
    prevBtn.className = 'btn btn-danger text-dark fw-bold';
    prevBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/></svg> Previous';

    let nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-danger text-dark fw-bold';
    nextBtn.innerHTML = 'Next <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/></svg>';

    prevBtn.disabled = func.previous === null ? true : false;
    nextBtn.disabled = func.next === null ? true : false;


    btnCol.append(prevBtn, nextBtn);
    btnRow.append(btnCol);
    content.append(btnRow);

    console.log(func.next)
    if (!func.next) {
        console.log(func.next)
        nextBtn.setAttribute('disabled', true);
    } else {
        console.log(func.next);
        nextBtn.removeAttribute('disabled');
        nextBtn.addEventListener('click', async () => {
            inject.innerHTML = '<div class="row"><div class="col-12 d-flex flex-column align-items-center floater"><img src="../assets/images/icons8-baby-yoda-144.png" alt="Baby Yoda Loading Icon"><p class="text-white font-monospace fs-2">Loading...</p></div></div>';
            // used recursion by invokin CreateStarshipElements() within itself, so whenver next or prev btn is clicked the elements for the next array will be created, I will use this pattern for planets and films next
            let next = await GetNextOrPrevData(func.next);
            inject.innerHTML = '';
            CreateStarshipElements(next, inject);
        });
    }

    if (!func.previous) {
        console.log(func.previous);
        prevBtn.setAttribute('disabled', true);
    } else {
        console.log(func.previous);
        prevBtn.removeAttribute('disabled');
        prevBtn.addEventListener('click', async () => {
            inject.innerHTML = '<div class="row"><div class="col-12 d-flex flex-column align-items-center floater"><img src="../assets/images/icons8-baby-yoda-144.png" alt="Baby Yoda Loading Icon"><p class="text-white font-monospace fs-2">Loading...</p></div></div>';
            let previous = await GetNextOrPrevData(func.previous);
            inject.innerHTML = '';
            CreateStarshipElements(previous, inject);
        });
    }

    const mainRow = document.createElement('div');
    mainRow.className = 'row justify-content-center text-white font-monospace';
    content.append(mainRow);

    func.results.forEach(async starship => {
        let pilotArr = [];
        let filmArr = [];

        let mainCol = document.createElement('div');
        mainCol.className = 'col-12 col-md-10 col-lg-8 bg-dark bg-opacity-75 border border-danger rounded p-3 mb-4';

        let firstInnerRow = document.createElement('div');
        firstInnerRow.className = 'row';
        let firstColSix = document.createElement('div');
        firstColSix.className = 'col-6';
        let pName = document.createElement('p');
        pName.className = 'fs-2 text-info';
        pName.textContent = starship.name;
        let pModel = document.createElement('p');
        pModel.className = 'fw-bold';
        pModel.innerHTML = `Model: <span class="fw-normal text-warning">${starship.model}</span>`;

        let pMGLT = document.createElement('p');
        pMGLT.className = 'fw-bold';
        pMGLT.innerHTML = `MGLT: <span>${starship.MGLT}</span>`;
        let pCargo = document.createElement('p');
        pCargo.className = 'fw-bold';
        pCargo.innerHTML = `Cargo: <span>${starship.cargo_capacity}</span>`;
        let pConsumables = document.createElement('p');
        pConsumables.className = 'fw-bold';
        pConsumables.innerHTML = `Consumables: <span>${starship.consumables}</span>`;
        let pCost = document.createElement('p');
        pCost.className = 'fw-bold';
        pCost.innerHTML = `Cost in Credits: <span>${starship.cost_in_credits}</span>`;

        firstColSix.append(pName, pModel, pMGLT, pCargo, pConsumables, pCost);
        let secondColSix = document.createElement('div');
        secondColSix.className = 'col-6';
        let pManufacturer = document.createElement('p');
        pManufacturer.className = 'fw-bold';
        pManufacturer.innerHTML = `Manufacturer: <span class="text-danger fs-5">${starship.manufacturer}</span>`;
        let pClass = document.createElement('div');
        pClass.className = 'fw-bold';
        pClass.innerHTML = `Class: <span class="fw-normal text-success fs-5">${starship.starship_class}</span>`;
        let pHyper = document.createElement('p');
        pHyper.className = 'fw-bold';
        pHyper.innerHTML = `Hyperdrive Rating: <span>${starship.hyperdrive_rating}</span>`;
        let pLength = document.createElement('p');
        pLength.className = 'fw-bold';
        pLength.innerHTML = `Length: <span>${starship.length}</span>`;
        let pPassengers = document.createElement('p');
        pPassengers.className = 'fw-bold';
        pPassengers.innerHTML = `Passengers: <span>${starship.passengers}</span>`;
        let pMax = document.createElement('p');
        pMax.className = 'fw-bold';
        pMax.innerHTML = `Max Speed: <span>${starship.max_atmosphering_speed}</span>`;
        secondColSix.append(pManufacturer, pClass, pHyper, pLength, pPassengers, pMax);
        let secondInnerRow = document.createElement('div');
        secondInnerRow.className = 'row justify-content-center';
        let thirdColSix = document.createElement('div');
        thirdColSix.className = 'col-6';
        let pPilots = document.createElement('p');
        pPilots.className = 'fw-bold';
        starship.pilots.length === 0 ? pPilots.innerHTML = 'Pilots: <span class="text-primary">N/A</span>' : starship.pilots.forEach(async pilot => {
            pPilots.innerHTML = '<div class="d-flex align-items-center text-warning"><strong>Loading...</strong><div class="spinner-border ms-auto text-warning" role="status" aria-hidden="true"></div></div>';
            pilotArr.push(await GetPilots(pilot));
            pPilots.innerHTML = `Pilots: <span class="text-primary">${pilotArr.join(', ')}</span>`;
        });
        let pFilms = document.createElement('p');
        pFilms.className = 'fw-bold';
        starship.films.length === 0 ? pFilms.innerHTML = 'Films: <span class="text-info">N/A</span>' : starship.films.forEach(async film => {
            pFilms.innerHTML = '<div class="d-flex align-items-center text-warning"><strong>Loading...</strong><div class="spinner-border ms-auto text-warning" role="status" aria-hidden="true"></div></div>';
            filmArr.push(await GetFilms(film));
            pFilms.innerHTML = `Films: <span class="text-info">${filmArr.join(', ')}</span>`;
        });
        thirdColSix.append(pPilots, pFilms);
        secondInnerRow.append(thirdColSix);
        firstInnerRow.append(firstColSix, secondColSix, secondInnerRow);
        mainCol.append(firstInnerRow);
        mainRow.append(mainCol);
    });

    inject.append(content);
}

const CreateWelcomeMessage = () => {

}

export { CreateCharacterCard, ActivateStarFighter, CreateVehicleElements, CreateSearchedCharacterCard, CreateSearchedVehicleElements, CreateWelcomeMessage, CreateStarshipElements };