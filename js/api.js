export async function fetchCatalog() {
    const apiUrl = 'https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json';
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new console.error("Erreur API");
        }
        const data = await response.json();
        return data;
    }   catch (error)   {
        console.log("Failed to fetch catalog:", error);
        throw error
    }

}