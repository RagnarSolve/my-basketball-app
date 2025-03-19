import { useEffect, useState } from "react";
import { fetchLiveGames } from "../api/nbaApi";

const HomePage = () => {
    const [liveGames, setLiveGames] = useState([]);

    useEffect(() => {
        const loadLiveGames = async () => {
            const data = await fetchLiveGames();
            setLiveGames(data);
        };

        loadLiveGames();
    }, []);

    return (
        <div>
            <h2>Welcome to the NBA Stats App</h2>
            
             <div id="homePicture">
                 <img src="https://library.sportingnews.com/styles/crop_style_16_9_desktop/s3/2025-02/GFX-1736%20NBA%20All%20Star%202025%20FTR%20package_FTR%20%231_0.jpg?itok=62EoVz5c" alt=""  id="pic"/>
                 <img src="https://gsp-image-cdn.wmsports.io/cms/prod/bleacher-report/getty_images/2198819600_large_image_0.jpg" alt="" id="pic"/>
             </div>
           
            <h3>Live NBA Games</h3>
            {liveGames.length > 0 ? (
                <ul>
                    {liveGames.map((game, index) => (
                        <li key={index}>
                            {game.teams.home.name} vs {game.teams.visitors.name}
                            <br />
                            Score: {game.scores.home.points} - {game.scores.visitors.points}
                            <br />
                            Status: {game.status.long}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No live games currently.</p>
            )}
        </div>
    );
};

export default HomePage;
   
         