
import "./formInput.scss"
import React, { useEffect, useState } from "react"

const FormInput = (props) => {
  const [focused,setFocused] = useState(false);

  const {label,errorMessage,onChange,id,disabled,...inputProps} =props;

  const handleFocus = (e) =>{
    setFocused(true);
  }
  return (
    <div className="formInput">
      <div className="container">
        <label>{label}</label>
        <input {...inputProps} onChange={onChange}  
        onBlur={handleFocus} 
        onFocus={()=>
        inputProps.name=="confirmPassword" && setFocused(true)}
        focused={focused.toString()}
        disabled={disabled} />
        <span>{errorMessage}</span>
      </div>
    </div>
  );
};

export default FormInput
