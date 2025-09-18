import React from 'react';

function Input({ type, placeholder, label, value, onChange }) {
  return (
    <div className="form__group field">
      <input
        type={type}
        placeholder={placeholder}
        id={type}
        name={type}
        value={value}
        onChange={onChange}
        required
      />
      <label htmlFor={type} className="form__label">{label}</label>
    </div>
  );
}

export default Input;
