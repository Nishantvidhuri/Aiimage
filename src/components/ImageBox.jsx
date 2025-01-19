import React from "react";
import "../style/ImageBox.css";

const ImageBox = (props) => {
  return (
    <>
      {props.imageResult ? (
        <div className="image-box-container">
          <div className="image-box">
            <img
              src={props.imageResult}
              alt={props.promptQuery}
              loading="lazy"
              className="generated-image"
            />
          </div>
          <div className="download-section">
            <a
              download={props.promptQuery}
              href={props.imageResult}
              className="download-button"
            >
              Download
            </a>
          </div>
        </div>
      ) : (
        <div className="no-image-placeholder">
          No image generated yet. Try generating one!
        </div>
      )}
    </>
  );
};

export default ImageBox;
