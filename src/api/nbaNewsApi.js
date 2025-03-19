const NEWS_API_HOST = "nba-latest-news.p.rapidapi.com";
const API_KEY = "fb5b97e76cmsh38082f281eee200p1b934djsn5c328e81464b"; 

export const fetchNews = async (limit = 10) => {
    const url = `https://${NEWS_API_HOST}/articles?limit=${limit}`;
    console.log(`Fetching: ${url}`);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": NEWS_API_HOST
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Full API Response:", data);

       

        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
};