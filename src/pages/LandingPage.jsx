import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LandingPage.css";

function LandingPage() {
  const [surahs, setSurahs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.alquran.cloud/v1/surah")
      .then((response) => {
        setSurahs(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching surahs:", error);
      });
  }, []);

  const handleSurahClick = (id) => {
    navigate(`/surah/${id}`);
  };

  return (
    <div className="landing-page">
      <h1 className="landing-title">Quran Surahs</h1>
      <div className="surah-grid">
        {surahs.map((surah) => (
          <div
            key={surah.number}
            className="surah-card"
            onClick={() => handleSurahClick(surah.number)}
          >
            <div className="surah-details">
              <div className="surah-number">
                <div className="diamond">
                  <span>{surah.number}</span>
                </div>
              </div>
              <div className="surah-info">
                <div className="roman-name">{surah.englishName}</div>
                <div className="english-name">
                  {surah.englishNameTranslation}
                </div>
              </div>
              <div>
                <div className="surah-name-arabic">{surah.name}</div>
                <div className="surah-ayahs">{surah.numberOfAyahs} Ayahs</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
