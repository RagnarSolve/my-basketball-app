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
        <div style={{display:"flex",backgroundColor:"lightgray", margin:"50px"}}>

            <div>
                <img src="https://cdn.vox-cdn.com/thumbor/UysxoG72rBS8UrW2ejTawdNf_d4=/0x0:4896x3264/1200x800/filters:focal(2064x900:2846x1682)/cdn.vox-cdn.com/uploads/chorus_image/image/70959675/1241189476.0.jpg" alt="" width="600px" height="500px"/>
                
            </div>

            <div style={{display:"grid", flexDirection:""}}>
            <h2 style={{color:"brown", margin:"20px"}}>NBA Latest Game Results</h2>
            
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
                    <div id="game-results" key={index} style={{margin:"2rem", backgroundColor:"burlywood"}}>
                        <strong>{homeTeam} vs {awayTeam}</strong> <br />
                        Date: {gameDate} <br />
                        Final Score: {homeScore} - {awayScore} <br />
                        Winner: <strong>{winner}</strong>
                    </div>
                );
            })}
        
            </div>
            {/* <div>
                <img src="https://admin.sportshackster.com/WallPaperMedia/PlayerWallPaperImage/luka-23_63852447294315.4.jpg" alt="" />
            </div>
             */}
        </div>
    );
};

export default GamesPage;

