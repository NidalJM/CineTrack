export async function fetchCatalog()  {
    const apiUrl= 'https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json';

    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}