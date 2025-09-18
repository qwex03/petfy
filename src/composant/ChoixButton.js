import React from "react";

const ChoixButton = ({ formData, onFormDataChange, role }) => {
  const handleGenderChange = (value) => {
    onFormDataChange({ ...formData, gender: value });
  };

  const handleAgeChange = (value) => {
    onFormDataChange({ ...formData, age: value });
  };

  const handleEuthanasiaChange = (value) => {
    onFormDataChange({ ...formData, euthanasia: value });
  };

  const handlePreferenceChange = (key) => {
    onFormDataChange({
      ...formData,
      preferences: {
        ...formData.preferences,
        [key]: !formData.preferences[key],
      },
    });
  };

  return (
    <div className="form-container">
      <h1 className="title">Petffy</h1>
      <h2 className="subtitle">{role === "admin" ? "Indique-nous ses caractéristiques" : "Quelles caractéristiques recherches-tu ?"}</h2>

      <div className="section">
        <h3>{role === "admin" ? "C'est un(e)" : "J'aimerai un(e)"}</h3>
        <div className="button-group">
          <button
            className={`button ${formData.gender === "male" ? "active" : ""}`}
            onClick={() => handleGenderChange("male")}
          >
            Mâle
          </button>
          <button
            className={`button ${formData.gender === "female" ? "active" : ""}`}
            onClick={() => handleGenderChange("female")}
          >
            Femelle
          </button>
        </div>
      </div>

      <div className="section">
        <h3>Son âge</h3>
        <div className="button-group">
          <button
            className={`button ${formData.age === "young" ? "active" : ""}`}
            onClick={() => handleAgeChange("young")}
          >
            Jeune
          </button>
          <button
            className={`button ${formData.age === "adult" ? "active" : ""}`}
            onClick={() => handleAgeChange("adult")}
          >
            Adulte
          </button>
          <button
            className={`button ${formData.age === "senior" ? "active" : ""}`}
            onClick={() => handleAgeChange("senior")}
          >
            Senior
          </button>
        </div>
      </div>

      <div className="section">
        <h3>En urgence euthanasie ?</h3>
        <div className="button-group">
          <button
            className={`button ${formData.euthanasia === "yes" ? "active" : ""}`}
            onClick={() => handleEuthanasiaChange("yes")}
          >
            Oui
          </button>
          <button
            className={`button ${formData.euthanasia === "no" ? "active" : ""}`}
            onClick={() => handleEuthanasiaChange("no")}
          >
            Non
          </button>
        </div>
      </div>

      <div className="section">
        <h3>{role === "admin" ? "Ton animal s'entend avec" : "Tu as :"}</h3>
        <div className="checkbox-group">
          <button
            className={`button ${formData.preferences.dog ? "active" : ""}`}
            onClick={() => handlePreferenceChange("dog")}
          >
            Chien
          </button>
          <button
            className={`button ${formData.preferences.cat ? "active" : ""}`}
            onClick={() => handlePreferenceChange("cat")}
          >
            Chat
          </button>
          <button
            className={`button ${formData.preferences.kids ? "active" : ""}`}
            onClick={() => handlePreferenceChange("kids")}
          >
            Enfants
          </button>
          <button
            className={`button ${formData.preferences.others ? "active" : ""}`}
            onClick={() => handlePreferenceChange("others")}
          >
            Autre
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoixButton;
