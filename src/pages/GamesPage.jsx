import { useEffect, useState } from "react";
import { fetchGames } from "../api/nbaApi";

const GamesPage = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames().then(data => {
            console.log("Full API Response:", data);

            if (Array.isArray(data) && data.length > 0) {
                console.log("First Game Data:", JSON.stringify(data[0], null, 2)); // ✅ Debugging
                setGames(data);
            } else {
                console.error("Invalid Game Data Structure:", data);
            }
        });
    }, []);

    if (!games.length) return <p>Loading game results...</p>;

    return (
        <div>
            <h2>NBA Game Results (2024-25 Season)</h2>
            <ol>
                {games.map((game, index) => {
                    const homeTeam = game?.teams?.home?.name || "Unknown Team";
                    const awayTeam = game?.teams?.visitors?.name || "Unknown Team"; // ✅ Fixed Away Team
                    const homeScore = game?.scores?.home?.points ?? "N/A";
                    const awayScore = game?.scores?.visitors?.points ?? "N/A"; // ✅ Fixed Away Score
                    const gameDate = game?.date?.start ? new Date(game.date.start).toLocaleDateString() : "N/A";

                    // Determine the winner
                    let winner = "TBD";
                    if (homeScore !== "N/A" && awayScore !== "N/A") {
                        winner = homeScore > awayScore ? homeTeam : awayTeam;
                    }

                    return (
                        <li key={index}>
                            <strong>{homeTeam} vs {awayTeam}</strong> <br />
                            Date: {gameDate} <br />
                            Final Score: {homeScore} - {awayScore} <br />
                            Winner: <strong>{winner}</strong>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default GamesPage;


