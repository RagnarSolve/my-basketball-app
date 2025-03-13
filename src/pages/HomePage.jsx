import { useEffect, useState } from "react";
import { fetchLiveGames } from "../api/nbaApi";

const HomePage = () => {
    const [liveGames, setLiveGames] = useState([]);

    useEffect(() => {
        const loadLiveGames = async () => {
            const data = await fetchLiveGames();
            setLiveGames(data);
        };

        loadLiveGames();
    }, []);

    return (
        <div>
            <h2>Welcome to the NBA Stats App</h2>
            <p>Select an option from the menu to view standings, game results, or player stats.</p>

           
            <h3>Live NBA Games</h3>
            {liveGames.length > 0 ? (
                <ul>
                    {liveGames.map((game, index) => (
                        <li key={index}>
                            {game.teams.home.name} vs {game.teams.visitors.name}
                            <br />
                            Score: {game.scores.home.points} - {game.scores.visitors.points}
                            <br />
                            Status: {game.status.long}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No live games currently.</p>
            )}
        </div>
    );
};

export default HomePage;