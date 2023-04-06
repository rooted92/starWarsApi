// Global Variables
let next = 'https://swapi.dev/api/people/';
let prev = null;

let nextVehicles = 'https://swapi.dev/api/vehicles/';
let prevVehicles = null;

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

const GetNextVehicles = async () => {
    if(nextVehicles !== null){
        console.log('Next: ', nextVehicles)
        return await GetVehicles(nextVehicles);
    }
    // } else {
    //     return console.error('Could not fetch data, check URL is valid.');
    // }
}

const GetPreviousVechicles = async () => {
    if(prevVehicles !== null){
        return await GetVehicles(prevVehicles);
    }
    // } else {
    //     return console.error('Could not fetch data, check URL is valid.');
    // }
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

const GetPilotNamesForVehicles = async url => {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data.name;
}
// GetPilotNamesForVehicles("https://swapi.dev/api/people/13/");

const GetFilmsFromCharacter = async url => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export { GetFilmsByTitle, GetData, GetAllCharacters, NextPage, PreviousPage, GetHomeworldFromCharacter, GetStarshipsFromCharacter, GetVehiclesFromCharacter, GetFilmsFromCharacter, GetVehicles, GetPilotNamesForVehicles, GetNextVehicles, GetPreviousVechicles };