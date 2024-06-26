
import "./formInput.scss"
import React, { useEffect, useState } from "react"

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);

  const { label, errorMessage, onChange, id, disabled, autoComplete, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  }

  return (
    <div className="formInput">
      <div className="container">
        <label htmlFor={id}>{label}</label>
        <input
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          onFocus={() =>
            inputProps.name == "confirmPassword" && setFocused(true)}
          focused={focused.toString()}
          disabled={disabled}
          autoComplete={autoComplete} // Add the autocomplete attribute
          id={id}
        />
        <span>{errorMessage}</span>
      </div>
    </div>
  );
};

export default FormInput