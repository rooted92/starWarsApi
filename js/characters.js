import { GetData, GetAllCharacters, NextPage, PreviousPage, GetHomeworldFromCharacter, GetStarshipsFromCharacter } from "../services/apiCalls.js";

// selected objects
const injectHere = document.querySelector('#injectHere');
console.log(injectHere);

// Global variables
injectHere.innerHTML = '<h1 class="text-white text-center">Loading...</h1>';
let data = await GetData();
let allCharacters = await GetAllCharacters(data.people);
injectHere.innerHTML = '';
console.log('All Characters func starts with...');
console.log(allCharacters);

// Functions
const CreateCharacterCard = async () => {
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

    if(allCharacters.previous === null){
        prevButton.setAttribute('disabled', true);
    } else {
        prevButton.removeAttribute('disabled');
    }

    if(allCharacters.next === null){
        nextButton.setAttribute('disabled', true);
    } else {
        nextButton.removeAttribute('disabled');
    }

    let cardsRow = document.createElement('div');
    cardsRow.className = 'row justify-content-center';
    
    allCharacters.results.map(async person => {
        // get homeworlddata
        let starshipArr = [];
        let homeworldData =  await GetHomeworldFromCharacter(person.homeworld);
        if(person.starships.length > 0){
            person.starships.map(async starship => {
                console.log(starship);
                let starshipData = await GetStarshipsFromCharacter(starship);
                console.log(starshipData);
                console.log(starshipData.name);
                starshipArr.push(starshipData.name);
            })
        }
        console.log(starshipArr);

        // Make cards
        let films = document.createElement('h5');
        films.className = 'card-text mx-1 text-nowrap';
        films.textContent = `Films: ${person.films.length}`;
        let vehicles = document.createElement('h5');
        vehicles.className = 'card-text mx-1 text-nowrap';
        vehicles.textContent = `Vehicles: ${person.vehicles.length}`;
        let starships = document.createElement('h5');
        starships.className = 'card-text mx-1 text-nowrap';
        starships.textContent = `Starships: ${person.starships.length}`;
        let homeworld = document.createElement('h5');
        homeworld.className = 'card-text mx-1 text-nowrap text-truncate';
        homeworld.textContent = `Homeworld: ${homeworldData.name}`;// will fetch data later, same for ones above
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
        injectHere.innerHTML = '<h1 class="text-center text-white">Loading...</h1>';
        allCharacters = await PreviousPage();
        injectHere.innerHTML = '';
        CreateCharacterCard();
    })

    nextButton.addEventListener('click', async function () {
        injectHere.innerHTML = '<h1 class="text-center text-white">Loading...</h1>';
        allCharacters = await NextPage();
        injectHere.innerHTML = '';
        CreateCharacterCard();
    });

    injectHere.append(cont);
}

// When page first loads populate data
CreateCharacterCard();