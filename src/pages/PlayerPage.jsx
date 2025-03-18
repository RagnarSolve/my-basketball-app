import { useEffect, useState } from "react";
import { fetchPlayersStats } from "../api/nbaApi";

const teams = [
  { id: 1, name: "Atlanta Hawks" },
  { id: 2, name: "Boston Celtics" },
  { id: 4, name: "Brooklyn Nets" },
  { id: 5, name: "Charlotte Hornets" },
  { id: 6, name: "Chicago Bulls" },
  { id: 7, name: "Cleveland Cavaliers" },
  { id: 8, name: "Dallas Mavericks" },
  { id: 9, name: "Denver Nuggets" },
  { id: 10, name: "Detroit Pistons" },
  { id: 11, name: "Golden State Warriors" },
  { id: 14, name: "Houston Rockets" },
  { id: 15, name: "Indiana Pacers" },
  { id: 16, name: "LA Clippers" },
  { id: 17, name: "Los Angeles Lakers" },
  { id: 19, name: "Memphis Grizzlies" },
  { id: 20, name: "Miami Heat" },
  { id: 21, name: "Milwaukee Bucks" },
  { id: 22, name: "Minnesota Timberwolves" },
  { id: 23, name: "New Orleans Pelicans" },
  { id: 24, name: "New York Knicks" },
  { id: 25, name: "Oklahoma City Thunder" },
  { id: 26, name: "Orlando Magic" },
  { id: 27, name: "Philadelphia 76ers" },
  { id: 28, name: "Phoenix Suns" },
  { id: 29, name: "Portland Trail Blazers" },
  { id: 30, name: "Sacramento Kings" },
  { id: 31, name: "San Antonio Spurs" },
  { id: 38, name: "Toronto Raptors" },
  { id: 40, name: "Utah Jazz" },
  { id: 41, name: "Washington Wizards" }
];

const PlayerPage = () => {
  const [playersStats, setPlayersStats] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(teams[0].id); 

  useEffect(() => {
    const loadPlayerStats = async () => {
      const data = await fetchPlayersStats(selectedTeam);
      console.log("Raw Player Stats Data:", data);

      if (Array.isArray(data) && data.length > 0) {
        const latestTeamPlayers = {}; 

        data.forEach(stat => {
          const playerId = stat.player.id;

          
          if (!latestTeamPlayers[playerId] || latestTeamPlayers[playerId].team !== stat.team.name) {
            latestTeamPlayers[playerId] = {
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

         
          latestTeamPlayers[playerId].games += 1;
          latestTeamPlayers[playerId].totalPoints += stat.points || 0;
          latestTeamPlayers[playerId].assists += stat.assists || 0;
          latestTeamPlayers[playerId].rebounds += stat.totReb || 0;
          latestTeamPlayers[playerId].steals += stat.steals || 0;
          latestTeamPlayers[playerId].blocks += stat.blocks || 0;
          latestTeamPlayers[playerId].turnovers += stat.turnovers || 0;
        });

        const formattedPlayers = Object.values(latestTeamPlayers).map(player => ({
          ...player,
          ppg: (player.totalPoints / player.games).toFixed(1),
          assistsPerGame: (player.assists / player.games).toFixed(1),
          reboundsPerGame: (player.rebounds / player.games).toFixed(1),
          stealsPerGame: (player.steals / player.games).toFixed(1),
          blocksPerGame: (player.blocks / player.games).toFixed(1),
          turnoversPerGame: (player.turnovers / player.games).toFixed(1),
        }));

        setPlayersStats(formattedPlayers);
      } else {
        console.error("Invalid Player Data Structure:", data);
        setPlayersStats([]);
      }
    };

    loadPlayerStats();
  }, [selectedTeam]);

  return (
    <div>
      <h2>NBA Player Stats (2024 Season)</h2>

     
      <label htmlFor="teamSelect">Select a Team: </label>
      <select
        id="teamSelect"
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
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
        </ul>
      )}
    </div>
  );
};

export default PlayerPage;
