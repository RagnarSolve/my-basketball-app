import React, {use, useEffect, useState } from "react";
import { fetchGames } from "./basketballApi";
import { HomePage } from './HoopsWebsite/pages/HomePage'

function App() {

  function HoopsSite() {
    return <HomePage />;
  }

  if (true) {
    return <HoopsSite />;
  }
  

}

export default App;