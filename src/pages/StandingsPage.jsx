import { useEffect, useState } from "react";
import { fetchStandings } from "../api/nbaApi";

/**
 * StandingsPage visar nba-tabellen för säsongen 2024–25.
 * datan fetchas från ett api och sorteras efter antal vinster.
 *
 * @returns {JSX.Element} en lista med tabellen ifrån säsong 2024-25
 */
const StandingsPage = () => {
    const [standings, setStandings] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

   useEffect(() => {
    const loadingStandings = async () => {
        try {
            const data = await fetchStandings();
            const sortedStandings = data.sort((a,b) => b.win.total - a.win.total);
            setStandings(sortedStandings);
        } catch (err) {
            setError("Failed to load standings");
            console.error("Error fetching standings:", err);
        } finally {
            setLoading(false);
        }
    };
    loadingStandings();
   }, []);

   if (loading) return <p>Loading standings...</p>
   if (error) return <p>{error}</p>
   if (!standings.length) return <p>No standings data available</p>

    return (
        <div style={{ display:"flex", backgroundColor: "lightgray", margin: "50px", paddingTop: "50px"}}>

<div style={{margin:"50px"}}>
    <img src="https://wallpapers.com/images/featured/nba-team-logos-xm3mg9l8k2a11mic.jpg" alt="" width="" height="700px"
 />
</div>
            <div style={{width:"100%", textAlign:"center"}}>
            <h2 style={{color:"brown", margin:"20px"}}>NBA Standings (2024-25)</h2>
            <ol> 
                {standings.map((team, index) => (
                    <li key={index} style={{ color:"black", backgroundColor:"beige", margin:"20px",  textAlign:"center", justifyContent:"center"}}>
                        {team.team.name} - {team.win.total} Wins, {team.loss.total} Losses
                    </li>
                ))}
            </ol>
            </div>
           
        </div>
    );
};

export default StandingsPage;