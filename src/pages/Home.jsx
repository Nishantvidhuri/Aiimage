import React, { useState, useEffect } from "react";
import ImageBox from "../components/ImageBox";
import NavBar from "../components/NavBar";
import { fetchImages } from "../services/model-api";
import { getRandom, loaderMessages, promptIdeas } from "../utilities/utils";
import ChooseResults from "../components/ChooseResults";
import RecentResults from "../components/RecentResults";

import "../style/Home.css"; // Import external CSS

const Home = () => {
  const [activeSection, setActiveSection] = useState("aigeneration");
  const [showLoader, setShowLoader] = useState(false);
  const [imageResult, setImageResult] = useState(null);
  const [promptQuery, setPromptQuery] = useState("");
  const [loaderMessage, setLoaderMessage] = useState(loaderMessages[0]);

  const schedulerOptions = ["Euler", "LMS", "Heun", "DDPM"];
  const stepOptions = ["20", "30", "50"];

  useEffect(() => {
    const loaderInterval = setInterval(() => {
      setLoaderMessage(getRandom(loaderMessages));
    }, 3000);

    return () => clearInterval(loaderInterval); // Cleanup interval on component unmount
  }, [loaderMessage]);

  const handleSearch = (event) => setPromptQuery(event.target.value);

  const fetchData = async () => {
    try {
      setShowLoader(true);

      // Generate random values for scheduler, steps, and seed
      const randomScheduler = getRandom(schedulerOptions);
      const randomSteps = getRandom(stepOptions);
      const randomSeed = Math.floor(Math.random() * 100000000);

      const imageBlob = await fetchImages(promptQuery, randomSeed, randomScheduler, randomSteps);

      const fileReaderInstance = new FileReader();
      fileReaderInstance.onload = () => setImageResult(fileReaderInstance.result);
      fileReaderInstance.readAsDataURL(imageBlob);

      setShowLoader(false);
    } catch (error) {
      console.error("Error fetching images from API:", error);
      setShowLoader(false);
    }
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleSurpriseMe = () => setPromptQuery(getRandom(promptIdeas));

  const handleAvailOptions = (option) => setPromptQuery(option);

  const renderSection = () => {
    switch (activeSection) {
      case "aigeneration":
        return (
          <>
            <div className="form-container">
              <div className="input-group">
                <input
                  type="text"
                  id="prompt"
                  value={promptQuery}
                  onChange={handleSearch}
                  placeholder="A plush toy robot sitting against a yellow wall"
                  className="input-field"
                />
                <button onClick={handleSurpriseMe} className="button button-blue">
                  Surprise Me
                </button>
              </div>

              <button onClick={handleGenerate} className="button button-green">
                Generate Image
              </button>
            </div>

            <div className="result-section">
              {showLoader ? (
                <div className="loader-container">
                  <svg viewBox="0 0 100 100">
                    <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="6">
                      <path d="M 21 40 V 59">
                        <animateTransform
                          attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          values="0 21 59; 180 21 59"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <path d="M 79 40 V 59">
                        <animateTransform
                          attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          values="0 79 59; -180 79 59"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <path d="M 50 21 V 40">
                        <animate
                          attributeName="d"
                          values="M 50 21 V 40; M 50 59 V 40"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <path d="M 50 60 V 79">
                        <animate
                          attributeName="d"
                          values="M 50 60 V 79; M 50 98 V 79"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <path d="M 50 21 L 79 40 L 50 60 L 21 40 Z">
                        <animate
                          attributeName="stroke"
                          values="rgba(255,255,255,1); rgba(100,100,100,0)"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <path d="M 50 40 L 79 59 L 50 79 L 21 59 Z" />
                      <path d="M 50 59 L 79 78 L 50 98 L 21 78 Z">
                        <animate
                          attributeName="stroke"
                          values="rgba(100,100,100,0); rgba(255,255,255,1)"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="translate"
                        values="0 0; 0 -19"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </g>
                  </svg>
                </div>
              ) : (
                <ImageBox promptQuery={promptQuery} imageResult={imageResult} />
              )}
            </div>
            <ChooseResults onSelect={handleAvailOptions} />
          </>
        );
      case "history":
        return (
          <div className="extras-section">
            <RecentResults
              promptQuery={promptQuery}
              imageResult={imageResult}
              onSelect={handleAvailOptions}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="home-container">
      <NavBar onNavClick={setActiveSection} />
      <div className="content">{renderSection()}</div>
      
    </div>
  );
};

export default Home;
