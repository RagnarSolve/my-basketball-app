import React, { useEffect, useState } from "react";
import { fetchGames } from "./basketballApi.js";

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getGames() {
      const data = await fetchGames("2023-10-12"); // Correct date format
      if (data) {
        setGames(data);
      }
      setLoading(false);
    }

    getGames();
  }, []);

  return (
    <div>
      <h1>NBA Games on 2022-03-09</h1>
      {loading ? (
        <p>Loading...</p>
      ) : games.length > 0 ? (
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <strong>{game.teams.home.name}</strong> ({game.scores.home.points ?? "N/A"}) 
              vs 
              <strong> {game.teams.away.name}</strong> ({game.scores.away.points ?? "N/A"})
              <br />
              <small>🏀 Status: {game.status.long}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No games found for this date.</p>
      )}
    </div>
  );
}

export default App;