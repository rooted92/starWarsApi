import { GetCharacters, GetFilms, GetData, GetAllCharacters, GetNextCharacterPage, NextPage, PreviousPage } from "../services/apiCalls.js";

// Global variables
let data = await GetData();
let allCharacters = await GetAllCharacters(data.people);
console.log('All Characters func starts with...');
console.log(allCharacters);

// selected objects
const injectHere = document.querySelector('#injectHere');
console.log(injectHere);

// Functions
const CreateCharacterCard = () => {
    // Name gender eye hair skincolor height mass birthyear homeworld starships vehicles films

    // Make buttons section
    let prevButton = document.createElement('button');
    prevButton.id = 'prevBtn';
    prevButton.classList.add('btn', 'text-danger', 'fw-bolder');
    prevButton.textContent = '<< Previous';
    let nextButton = document.createElement('button');
    nextButton.id = 'nextBtn';
    nextButton.className = 'btn text-danger fw-bolder';
    nextButton.textContent = 'Next >>'
    let btnColumns = document.createElement('div');
    btnColumns.className = 'col-3 text-center';
    btnColumns.append(prevButton, nextButton);
    let btnRow = document.createElement('div');
    btnRow.className = 'row justify-content-center mb-5';
    btnRow.append(btnColumns);

    let cardsRow = document.createElement('div');
    cardsRow.className = 'row justify-content-center';

    allCharacters.results.map(person => {
        //             <div class="col-3 d-flex justify-content-center mb-5">
        //                 <div class="card bg-dark text-white border-light" style="width: 18rem;">
        //                     <div class="card-body">
        //                         <h3 id="name" class="card-title text-warning">Luke Skywalker</h3>
        //                         <h5  class="card-text d-inline mx-1 text-nowrap">Gender: Male</h5>
        //                         <h5  class="card-text d-inline mx-1 text-nowrap">Eye Color: Blue</h5>
        //                         <h5  class="card-text d-inline mx-1 text-nowrap">Hair Color: Blonde</h5>
        //                         <h5  class="card-text d-inline mx-1 text-nowrap">Skin Color: White</h5>
        //                         <h5  class="card-text d-inline mx-1 text-nowrap">Height: 162</h5>
        //                         <h5  class="card-text d-inline mx-1 text-nowrap">Mass: 77</h5>
        //                         <h5  class="card-text mx-1 text-nowrap">Birth Year: 19BBY</h5>
        //                         <h5  class="card-text mx-1 text-nowrap">Homeworld: Earth</h5>
        //                         <h5  class="card-text mx-1 text-nowrap">Starships: 2</h5>
        //                         <h5  class="card-text mx-1 text-nowrap">Vehicles: 3</h5>
        //                         <h5  class="card-text mx-1 text-nowrap">Films:</h5>
        //                         <ul class="list-group-flush">
        //                             <li class="list-group-item text-danger">Hello</li>
        //                             <li class="list-group-item text-danger">Hello</li>
        //                             <li class="list-group-item text-danger">Hello</li>
        //                         </ul>
        //                     </div>
        //                 </div>
        //             </div>
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
        homeworld.textContent = `Homeworld: ${person.homeworld}`;// will fetch data later, same for ones above
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
        injectHere.innerHTML = '';
        allCharacters = await PreviousPage();
        console.log('HERE IT IS!!!!!' + allCharacters.previous);
        CreateCharacterCard();
    })

    nextButton.addEventListener('click', async function () {
        injectHere.innerHTML = '';
        allCharacters = await NextPage();
        console.log('All characters now has previous url');
        console.log('Here is prev value ' + allCharacters.previous);
        
        CreateCharacterCard();
    });

    injectHere.append(cont);
}

// When page first loads populate data
CreateCharacterCard();