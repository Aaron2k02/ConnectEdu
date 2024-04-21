
import FormInput from './featured/FormInput'
import "./register.scss"
import React, { useState } from "react"


const EducatorRegister = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  })

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email!",
      label: "Email",
      required: true
    },
    {
      id: 3,
      name: "EducationalBackground",
      type: "text",
      placeholder: "Educational Background",
      errorMessage: "Enter your education level",
      label: "Educational Background",
      required: true
    },
    {
      id: 4,
      name: "Professional Experience",
      type: "text",
      placeholder: "Previous Teaching Experience (if any)",
      label: "Professional Experience",
   
    },
    {
      id: 5,
      name: "Skills and Qualifications",
      type: "text",
      placeholder: "Skills and Qualifications",
      label: "Skills and Qualifications",
   
    },
    
  ]


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target)
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className='register'>
      <div className="container">
        <div className="left">
          <form onSubmit={handleSubmit}>
            <h1>Empower Minds, Shape Futures:</h1>
            <h2> Join us as an educator</h2>
            {inputs.map((input) => (
              <FormInput key={input.id}{...input} value={values[input.name]} onChange={onChange} />
            ))}
            {/* <div className="checkbox-container">
                <label>
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
                <span className="checkbox-text">I would like to become an EDUCATOR</span></label>
                </div> */}
            {/* <div className='Login'>
              Already have an account? <a href='/login' className='link'>Login</a>
            </div> */}
            <button>Submit</button>
          </form>
        </div>
        <div className="right">
          <img src={"/images/ConnectEduLogo-bg.png"} />
        </div>
      </div>
    </div>
  )
}

export default EducatorRegister 