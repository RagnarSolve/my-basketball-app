import { useState } from "react";
import HomePage from "../pages/HomePage";
import GamesPage from "../pages/GamesPage";
import StandingsPage from "../pages/StandingsPage";
import PlayerPage from "../pages/PlayerPage";
import NewsPage from "../pages/NewsPage";
import TransactionPage from "../pages/TransactionPage";
import SecondaryNav from "./SecondaryNav";
import PrimaryNav from "./PrimaryNav";
import "./MainContent.css";

/**
 * maincontent är den centrala komponenten som ändras beroende på vilket menyval man klickar på i secondaryNav,
 * PrimaryNav och SecondaryNav visas alltid oavsett vilket menyval man gör,
 * det enda som ändras är innehållet som hämtas från api'et i respektive sida(pages)
 *
 * @returns {JSX.Element} huvudinnehållet med navigation och aktiv sidasom byts dynamiskt
 */
const MainContent = () => {
    const [page, setPage] = useState("home");

    return (
        <div className="main-content">
            <PrimaryNav />
            <SecondaryNav setPage={setPage} />
            {page === "home" && <HomePage />}
            {page === "standings" && <StandingsPage />}
            {page === "games" && <GamesPage />}
            {page === "players" && <PlayerPage />}
            {page === "news" && <NewsPage />}
            {page === "transactions" && <TransactionPage />}
        </div>
    );
};

export default MainContent;