const API_HOST = "v1.basketball.api-sports.io";
const API_KEY = "XxXxXxXxXxXxXxXxXxXxXxXxXx"; // Replace with your actual key

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
    return data;
  } catch (error) {
    console.error("Error fetching games:", error);
    return null;
  }
}
