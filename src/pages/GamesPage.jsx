import { useEffect, useState } from "react";
import { fetchGames } from "../api/nbaApi";

const GamesPage = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames().then(data => {

            if (Array.isArray(data) && data.length > 0) {

                const sortedGames = data.sort((a, b) => new Date(b.date.start) - new Date(a.date.start));

                const latestGames = {};
                sortedGames.forEach(game => {
                    const homeTeam = game?.teams?.home?.name;
                    const awayTeam = game?.teams?.visitors?.name;
                    const homeScore = game?.scores?.home?.points;
                    const awayScore = game?.scores?.visitors?.points;

                    if (homeTeam && awayTeam && homeScore !== null && awayScore !== null) {
                        const teamKey = homeTeam;
                        if (!latestGames[teamKey]) {
                            latestGames[teamKey] = game;
                        }
                    }
                });

                setGames(Object.values(latestGames));
            } else {
                console.error("Something went wrong", data);
            }
        });
    }, []);

    if (!games.length) return <p>Loading latest completed game results...</p>;

    return (
        <div>
            <h2>NBA Latest Game Results</h2>
            
                {games.map((game, index) => {
                    const homeTeam = game?.teams?.home?.name || "Unknown Team";
                    const awayTeam = game?.teams?.visitors?.name || "Unknown Team";
                    const homeScore = game?.scores?.home?.points ?? "N/A";
                    const awayScore = game?.scores?.visitors?.points ?? "N/A";
                    const gameDate = game?.date?.start ? new Date(game.date.start).toLocaleDateString() : "N/A";

                    let winner;
                    if (homeScore !== "N/A" && awayScore !== "N/A") {
                        winner = homeScore > awayScore ? homeTeam : awayTeam;
                    }

                    return (
                        <div id="game-results" key={index}>
                            <strong>{homeTeam} vs {awayTeam}</strong> <br />
                            Date: {gameDate} <br />
                            Final Score: {homeScore} - {awayScore} <br />
                            Winner: <strong>{winner}</strong>
                        </div>
                    );
                })}
            
        </div>
    );
};

export default GamesPage;

