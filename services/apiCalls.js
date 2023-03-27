let next = 'https://swapi.dev/api/people/';
let prev = null;

const GetCharacters = async (character) => {
    const response = await fetch(`https://swapi.dev/api/people/${character}/`);
    const data = await response.json();
    return data;
}

const GetAllCharacters = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    next = data.next;
    prev = data.previous;
    console.log('Here is next url...')
    console.log(next)
    console.log('Here is prev url...')
    console.log(prev);
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

// Use pages to to paginate through list of characters
const GetNextCharacterPage = async (nextPage) => {
    const response = await fetch(nextPage);
    const data = await response.json();
    console.log('Next Page...')
    console.log(data);
    console.log('NEXT page worked!');
    return data;
}

const GetFilms = async () => {
    const response = await fetch('https://swapi.dev/api/films/1')
    const data = await response.json();
    return data;
}

const GetData = async () => {
    const response = await fetch('https://swapi.dev/api/');
    const data = await response.json();
    return data;
}

export { GetCharacters, GetFilms, GetData, GetAllCharacters, GetNextCharacterPage, NextPage, PreviousPage };