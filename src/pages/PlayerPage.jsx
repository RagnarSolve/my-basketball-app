import { useEffect, useState } from "react";
import { fetchPlayersStats } from "../api/nbaApi";

const teams = [
  { id: 1, name: "Atlanta Hawks", logo: "https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg" },
  { id: 2, name: "Boston Celtics", logo: "https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg"  },
  { id: 4, name: "Brooklyn Nets", logo: "https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg"  },
  { id: 5, name: "Charlotte Hornets", logo: "https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg"  },
  { id: 6, name: "Chicago Bulls", logo: "https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg" },
  { id: 7, name: "Cleveland Cavaliers", logo: "https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg" },
  { id: 8, name: "Dallas Mavericks", logo: "https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg" },
  { id: 9, name: "Denver Nuggets", logo: "https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg" },
  { id: 10, name: "Detroit Pistons", logo: "https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg" },
  { id: 11, name: "Golden State Warriors", logo: "https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg" },
  { id: 14, name: "Houston Rockets", logo: "https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg" },
  { id: 15, name: "Indiana Pacers", logo: "https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg" },
  { id: 16, name: "LA Clippers", logo: "https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg" },
  { id: 17, name: "Los Angeles Lakers", logo: "https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg" },
  { id: 19, name: "Memphis Grizzlies", logo: "https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg" },
  { id: 20, name: "Miami Heat", logo: "https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg" },
  { id: 21, name: "Milwaukee Bucks", logo: "https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg" },
  { id: 22, name: "Minnesota Timberwolves", logo: "https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg" },
  { id: 23, name: "New Orleans Pelicans", logo: "https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg" },
  { id: 24, name: "New York Knicks", logo: "https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg" },
  { id: 25, name: "Oklahoma City Thunder", logo: "https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg" },
  { id: 26, name: "Orlando Magic", logo: "https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg" },
  { id: 27, name: "Philadelphia 76ers", logo: "https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg" },
  { id: 28, name: "Phoenix Suns", logo: "https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg" },
  { id: 29, name: "Portland Trail Blazers", logo: "https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg" },
  { id: 30, name: "Sacramento Kings", logo: "https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg" },
  { id: 31, name: "San Antonio Spurs", logo: "https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg" },
  { id: 32, name: "Toronto Raptors", logo: "https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg" },
  { id: 33, name: "Utah Jazz", logo: "https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg" },
  { id: 34, name: "Washington Wizards", logo: "https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg" }
];

const PlayerPage = () => {
  const [playersStats, setPlayersStats] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(teams[0].id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlayerStats = async () => {
      setLoading(true);
      const data = await fetchPlayersStats(selectedTeam);
      console.log("Fetched Player Data:", data);

      if (Array.isArray(data) && data.length > 0) {
        const uniquePlayers = new Set();
        const formattedPlayers = data
          .filter(stat => {
            const playerId = stat.player.id;
            if (uniquePlayers.has(playerId)) {
              return false;
            }
            uniquePlayers.add(playerId);
            return true;
          })
          .map(stat => ({
            id: stat.player.id,
            name: `${stat.player.firstname} ${stat.player.lastname}`,
            position: stat.pos !== "N/A" ? stat.pos : "Unknown",
            ppg: stat.points || 0,
            assists: stat.assists || 0,
            rebounds: stat.totReb || 0,
            image: stat.player.photo || "https://via.placeholder.com/50"
          }));

        setPlayersStats(formattedPlayers);
      } else {
        setPlayersStats([]);
      }
      setLoading(false);
    };

    loadPlayerStats();
  }, [selectedTeam]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>NBA Player Stats (2024 Season)</h2>

      {/* Team Selector */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <label htmlFor="teamSelect" style={{ fontWeight: "bold" }}>Select a Team:</label>
        <select
          id="teamSelect"
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(Number(e.target.value))}
          style={{ padding: "10px", fontSize: "16px", borderRadius: "5px", cursor: "pointer" }}
        >
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        {/* Team Logo */}
        <img 
          src={teams.find(team => team.id === selectedTeam)?.logo} 
          alt="Team Logo" 
          style={{ width: "50px", height: "50px", objectFit: "contain", background: "#f8f8f8", borderRadius: "5px" }} 
          onError={(e) => e.target.src = "https://via.placeholder.com/50?text=No+Logo"}
        />
      </div>

      {/* Player List */}
      {loading ? (
        <p>Loading player stats...</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {playersStats.length === 0 ? (
            <p>No players found for this team.</p>
          ) : (
            playersStats.map((player) => (
              <li key={player.id} style={{ display: "flex", alignItems: "center", padding: "10px", borderBottom: "1px solid #ddd" }}>
                <img 
                  src={player.image} 
                  alt={player.name} 
                  style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
                  onError={(e) => e.target.src = "https://via.placeholder.com/50?text=No+Image"}
                />
                <div>
                  <strong>{player.name}</strong> ({player.position}) <br />
                  PPG: {player.ppg} | Assists: {player.assists} | Rebounds: {player.rebounds}
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default PlayerPage;
