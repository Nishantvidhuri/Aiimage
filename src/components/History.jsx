import React from "react";
import ChooseResults from "../components/ChooseResults";
import RecentResults from "../components/RecentResults";

const History = ({ handleAvailOptions, promptQuery, imageResult }) => {
  return (
    <div className="extras-section">
      <ChooseResults onSelect={handleAvailOptions} />
      <RecentResults
        promptQuery={promptQuery}
        imageResult={imageResult}
        onSelect={handleAvailOptions}
      />
    </div>
  );
};

export default History;
