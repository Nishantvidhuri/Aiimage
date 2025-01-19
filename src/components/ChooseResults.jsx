import React from "react";
import image1 from "../images/City of Tomorrow.jpeg";
import image2 from "../images/Underwater Paradis.jpeg";
import image3 from "../images/Magical Creatures.jpeg";
import image4 from "../images/Time Travel Adventure.jpeg";
import image5 from "../images/Celebration of Life.jpeg";
import "../style/ChooseResults.css";

const ChooseResults = ({ onSelect }) => {
  const handleClick = (value) => {
    onSelect(value);
  };

  const availableOptions = [
    { name: "City of Tomorrow", src: image1 },
    { name: "Underwater Paradise", src: image2 },
    { name: "Magical Creatures", src: image3 },
    { name: "Time Travel Adventure", src: image4 },
    { name: "Celebration of Life", src: image5 },
  ];

  return (
    <div className="choose-results">
      <h2 className="title">Choose from the below ideas</h2>
      <div className="results-grid">
        {availableOptions.map((value) => (
          <div
            key={value.name}
            className="result-card"
            onClick={() => handleClick(value.name)}
          >
            <img
              className="result-image"
              src={value.src}
              alt={value.name}
              loading="lazy"
            />
            <div className="result-name">{value.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseResults;
