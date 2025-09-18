import React, { useState } from 'react';

const Liste = ({ value, onChange, role }) => {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (index) => {
    if (activeButton === index) {
      setActiveButton(null);
    } else {
      setActiveButton(index);
    }
  };

  const handleAnimalClick = (animal) => {
    const newValue = value === animal ? null : animal;
    onChange(newValue); 
  };

  const renderDropdown = (index) => {
    const categories = [
      {
        label: 'Mammifères',
        animals: ['Chien', 'Chat', 'Lapin']
      },
      {
        label: 'Poissons',
        animals: ['Poisson rouge', 'Betta', 'Guppy']
      },
      {
        label: 'Oiseaux',
        animals: ['Perroquet', 'Canari', 'Pigeon']
      },
      {
        label: 'Reptiles',
        animals: ['Tortue', 'Serpent', 'Gecko']
      }
    ];

    const category = categories[index];

    return (
      <div>
      <h2>Que cherchez-vous ?</h2>
      <ul className="dropdown-list">
        <h3>{category.label}</h3>
        {category.animals.map((animal, i) => (
          <li key={i}>
            <button
              onClick={() => handleAnimalClick(animal)}
              className={value === animal ? 'selected' : ''}
            >
              {animal}
            </button>
          </li>
        ))}
      </ul>
      </div>
    );
  };

  return (
    <div className="box">
      <div className="button-box">
        {['Mammifères', 'Poissons', 'Oiseaux', 'Reptiles'].map((label, index) => {
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`category-button ${activeButton === index ? 'active' : ''}`}
              style={{
                display: activeButton === null || activeButton === index ? 'inline-block' : 'none',
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {activeButton !== null && renderDropdown(activeButton)}
    </div>
  );
};

export default Liste;
