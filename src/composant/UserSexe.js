import React, { useState, useEffect } from "react";

const GenderSelector = ({ onChange }) => {
    const [activeButton, setActiveButton] = useState(null);
  
    const handleClick = (userGender) => {
      const newActiveButton = activeButton === userGender ? null : userGender;
      setActiveButton(newActiveButton);
      onChange(newActiveButton); 
    };
  
    return (
      <div className="box">
        <h1>Tu es : </h1>
        <div className="button-box">
          {[{ label: "Tu es un homme", value: "homme" },
            { label: "Tu es une femme", value: "femme" },
            { label: "Autre", value: "autre" }].map((option, index) => (
            <button
              key={index}
              onClick={() => handleClick(option.value)}
              className={`category-button ${activeButton === option.value ? "active" : ""}`}
              style={{
                display: activeButton === null || activeButton === option.value ? "inline-block" : "none",
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default GenderSelector;
  