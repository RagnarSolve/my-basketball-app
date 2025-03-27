import { useEffect, useState } from "react";
import { fetchGames } from "../api/nbaApi";
import './GamesPage.css';


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
        
        <div style={{display:"flex", justifyContent:"center"}}>
            <div id="gamesImg">
                <div><img src="https://spain.id.nba.com/storage/images/wallpapers/1729602431.jpg" alt="" width="500px" height="auto" /></div>
                <div><img src="https://spain.id.nba.com/storage/images/wallpapers/1704458791.jpg" alt="" width="500px" height="auto" /></div>
                <div><img src="https://spain.id.nba.com/storage/images/wallpapers/1695812676.jpg" alt="" width="500px" height="auto" /></div>                
                <div><img src="https://spain.id.nba.com/storage/images/wallpapers/1683193981.jpg" alt="" width="500px" height="auto" /></div>                
                <div><img src="https://spain.id.nba.com/storage/images/wallpapers/1686666102.jpg" alt="" width="500px" height="auto" /></div>                
                <div><img src="https://spain.id.nba.com/storage/images/wallpapers/1729602431.jpg" alt="" width="500px" height="auto" /></div>                
                <div><img src="https://spain.id.nba.com/storage/images/wallpapers/1729602431.jpg" alt="" width="500px" height="auto" /></div>                
                <div><img src="https://spain.id.nba.com/storage/images/wallpapers/1677571864.jpg" alt="" width="500px" height="auto" /></div>                
                <div><img src="https://spain.id.nba.com/storage/images/wallpapers/1677572611.jpg" alt="" width="500px" height="auto" /></div>                

            </div>

            <div id= "GamesPage" style={{display:"flex", backgroundColor: "lightgray", margin: "50px"}}>
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
            
            <div id="gamesImg">
            <div><img src="https://spain.id.nba.com/storage/images/wallpapers/1718694131.jpg" alt="" width="500px" height="auto" /></div>                
                <div><img src="https://spain.id.nba.com/storage/images/wallpapers/1729602431.jpg" alt="" width="500px" height="auto" /></div>                
                <div><img src="https://spain.id.nba.com/storage/images/wallpapers/1729602431.jpg" alt="" width="500px" height="auto" /></div>                
                <div><img src="https://spain.id.nba.com/storage/images/wallpapers/1715165719.jpg" alt="" width="500px" height="auto" /></div>                
                <div><img src="https://spain.id.nba.com/storage/images/wallpapers/1729602431.jpg" alt="" width="500px" height="auto" /></div>                
                <div><img src="https://spain.id.nba.com/storage/images/wallpapers/1729602431.jpg" alt="" width="500px" height="auto" /></div>                
                <div><img src="https://spain.id.nba.com/storage/images/wallpapers/1729602431.jpg" alt="" width="500px" height="auto" /></div>                
                <div><img src="https://spain.id.nba.com/storage/images/wallpapers/1729602431.jpg" alt="" width="500px" height="auto" /></div>                
                <div><img src="https://spain.id.nba.com/storage/images/wallpapers/1729602431.jpg" alt="" width="500px" height="auto" /></div>                

            </div>
        </div>
    );
};

export default GamesPage;