import "./SecondaryNav.css";

export default function SecondaryNav({ setPage }) {

    const handleNavigation = (e, pageName) => {
        e.preventDefault();
        setPage(pageName);
        
    }
    return (
        <nav className="secondary-nav">   
                <nav> <a href="#home" id="navSection" onClick={(e) => handleNavigation(e, "home" )}><h3>Home</h3></a></nav>
                <nav> <a href="#players" id="navSection" onClick={(e) => handleNavigation(e, "players")}><h3>Players</h3></a></nav>
                <nav> <a href="#table" id="navSection" onClick={(e) => handleNavigation(e, "standings" )}><h3>Table</h3></a></nav>
                <nav> <a href="#games" id="navSection" onClick={(e) => handleNavigation(e, "games" )}><h3>Games</h3></a></nav>
                <nav> <a href="#news" id="navSection" onClick={(e) => handleNavigation(e, "news" )}><h3>News</h3></a></nav>
                
        </nav>
    );
}