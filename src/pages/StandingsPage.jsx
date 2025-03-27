import { useEffect, useState } from "react";
import { fetchStandings } from "../api/nbaApi";
import './StandingsPage.css';

const StandingsPage = () => {
    const [standings, setStandings] = useState([]);

    useEffect(() => {
        fetchStandings().then(data => {
            console.log("Standings Data (Before Sorting):", data);

            const sortedStandings = data.sort((a, b) => b.win.total - a.win.total);

            console.log("Standings Data (Sorted):", sortedStandings);
            setStandings(sortedStandings);
        });
    }, []);

    if (!standings.length) return <p className="loading-message">Loading standings...</p>;

    return (
        <div className="standings-container">
            <h2 className="standings-header">NBA Standings (2024-25)</h2>
            <ol className="standings-list">
                {standings.map((team, index) => (
                    <li key={index} className="standing-item">
                        <div className="team-rank">{index + 1}</div>
                        <div className="team-name">{team.team.name}</div>
                        <div className="team-stats">
                            <span className="team-wins">{team.win.total} Wins</span> | 
                            <span className="team-losses"> {team.loss.total} Losses</span>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default StandingsPage;
