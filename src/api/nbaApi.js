const API_HOST = "api-nba-v1.p.rapidapi.com";
const API_KEY = "fb5b97e76cmsh38082f281eee200p1b934djsn5c328e81464b"; // Replace with your actual key

const fetchNBAData = async (endpoint, params = {}) => {
    const url = new URL(`https://${API_HOST}/${endpoint}`);
    
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    console.log(`Fetching ${url}`); 

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": API_HOST
            }
        });

        const data = await response.json();
        console.log("API Response:", data); 

        return data.response || []; 
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return [];
    }
};


export const fetchStandings = (season = "2024") => fetchNBAData("standings", { league: "standard", season });
export const fetchGames = (season = "2024") => 
    fetchNBAData("games", { season });
export const fetchPlayersStats = (teamId = 1, season = "2024") => 
    fetchNBAData("players/statistics", { team: teamId, season });