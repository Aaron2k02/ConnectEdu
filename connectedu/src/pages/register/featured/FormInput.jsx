
import "./formInput.scss"
import React, { useEffect, useState } from "react"

const FormInput = ({ label, errorMessage, name, disabled, onChange, id, ...inputProps }) => {

  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  }

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <div className="formInput">
      <div className="container">
        <label htmlFor={name}>{label}</label>
        <input
          {...inputProps}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          onBlur={handleBlur}
          onFocus={() =>
          inputProps.name == "confirmPassword" && setFocused(true)}
          focused={focused.toString()}
          disabled={disabled}
          id={name} 
          autoComplete="off" // Add the autocomplete attribute
        />
        <span>{errorMessage}</span>
      </div>
    </div>
  );
};

export default FormInput
