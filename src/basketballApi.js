const API_HOST = "v2.nba.api-sports.io"; 
const API_KEY = "71829c94597f42134c98a50abaecbbd5"; 

export async function fetchGames(date) {
  try {
    const response = await fetch(`https://v2.nba.api-sports.io/games?date=${date}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v2.nba.api-sports.io",
        "x-rapidapi-key": "71829c94597f42134c98a50abaecbbd5"
      }
    });

    const data = await response.json();
    console.log("🔍 Full API Response:", JSON.stringify(data, null, 2)); 

    return data?.response || [];
  } catch (error) {
    console.error("❌ Error fetching games:", error);
    return [];
  }
}
