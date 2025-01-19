import React, { useEffect, useState } from "react";
import historyIcon from "../images/history.png";
import "../style/RecentResults.css";

const RecentResults = (props) => {
  const recentImages = JSON.parse(localStorage.getItem("genAIRecentKey"));
  const [recentImagesStored, setRecentImagesStored] = useState([]);

  const handleClick = (value) => {
    props.onSelect(value);
  };

  useEffect(() => {
    if (recentImages) {
      setRecentImagesStored(recentImages);
    }

    if (
      props.promptQuery &&
      props.imageResult &&
      recentImages &&
      !recentImages.some((local) => local.src === props.imageResult)
    ) {
      if (recentImages.length === 5) {
        recentImages.shift();
        recentImages.push({
          src: props.imageResult,
          name: props.promptQuery,
        });
      } else {
        recentImages.push({
          src: props.imageResult,
          name: props.promptQuery,
        });
      }
      localStorage.setItem("genAIRecentKey", JSON.stringify(recentImages));
      setRecentImagesStored(recentImages);
    } else if (props.promptQuery && props.imageResult && !recentImages) {
      recentImagesStored.push({
        src: props.imageResult,
        name: props.promptQuery,
      });
      localStorage.setItem(
        "genAIRecentKey",
        JSON.stringify(recentImagesStored)
      );
      setRecentImagesStored(recentImagesStored);
    }
  }, [props.promptQuery, props.imageResult]);

  return (
    <>
      {recentImagesStored.length > 0 ? (
        <div className="recent-results-container">
          <div className="recent-title">
            Recent <img src={historyIcon} alt="History" className="history-icon" />
          </div>
          <div className="recent-images-grid">
            {recentImagesStored.map((value) => (
              <div
                key={value.src}
                className="recent-image-card"
                onClick={() => handleClick(value.name)}
              >
                <img
                  className="recent-image"
                  src={value.src}
                  alt={value.name}
                  loading="lazy"
                />
                <div className="image-label">{value.name}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-recent-results">No recent results found.</div>
      )}
    </>
  );
};

export default RecentResults;
