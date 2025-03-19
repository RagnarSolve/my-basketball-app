import "./SecondaryNav.css";

export default function SecondaryNav({ setPage }) {
    return (
        <nav className="secondary-nav">
            <a href="#" onClick={() => setPage("home")}>Home</a>
            <a href="#" onClick={() => setPage("standings")}>Standings</a>
            <a href="#" onClick={() => setPage("games")}>Game Results</a>
            <a href="#" onClick={() => setPage("players")}>Player Stats</a>
            <a href="#" onClick={() => setPage("news")}>NBA News</a>
        </nav>
    );
}