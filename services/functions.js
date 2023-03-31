import { GetStarshipsFromCharacter, GetHomeworldFromCharacter, GetVehiclesFromCharacter, GetFilmsFromCharacter, PreviousPage, NextPage } from "./apiCalls.js";

// Make Character cards function/

const CreateCharacterCard = async (func, inject) => {
    // Make buttons section
    let prevButton = document.createElement('button');
    prevButton.id = 'prevBtn';
    prevButton.classList.add('btn', 'btn-danger', 'text-dark', 'fw-bolder', 'mx-5');
    prevButton.textContent = '<< Previous';
    let nextButton = document.createElement('button');
    nextButton.id = 'nextBtn';
    nextButton.className = 'btn btn-danger text-dark fw-bolder mx-5';
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
        birthyear.className = 'card-text mx-1 text-nowrap';
        birthyear.textContent = `Birthyear: ${person.birth_year}`;

        let mass = document.createElement('h5');
        mass.className = 'card-text mx-1 text-nowrap';
        mass.textContent = `Mass: ${person.mass}`;
        let height = document.createElement('h5');
        height.className = 'card-text mx-1 text-nowrap';
        height.textContent = `Height: ${person.height}`;
        let skinColor = document.createElement('h5');
        skinColor.className = 'card-text mx-1 text-nowrap';
        skinColor.textContent = `Skin Color: ${person.skin_color}`;
        let hairColor = document.createElement('h5');
        hairColor.className = 'card-text mx-1 text-nowrap';
        hairColor.textContent = `Hair Color: ${person.hair_color}`;
        let eyeColor = document.createElement('h5');
        eyeColor.className = 'card-text mx-1 text-nowrap';
        eyeColor.textContent = `Eye Color: ${person.eye_color}`;
        let gender = document.createElement('h5');
        gender.className = 'card-text mx-1 text-nowrap';
        gender.textContent = `Gender: ${person.gender}`;
        let name = document.createElement('h3');
        name.className = 'card-title text-warning';
        name.textContent = `${person.name}`;

        let informationDiv = document.createElement('div');
        informationDiv.className = 'card-body';
        informationDiv.append(name, gender, eyeColor, hairColor, skinColor, height, mass, birthyear, homeworld, starships, vehicles, films);

        let cardDiv = document.createElement('div');
        cardDiv.className = 'card bg-dark text-white border-light';
        cardDiv.style = 'width: 18rem;';
        cardDiv.append(informationDiv);

        let infoColumn = document.createElement('div');
        infoColumn.className = 'col-3 d-flex justify-content-center mb-5';
        infoColumn.append(cardDiv);

        cardsRow.append(infoColumn);
    });

    let cont = document.createElement('div');
    cont.className = 'container';
    cont.append(btnRow, cardsRow);

    prevButton.addEventListener('click', async function () {
        inject.innerHTML = '<div class="d-flex justify-content-center"><div class="spinner-border text-warning" role="status"></div></div>';
        func = await PreviousPage();
        inject.innerHTML = '';
        CreateCharacterCard(func, inject);
    })

    nextButton.addEventListener('click', async function () {
        inject.innerHTML = '<div class="d-flex justify-content-center"><div class="spinner-border text-warning" role="status"></div></div>';
        func = await NextPage();
        inject.innerHTML = '';
        CreateCharacterCard(func, inject);
    });

    inject.append(cont);
}

const ActivateStarFighter = (docObject) => {
    docObject.classList.add('zoomerOut');
    setTimeout(() => {
        docObject.classList.remove('zoomerOut');
    }, 1000);
}

export {CreateCharacterCard, ActivateStarFighter};