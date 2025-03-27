import { useEffect, useState } from "react";
import { fetchGames } from "../api/nbaApi";
import './styles/GamesPage.css';


/**
 * GamesPage är en sida som visar det senaste resultatet för varje nba-lag.
 * den hämtar data från api'et, sorterar dem efter datum och filtrerar ut den senaste spelade matchen för varje lag.
 *
 * @returns {JSX.Element} en lista med de senaste matchresultaten för varje lag
 */
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
        <div id= "GamesPage">
            <h2>🏀 NBA Latest Game Results</h2>

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
                    <div className="game-result" key={index}>
                        <h3> {homeTeam} vs {awayTeam}</h3>
                        <p>📅 <strong>Date:</strong> {gameDate}</p>
                        <p>📊 <strong>Final Score:</strong> {homeScore} - {awayScore}</p>
                        <p>🏆 <strong>Winner:</strong> {winner}</p>
                    </div>
                );
            })}

        </div>
    );
};

export default GamesPage;

