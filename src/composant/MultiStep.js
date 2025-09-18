import React, { useState } from 'react';

const MultiStepDisplay = ({ components, handleSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = () => {
    if (currentStep < components.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  return (
    <div>
      <div>
        {components[currentStep]}
      </div>
      {currentStep < components.length - 1 && (
        <button className='NavButton' onClick={goToNextStep}>Suivant</button>
      )}
      {currentStep > 0 && (
        <button className="NavButton" onClick={goToBack}>Précédent</button>
      )}
      {currentStep === components.length - 1 && (
        <button className='NavButton' onClick={handleSubmit}>Soumettre</button>
      )}
    </div>
  );
};

export default MultiStepDisplay;


