const API_HOST = "v2.nba.api-sports.io"; // Corrected API host
const API_KEY = "71829c94597f42134c98a50abaecbbd5"; // Replace with your actual key

export async function fetchGames(date) {
  try {
    const response = await fetch(`https://${API_HOST}/games?date=${date}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": API_HOST,
        "x-rapidapi-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data); // Debugging: Check the actual response structure
    return data.response; // Extract only the relevant game data
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}
