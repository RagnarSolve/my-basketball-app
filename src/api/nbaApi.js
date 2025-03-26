const API_HOST = "api-nba-v1.p.rapidapi.com";
const API_KEY = "fb5b97e76cmsh38082f281eee200p1b934djsn5c328e81464b";
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // refreshas efter 24 timmar


/**
 * hämtar data från api'et och endpointen och valfria parametrar.
 * använder localStorage som cache för att undvika onödiga api-requests.
 *
 * @param {string} endpoint - api endpoint att fetcha data från t ex "standings" eller "games".
 * @param {Object} [params={}] - ett object med extra info som skickas med i fetchen som t ex ("standings", { season: "2024" })
 * @returns {Promise<any>} en promise som innehåller fetchad data ifrån api'et
 */
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

/**
 * hämtar nba-tabellen från säsong 2024
 *
 * @param {string} [season="2024"] - säsongen som hämtas är 2024, men man kan ändra till 2025 osv.
 * @returns {Promise<any>} en promise som innehåller tabell-data
 */
export const fetchStandings = (season = "2024") => fetchNBAData("standings", { league: "standard", season });

/**
 * hämtar alla matcher ifrån säsong 2024
 *
 * @param {string} [season="2024"] - säsongen som fetchas är 2024
 * @returns {Promise<any>} en promise som innehåller alla matcher
 */
export const fetchGames = (season = "2024") => fetchNBAData("games", { season });

/**
 * hämtar stats från spelare från ett specifikt lag och säsong 2024
 *
 * @param {number} [teamId] - id för laget som ska hämtas
 * @param {string} [season="2024"] - hämtar säsong 2024
 * @returns {Promise<any>} en promise som innhåller spelarnas statistik
 */
export const fetchPlayersStats = (teamId, season = "2024") => fetchNBAData("players/statistics", { team: teamId, season });

/**
 * hämtar alla live-matcher.
 *
 * @returns {Promise<any>} en promise som innehåller alla live-matcher
 */
export const fetchLiveGames = () => fetchNBAData("games", { live: "all" });
