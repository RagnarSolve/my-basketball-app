import { useEffect, useState } from "react";
import { fetchNews } from "../api/nbaNewsApi";

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        <div style={{ backgroundColor: "lightgray", margin: "50px"}}>
            <h2>NBA Latest News</h2>
            {loading && <p>Loading news...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && (
                <ul>
                    {news.map((article, index) => (
                        <li key={index} style={{backgroundColor:"white"}}>
                            <h3>{article.title}</h3>
                            <p><strong>Source:</strong> {article.source}</p>
                            <a href={article.url} target="_blank">
                                Read Full Article
                            </a>
                        </li>
                    ))}
                </ul>
            )}

            <div>
                <img src="https://cdn.nba.com/manage/2023/06/jokic-murray061223.jpg" alt="" width="500px" height="400px"/>
            </div>
        </div>
    );
};

export default NewsPage;