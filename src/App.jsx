import React, { useEffect, useState } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { fetchGames } from "./basketballApi";

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function getGames() {
      const data = await fetchGames("2019-11-23"); // Change date as needed
      if (data) setGames(data.response); // API response format may vary
    }

    getGames();
  }, []);

  return (
    <div>
      <h1>Basketball Games</h1>
      <ul>
        {games.length > 0 ? (
          games.map((game) => (
            <li key={game.id}>
              {game.teams.home.name} vs {game.teams.away.name}
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
}

export default App;