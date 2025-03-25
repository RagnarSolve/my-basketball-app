import "./SecondaryNav.css";

/**
 * SecondaryNav är komponenten under PrimaryNav.
 * SecondaryNav är komponenten som innehåller alla länkar,
 * som användaren kan klick på och välja vilken sida man vill kolla på.
 *
 * @component
 * @param {Object} props - komponentens props.
 * @param {function} props.setPage - funktion för att ändra sida.
 * @returns {JSX.Element} en meny med olika länkar
 */
export default function SecondaryNav({ setPage }) {

    /**
    * Hanterar klick på en menylänk och byter till vald sida.
    *
    * @param {React.MouseEvent} e - click-eventet.
    * @param {string} pageName - namnet på sidan som ska visas.
    */
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
                <nav> <a href="#transactions" id="navSection" onClick={(e) => handleNavigation(e, "transactions")}><h3>Transactions</h3></a></nav>
                
        </nav>
    );
}