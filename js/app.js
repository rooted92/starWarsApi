import { CreateSearchedCharacterCard, ActivateStarFighter, CreateSearchedVehicleElements, CreateCharacterCard } from "../services/functions.js";
// import { GetRandomCategoryItem } from "../services/data.js";

// Global Variables
let userInput = document.querySelector('#userInput');
let searchBtn = document.querySelector('#searchBtn');
let selectInput = document.querySelector('#selectInput');
const injectHere = document.querySelector('#injectHere');
const starFighter = document.querySelector('#starFighter');
let userSearch, categoryPicked, selectionData;
let categoriesArr = ['people', 'vehicles', 'starships', 'planets', 'species', 'films'];


// Functions
const SearchCategory = async (category = 'people', search) => {
    console.log(category, search);
    const response = await fetch(`https://swapi.dev/api/${category}/?search=${search}`);
    const data = await response.json();
    console.log(data);
    return data;
}

// await GetRandomCategoryItem(categoriesArr, injectHere);
if(selectInput.value === 'Search by category'){
    console.log(selectInput.value);
    userInput.setAttribute('disabled', true);
}

// Event Listeners
selectInput.addEventListener('click', function () {
    // console.log(selectInput.value);
    if(selectInput.value === 'Search by category'){
        console.log(selectInput.value);
        userInput.setAttribute('disabled', true);
    }
    else if (selectInput.value === 'people' || 'vehicles' || 'starships' || 'planets' || 'films') {
        userInput.removeAttribute('disabled');
    }
    categoryPicked = selectInput.value;
    console.log('Category picked: ', categoryPicked);
})



userInput.addEventListener('change', function () {
    // console.log(userInput.value);
    userSearch = userInput.value;
    console.log("User's search: ", userSearch);
})

searchBtn.addEventListener('click', async function () {
    console.log('clicked')
    console.log(userSearch);
    injectHere.innerHTML = `<div class="row">
    <div class="col-12 d-flex flex-column align-items-center floater">
        <img src="../assets/images/icons8-baby-yoda-144.png" alt="Baby Yoda Loading Icon">
        <p class="text-white font-monospace fs-2">Loading...</p>
    </div>
</div>`;
    selectionData = await SearchCategory(categoryPicked, userSearch);
    injectHere.innerHTML = '';
    userInput.value = '';
    console.log(selectionData);
    if (categoryPicked === 'people') {
        CreateSearchedCharacterCard(selectionData, injectHere);
    }
    else if (categoryPicked === 'vehicles') {
        CreateSearchedVehicleElements(selectionData, injectHere);
    } else if (selectionData.results.length === 0) {
        injectHere.innerHTML = `
        <div class="row justify-content-center fadeIn">
            <div class="col-6 border border-danger border-3 bg-dark rounded p-3">
                <h3 class="text-center text-danger">
                Sorry, we were unable to process your request. It appears that the keyword you entered was invalid or not found in our system. Please check your spelling and try again.
                </h3>
            </div>
        </div>
        `;
    }
    else {
        CreateSearchedCharacterCard(selectionData, injectHere);
        console.log(selectionData);
    }

});

starFighter.addEventListener('click', function () {
    ActivateStarFighter(starFighter);
});

// On page load set attribute of disabled to true on search bar (user must choose category first before they can search)
