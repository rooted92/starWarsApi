import { CreateCharacterCard, CreateVehicleElements } from "./functions.js";

// Global Variables
let next = 'https://swapi.dev/api/people/';
let prev = null;

let nextVehicles = 'https://swapi.dev/api/vehicles/';
let prevVehicles = null;

let nextStarships = 'https://swapi.dev/api/starships/';
let prevStarships = null;

// Functions
const GetAllCharacters = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    next = data.next;
    prev = data.previous;
    return data;
}

const NextPage = async () => {
    if (next !== null) {
        return await GetAllCharacters(next);
    }
}

const PreviousPage = async () => {
    if (prev !== null) {
        return await GetAllCharacters(prev);
    }
}

const GetFilmsByTitle = async (url) => {
    const response = await fetch(url)
    const data = await response.json();
    // console.log(data);
    return data.title;
}

const GetVehicles = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    nextVehicles = data.next;
    prevVehicles = data.previous;
    return data;
}

const GetVehiclesByName = async url => {
    const response = await fetch(url);
    const data = await response.json();
    return data.name;
}

const GetNextVehicles = async () => {
    if (nextVehicles !== null) {
        console.log('Next: ', nextVehicles)
        return await GetVehicles(nextVehicles);
    }
}

const GetPreviousVechicles = async () => {
    if (prevVehicles !== null) {
        return await GetVehicles(prevVehicles);
    }
}


const GetData = async () => {
    const response = await fetch('https://swapi.dev/api/');
    const data = await response.json();
    return data;
}

const GetStarships = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    prevStarships = data.previous;
    console.log('Previous starship URL: ' + prevStarships);
    nextStarships = data.next;
    console.log('Next starship URL: ' + nextStarships);
    return data;
}

const GetStarshipsByName = async url => {
    const response = await fetch(url);
    const data = await response.json();
    return data.name;
}

const GetPlanets = async url => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const GetPlanetsByName = async url => {
    const response = await fetch(url);
    const data = await response.json();
    return data.name;
}

const GetPeopleNames = async url => {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data.name;
}

const GetSpeciesByName = async url => {
    const response = await fetch(url);
    const data = await response.json();
    return data.name;
}

const GetNextOrPrevData = async url => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}

const GetHomeworldFromCharacter = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const GetStarshipsFromCharacter = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const GetVehiclesFromCharacter = async url => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const GetPilotNamesForVehicles = async url => {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data.name;
}

const GetFilmsFromCharacter = async url => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const GetPilots = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.name
}

const GetFilms = async url => {
    const response = await fetch(url);
    const data = await response.json();
    return data.title
}

const GetAllFilms = async url => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}

export { GetFilmsByTitle, GetData, GetAllCharacters, NextPage, PreviousPage, GetHomeworldFromCharacter, GetStarshipsFromCharacter, GetVehiclesFromCharacter, GetFilmsFromCharacter, GetVehicles, GetPilotNamesForVehicles, GetNextVehicles, GetPreviousVechicles, GetStarships, GetPilots, GetFilms, GetNextOrPrevData, GetPlanets, GetPeopleNames, GetAllFilms, GetPlanetsByName, GetSpeciesByName, GetStarshipsByName, GetVehiclesByName };