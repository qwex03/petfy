import React from "react";
import "./css/textarea.css";
import Input from "./input";

const TextArea = ({ nameValue, ageValue, descValue, onNameChange, onAgeChange, onDescChange }) => {
  return (
    <div>
        <Input
          type="text"
          value={nameValue}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Entrez le nom de l'animal"
          label={"nom de l'animal"}
        />
        <Input
          type="number"
          value={ageValue}
          onChange={(e) => onAgeChange(e.target.value)}
          placeholder="Entrez l'âge de l'animal"
          label={"age de l'animal"}
        />
        <textarea value={descValue} onChange={(e) => onDescChange(e.target.value)}></textarea>
    </div>
  );
};

export default TextArea;
