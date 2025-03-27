import { useEffect, useState, useCallback } from "react";
import { fetchPlayersStats } from "../api/nbaApi";
import './PlayerPage.css';

const teams = [
  { id: 1, name: "Atlanta Hawks"}, { id: 2, name: "Boston Celtics" },
  { id: 4, name: "Brooklyn Nets" }, { id: 5, name: "Charlotte Hornets" },
  { id: 6, name: "Chicago Bulls" }, { id: 7, name: "Cleveland Cavaliers" },
  { id: 8, name: "Dallas Mavericks" }, { id: 9, name: "Denver Nuggets" },
  { id: 10, name: "Detroit Pistons" }, { id: 11, name: "Golden State Warriors" },
  { id: 14, name: "Houston Rockets" }, { id: 15, name: "Indiana Pacers" },
  { id: 16, name: "LA Clippers" }, { id: 17, name: "Los Angeles Lakers" },
  { id: 19, name: "Memphis Grizzlies" }, { id: 20, name: "Miami Heat" },
  { id: 21, name: "Milwaukee Bucks" }, { id: 22, name: "Minnesota Timberwolves" },
  { id: 23, name: "New Orleans Pelicans" }, { id: 24, name: "New York Knicks" },
  { id: 25, name: "Oklahoma City Thunder" }, { id: 26, name: "Orlando Magic" },
  { id: 27, name: "Philadelphia 76ers" }, { id: 28, name: "Phoenix Suns" },
  { id: 29, name: "Portland Trail Blazers" }, { id: 30, name: "Sacramento Kings" },
  { id: 31, name: "San Antonio Spurs" }, { id: 38, name: "Toronto Raptors" },
  { id: 40, name: "Utah Jazz" }, { id: 41, name: "Washington Wizards" }
];

const PlayerPage = () => {
  const [playersStats, setPlayersStats] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(teams[0].id);

  const loadPlayerStats = useCallback(async () => {
    const data = await fetchPlayersStats(selectedTeam);

    if (Array.isArray(data) && data.length > 0) {
      const latestTeamPlayers = {};

      data.forEach(stat => {
        const playerId = stat.player?.id;

        if (!latestTeamPlayers[playerId]) {
          latestTeamPlayers[playerId] = {
            id: playerId,
            name: `${stat.player?.firstname || "Unknown"} ${stat.player?.lastname || ""}`.trim(),
            team: stat.team?.name || "Unknown",
            position: stat.pos !== "N/A" ? stat.pos : "Unknown",
            gamesPlayed: 0,
            totalPoints: 0,
            assists: 0,
            rebounds: 0,
            steals: 0,
            blocks: 0,
          };
        }

        latestTeamPlayers[playerId].gamesPlayed += 1;
        latestTeamPlayers[playerId].totalPoints += stat.points ?? 0;
        latestTeamPlayers[playerId].assists += stat.assists ?? 0;
        latestTeamPlayers[playerId].rebounds += stat.totReb ?? 0;
        latestTeamPlayers[playerId].steals += stat.steals ?? 0;
        latestTeamPlayers[playerId].blocks += stat.blocks ?? 0;
      });

      const formattedPlayers = Object.values(latestTeamPlayers)
        .map(player => ({
          ...player,
          ppg: (player.gamesPlayed > 0 ? player.totalPoints / player.gamesPlayed : 0).toFixed(1),
          assistsPerGame: (player.assists / player.gamesPlayed || 0).toFixed(1),
          reboundsPerGame: (player.rebounds / player.gamesPlayed || 0).toFixed(1),
          stealsPerGame: (player.steals / player.gamesPlayed || 0).toFixed(1),
          blocksPerGame: (player.blocks / player.gamesPlayed || 0).toFixed(1),
        }))
        .sort((a, b) => parseFloat(b.ppg) - parseFloat(a.ppg))
        .slice(0, 15);

      setPlayersStats(formattedPlayers);
    } else {
      setPlayersStats([]);
    }
  }, [selectedTeam]);

  useEffect(() => {
    loadPlayerStats();
  }, [selectedTeam, loadPlayerStats]);

  return (
    <div style={{ display:"flex", backgroundColor: "lightgray", margin: "50px", paddingTop: "50px"}}>
      <div>
        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/dd6b9795847219.5ea0ca5e4f6ef.jpg" alt="" width="550px"
        height="900px"  />
      </div>

      <div style={{backgroundColor: "white", margin:"2rem", width:"50%", justifyContent:"center"}}>
      <h2 style={{color:"brown", margin:"20px"}}>NBA Player Stats (2024 Season)</h2>

<label htmlFor="teamSelect">Select a Team: </label>
<select
  id="teamSelect"
  value={selectedTeam}
  onChange={(e) => setSelectedTeam(Number(e.target.value))}
>
  {teams.map((team) => (
    <option key={team.id} value={team.id}>
      {team.name}
    </option>
  ))}
</select>

{playersStats.length === 0 ? (
  <p>Loading player stats...</p>
) : (
  <ul>
    {playersStats.map((player, index) => (
      <li key={index} style={{gap:"2 rem", color:"black", margin:"20px"}} >
        <strong>{player.name}</strong> <br />
        Team: {player.team} <br />
        Position: {player.position} <br />
        PPG: {player.ppg} <br />
        Assists per game: {player.assistsPerGame} <br />
        Rebounds per game: {player.reboundsPerGame} <br />
        Steals per game: {player.stealsPerGame} <br />
        Blocks per game: {player.blocksPerGame} <br />
      </li>
    ))}
  </ul>
)}
      </div>
      
    </div>
  );
};

export default PlayerPage;
