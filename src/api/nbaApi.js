const API_HOST = "api-nba-v1.p.rapidapi.com";
const API_KEY = "fb5b97e76cmsh38082f281eee200p1b934djsn5c328e81464b"; 
const CACHE_EXPIRY = 24 * 60 * 60 * 1000;

const fetchNBAData = async (endpoint, params = {}) => {
    const url = new URL(`https://${API_HOST}/${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const cacheKey = `cache_${endpoint}_${JSON.stringify(params)}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
            console.log(`Using cached data for ${endpoint}`);
            return data;
        }
    }

    console.log(`Fetching fresh data for ${url}`);

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

        localStorage.setItem(cacheKey, JSON.stringify({ data: data.response || [], timestamp: Date.now() }));

        return data.response || [];
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return [];
    }
};

export const fetchStandings = (season = "2024") => fetchNBAData("standings", { league: "standard", season });
export const fetchGames = (season = "2024") => fetchNBAData("games", { season });
export const fetchPlayersStats = (teamId = 1, season = "2024") => fetchNBAData("players/statistics", { team: teamId, season });
export const fetchLiveGames = () => fetchNBAData("games", { live: "all" });
