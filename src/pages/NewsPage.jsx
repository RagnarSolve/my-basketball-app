import { useEffect, useState } from "react";
import { fetchNews } from "../api/nbaNewsApi";
import './NewsPage.css';

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
        <div className="news-container">
            <h2 className="news-header">NBA Latest News</h2>
            {loading && <p className="loading-message">Loading news...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && (
                <ul>
                    {news.map((article, index) => (
                        <li key={index} className="news-article">
                            <h3 className="article-title">{article.title}</h3>
                            <p className="article-source"><strong>Source:</strong> {article.source}</p>
                            <a className="article-link" href={article.url} target="_blank" rel="noopener noreferrer">
                                Read Full Article
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NewsPage;
