import { useEffect, useState, useCallback } from "react";
import { fetchPlayersStats } from "../api/nbaApi";

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

/**
 * PlayerPage visar stats för spelare baserat på det lag användaren väljer.
 * datan hämtas från ett api och sedan sammanställs det i snitt per spelare på en hel säsong,
 * inklusive poäng, assists, returer, steals och blocks.
 *
 * användaren kan välja ett lag från en dropdown, 
 * och då får man upp de 15 bästa spelarna baserat på PPG(points) som visas i en lista.
 *
 * @returns {JSX.Element} en komponent som visar spelarnas stats för ett specifikt valt lag.
 */
const PlayerPage = () => {
  const [playersStats, setPlayersStats] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(teams[0].id);

  const loadPlayerStats = useCallback(async () => {
    const data = await fetchPlayersStats(selectedTeam);

    if (Array.isArray(data) && data.length > 0) {
      const playerStatsMap = {};

      data.forEach(stat => {
        const playerId = stat.player?.id;

        if (!playerStatsMap[playerId]) {
          playerStatsMap[playerId] = {
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

        playerStatsMap[playerId].gamesPlayed += 1;
        playerStatsMap[playerId].totalPoints += stat.points ?? 0;
        playerStatsMap[playerId].assists += stat.assists ?? 0;
        playerStatsMap[playerId].rebounds += stat.totReb ?? 0;
        playerStatsMap[playerId].steals += stat.steals ?? 0;
        playerStatsMap[playerId].blocks += stat.blocks ?? 0;
      });

      const formattedPlayers = Object.values(playerStatsMap)
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
    <div>
      <h2>NBA Player Stats (2024 Season)</h2>

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
            <li key={index}>
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
  );
};

export default PlayerPage;
