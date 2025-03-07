import React, { useEffect, useState } from "react";
import { fetchGames } from "./basketballApi";

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getGames() {
      const data = await fetchGames("2025-03-05");
      setGames(data || []);
      setLoading(false);
    }

    getGames();
  }, []);

  return (
    <div>
      <h1>NBA Games on 2025-03-05</h1>
      {loading ? (
        <p>Loading...</p>
      ) : games.length > 0 ? (
        <ul>
          {games.map((game) => (
  <div key={game.id}>
    <h3>
      {game.teams?.home?.name ?? "Unknown Team"} ({game.scores?.home?.points ?? "N/A"}) 
       vs
      {game.teams?.visitors?.name ?? "Unknown Team"} ({game.scores?.visitors?.points ?? "N/A"})
    </h3>
    <p>🏀 Status: {game.status?.long ?? "Unknown"}</p>
  </div>
))}
        </ul>
      ) : (
        <p>No games found for this date.</p>
      )}
    </div>
  );
}

export default App;