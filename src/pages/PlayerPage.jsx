import { useEffect, useState } from "react";
import { fetchPlayersStats } from "../api/nbaApi";

const PlayerPage = () => {
    const [playersStats, setPlayersStats] = useState([]);
    const teamId = 1;

    useEffect(() => {
        fetchPlayersStats(teamId).then(data => {
            console.log("Raw Player Stats Data:", data);

            if (Array.isArray(data) && data.length > 0) {
               
                const groupedPlayers = {};
                
                data.forEach(stat => {
                    const playerId = stat.player.id;
                    if (!groupedPlayers[playerId]) {
                        groupedPlayers[playerId] = {
                            id: playerId,
                            name: `${stat.player.firstname} ${stat.player.lastname}`,
                            team: stat.team.name,
                            position: stat.pos !== "N/A" ? stat.pos : "Unknown",
                            games: 0,
                            totalPoints: 0,
                            assists: 0,
                            rebounds: 0,
                            steals: 0,
                            blocks: 0,
                            turnovers: 0,
                        };
                    }

                    
                    groupedPlayers[playerId].games += 1;
                    groupedPlayers[playerId].totalPoints += stat.points || 0;
                    groupedPlayers[playerId].assists += stat.assists || 0;
                    groupedPlayers[playerId].rebounds += stat.totReb || 0;
                    groupedPlayers[playerId].steals += stat.steals || 0;
                    groupedPlayers[playerId].blocks += stat.blocks || 0;
                    groupedPlayers[playerId].turnovers += stat.turnovers || 0;
                });

              
                const formattedPlayers = Object.values(groupedPlayers).map(player => ({
                    ...player,
                    ppg: (player.totalPoints / player.games).toFixed(1),
                    assistsPerGame: (player.assists / player.games).toFixed(1),
                    reboundsPerGame: (player.rebounds / player.games).toFixed(1),
                    stealsPerGame: (player.steals / player.games).toFixed(1),
                    blocksPerGame: (player.blocks / player.games).toFixed(1),
                    turnoversPerGame: (player.turnovers / player.games).toFixed(1),
                }));

                console.log("Formatted Player Data:", formattedPlayers);
                setPlayersStats(formattedPlayers);
            } else {
                console.error("Invalid Player Data Structure:", data);
            }
        });
    }, []);

    if (!playersStats.length) return <p>Loading player stats...</p>;

    return (
        <div>
            <h2>NBA Player Stats (2024-25 Season)</h2>
            <ol>
                {playersStats.map((player, index) => (
                    <li key={index}>
                        <strong>{player.name}</strong> <br />
                        Team: {player.team} <br />
                        Position: {player.position} <br />
                        PPG: {player.ppg} <br />
                        Assists per game: {player.assistsPerGame} <br />
                        Rebounds per game: {player.reboundsPerGame} <br />
                        Steals per game: {player.stealsPerGame} <br />
                        Blocks per game: {player.blocksPerGame} <br />
                        Turnovers per game: {player.turnoversPerGame} <br />
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default PlayerPage;
