import { useState } from "react";
import HomePage from "../pages/HomePage";
import GamesPage from "../pages/GamesPage";
import StandingsPage from "../pages/StandingsPage";
import PlayerPage from "../pages/PlayerPage";
import SecondaryNav from "./SecondaryNav"; 
import PrimaryNav from "./PrimaryNav";
import "./MainContent.css";

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
        </div>
    );
};

export default MainContent;