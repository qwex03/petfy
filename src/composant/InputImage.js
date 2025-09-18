import React, { useState } from "react";

const InputImage = ({ onImageChange }) => {
  const [imageUrl, setImageUrl] = useState(""); 

  const handleUrlChange = (event) => {
    const url = event.target.value;
    setImageUrl(url); 

    if (onImageChange) {
      onImageChange(url);  
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Ajoute une photo de ton animal</h1>
      <div className="picture" style={{ position: "relative", display: "inline-block" }}>
        <input
          type="text"
          placeholder="Entrez l'URL de l'image"
          value={imageUrl}
          onChange={handleUrlChange}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "8px",
            border: "2px dashed brown",
            textAlign: "center",
          }}
        />
      </div>
      <p>Essaie de mettre une photo de qualité de ton animal pour charmer son futur adoptant</p>
      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt="Image de l'animal"
            style={{ width: "100px", margin: "5px", borderRadius: "5px" }}
          />
        </div>
      )}
    </div>
  );
};

export default InputImage;
