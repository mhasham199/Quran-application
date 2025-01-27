import React from "react";
import { Routes, Route } from "react-router-dom"; // Remove BrowserRouter import
import LandingPage from "./pages/LandingPage";
import SurahPage from "./pages/SurahPage";
import "./styles/Common.css";

function App() {
  return (
    <Routes>  {/* Directly use Routes here */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/surah/:id" element={<SurahPage />} />
    </Routes>
  );
}

export default App;
