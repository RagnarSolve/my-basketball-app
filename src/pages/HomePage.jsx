import { useEffect, useState } from "react";
import { fetchLiveGames } from "../api/nbaApi";
import { fetchNews } from "../api/nbaNewsApi";

/**
 * HomePage är startsidan.
 * Den innehåller en bildslider, live-matcher, och de senaste nyheterna från nba.
 *
 * @returns {JSX.Element} startsidan med nyheter, bildslider och live-matcher
 */
const HomePage = () => {
    const [liveGames, setLiveGames] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    //for the news
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const images = [
        "https://media.nbcsportsbayarea.com/2025/02/Steph-Curry-Warriors-Mavericks.jpg?quality=85&strip=all&resize=1200%2C675",
        "https://www.bostonsportsjournal.com/img/Celtics/GettyImages-1247602519-1600x900.jpg",
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
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval); 
    }, []);



    //news part
    useEffect(() => {
        const loadNews = async () => {
            setLoading(true);
            setError(null);

            try {
                const articles = await fetchNews(10);
                console.log("Received articles:", articles);
                setNews(articles);
            } catch (err) {
                setError("Failed to fetch news. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, []);
    

    return (
        <div id="HomePage" style={{display:"flex", backgroundColor: "lightgray", margin: "50px", paddingTop: "20px"}}>
            

            <div id="homePicture" style={{ position: "relative", width: "100%", maxWidth: "1000px",height: "auto", overflow: "hidden" }}>
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
           
            <div id="news" style={{display: "flex", margin:"2rem"}}>

            {loading && <p>Loading news...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && (
                <ul>
                     <h2 style={{font:"500", color:"brown"}}>NBA Latest News</h2>
                    {news.map((article, index) => (
                        <li  key={index} style={{}}>
                            <h3>{article.title}</h3>
                            <p><strong>Source:</strong> {article.source}</p>
                            <a href={article.url} target="_blank">
                                Read Full Article
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>

          
            
        </div>
    );
};

export default HomePage;
