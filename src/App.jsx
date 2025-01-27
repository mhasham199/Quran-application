import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SurahPage from "./pages/SurahPage";
import "./styles/Common.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/surah/:id" element={<SurahPage />} />
      </Routes>
    </Router>
  );
}

export default App;
