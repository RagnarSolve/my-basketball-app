import { useEffect, useState } from "react";
import { fetchStandings } from "../api/nbaApi";

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

    if (!standings.length) return <p>Loading standings...</p>;

    return (
        <div>
            <h2>NBA Standings (2024-25)</h2>
            <ol> 
                {standings.map((team, index) => (
                    <li key={index}>
                        {team.team.name} - {team.win.total} Wins, {team.loss.total} Losses
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default StandingsPage;