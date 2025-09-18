import React from "react";

const Slider = ({ value, onChange }) => {
  return (
    <div>
      <h2>Tu recherches dans quelle zone ?</h2>
      <input
        type="range"
        min="0"
        max="250"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))} 
      />
      <p>{value} km</p>
    </div>
  );
};

export default Slider;
