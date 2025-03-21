import { useEffect, useState } from "react";
import { fetchLiveGames } from "../api/nbaApi";

const HomePage = () => {
    const [liveGames, setLiveGames] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        "https://library.sportingnews.com/styles/crop_style_16_9_desktop/s3/2025-02/GFX-1736%20NBA%20All%20Star%202025%20FTR%20package_FTR%20%231_0.jpg?itok=62EoVz5c",
        "https://gsp-image-cdn.wmsports.io/cms/prod/bleacher-report/getty_images/2198819600_large_image_0.jpg",
        "https://www.rollingstone.com/wp-content/uploads/2024/04/how-to-watch-lakers-vs-nuggets-nba-playoff-games-online-live-stream.jpg?w=1483&h=1054&crop=1"
    ];

    useEffect(() => {
        const loadLiveGames = async () => {
            const data = await fetchLiveGames();
            setLiveGames(data);
        };

        loadLiveGames();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 3 seconds

        return () => clearInterval(interval); 
    }, []);

    return (
        <div>
            <h2>Welcome to the NBA Stats App</h2>

            <div id="homePicture" style={{ position: "relative", width: "100%", maxWidth: "800px",height: "450px", overflow: "hidden" }}>
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt=""
                        style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                            position: "absolute",
                            opacity: index === currentIndex ? 1 : 0,
                            transition: "opacity 1s ease-in-out"
                        }}
                    />
                ))}
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
