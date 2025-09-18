import React, { useState, useRef } from 'react';

function InputNumber({ length, values, onChange }) {
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const newValues = [...values];
    newValues[index] = e.target.value;
    onChange(newValues);

    if (e.target.value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '5px', flexDirection: 'row' }}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={values[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{ width: '2rem', textAlign: 'center' }}
          ref={(el) => (inputRefs.current[index] = el)}
        />
      ))}
    </div>
  );
}


export default InputNumber;
