import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SurahDetails.css";

function SurahPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [surah, setSurah] = useState(null);
  const [translations, setTranslations] = useState({});
  const [selectedTranslation, setSelectedTranslation] = useState("en.sahih");
  const [allSurahs, setAllSurahs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const activeSurahRef = useRef(null); // Ref for the active surah

  useEffect(() => {
    // Fetch the surah data including Arabic text
    axios
      .get(`https://api.alquran.cloud/v1/surah/${id}`)
      .then((response) => {
        setSurah(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching surah:", error);
      });

    // Fetch translations
    const translationsToFetch = {
      "en.sahih": "Sahih International",
      "ur.jalandhry": "Jalandhry Urdu",
      "ur.ahmedali": "Ahmed Ali Urdu",
      "ur.maududi": "Maududi Urdu",
    };
    Object.entries(translationsToFetch).forEach(([key, name]) => {
      axios
        .get(`https://api.alquran.cloud/v1/surah/${id}/${key}`)
        .then((response) => {
          setTranslations((prev) => ({
            ...prev,
            [key]: { name, ayahs: response.data.data.ayahs },
          }));
        })
        .catch((error) => {
          console.error(`Error fetching translation (${key}):`, error);
        });
    });

    // Fetch all surah names
    axios
      .get("https://api.alquran.cloud/v1/surah")
      .then((response) => {
        setAllSurahs(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching all surahs:", error);
      });
  }, [id]);

  const handleTranslationChange = (key) => {
    setSelectedTranslation(key);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredSurahs = allSurahs.filter((surah) =>
    surah.englishName.toLowerCase().includes(searchTerm)
  );

  const handleSurahClick = (surahId) => {
    navigate(`/surah/${surahId}`);
  };

  useEffect(() => {
    // Scroll active surah into view
    if (activeSurahRef.current) {
      activeSurahRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [id]);

  if (!surah) return <div>Loading...</div>;

  return (
    <div className="surah-page-container">
      {/* Sidebar */}
      <div className="sidebar">
        <input
          type="text"
          placeholder="Search Surah"
          className="search-bar"
          value={searchTerm}
          onChange={handleSearch}
        />
        <ul className="surah-list">
          {filteredSurahs.map((surah) => (
            <li
              key={surah.number}
              ref={surah.number === parseInt(id) ? activeSurahRef : null}
              className={`surah-item ${
                surah.number === parseInt(id) ? "active" : ""
              }`}
              onClick={() => handleSurahClick(surah.number)}
            >
              {surah.number}. {surah.englishName}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="surah-content">
        <div className="header-container">
          <div className="header-top">
            <h1 className="surah-title">
              {surah.englishName} - {surah.name}
            </h1>
            <h2 className="ayah-count">Total Ayahs: {surah.numberOfAyahs}</h2>
          </div>
          <div className="header-bottom">
            <div className="translation-selector">
              <h3>Select Translation</h3>
              {Object.entries(translations).map(([key, translation]) => (
                <label key={key} className="radio-label">
                  <input
                    type="radio"
                    name="translation"
                    value={key}
                    checked={selectedTranslation === key}
                    onChange={() => handleTranslationChange(key)}
                  />
                  {translation.name}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Display Arabic text with selected translation */}
        <div className="ayahs">
          {surah.ayahs.map((ayah) => (
            <div key={ayah.numberInSurah} className="ayah-container">
              <div className="ayah-arabic">
                <span className="ayah-number">{ayah.numberInSurah}.</span>{" "}
                {ayah.text}
              </div>
              <div className="ayah-translation">
                {translations[selectedTranslation]?.ayahs?.find(
                  (t) => t.numberInSurah === ayah.numberInSurah
                )?.text || "Loading translation..."}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SurahPage;
