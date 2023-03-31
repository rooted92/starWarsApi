// Global Variables
let next = 'https://swapi.dev/api/people/';
let prev = null;

// const GetCharacters = async (character) => {
//     const response = await fetch(`https://swapi.dev/api/people/${character}/`);
//     const data = await response.json();
//     return data;
// }

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

const GetFilms = async () => {
    const response = await fetch('https://swapi.dev/api/films/')
    const data = await response.json();
    return data;
}

const GetVehicles = async () => {
    const response = await fetch('https://swapi.dev/api/vehicles/');
    const data = await response.json();
    console.log(data);
    return data;
}

const GetData = async () => {
    const response = await fetch('https://swapi.dev/api/');
    const data = await response.json();
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

const GetFilmsFromCharacter = async url => {
    const response = await fetch(url);
    const data = response.json();
    return data;
}

export { GetFilms, GetData, GetAllCharacters, NextPage, PreviousPage, GetHomeworldFromCharacter, GetStarshipsFromCharacter, GetVehiclesFromCharacter, GetFilmsFromCharacter, GetVehicles };