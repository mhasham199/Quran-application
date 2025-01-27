import React from "react";
import { Link } from "react-router-dom";
import "../styles/SurahCard.css";

function SurahCard({ surah }) {
  return (
    <Link to={`/surah/${surah.number}`} className="surah-card">
      <div className="surah-number">{surah.number}</div>
      <div className="surah-name-arabic">{surah.name}</div>
      <div className="surah-name-english">{surah.englishName}</div>
      <div className="surah-name-translation">
        {surah.englishNameTranslation}
      </div>
      <div className="surah-ayahs">{surah.numberOfAyahs} Ayahs</div>
    </Link>
  );
}

export default SurahCard;
