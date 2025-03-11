import "./SecondaryNav.css";

export default function SecondaryNav({ setPage }) {
    return (
        <nav className="secondary-nav">
            <button onClick={() => setPage("home")}>Home</button>
            <button onClick={() => setPage("standings")}>Standings</button>
            <button onClick={() => setPage("games")}>Game Results</button>
            <button onClick={() => setPage("players")}>Player Stats</button>
        </nav>
    );
}