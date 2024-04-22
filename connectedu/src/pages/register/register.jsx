
import FormInput from './featured/FormInput'
import "./register.scss"
import React, { useState } from "react"


const Register = () => {

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
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 8-12 characters and include 1 letter, 1 number, and 1 special character",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPass",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Password does not match",
      label: "Confirm Password",
      required: true
    },
  ];

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <div className='register'>
      <div className="container">
        <div className="left">
          <form onSubmit={handleSubmit}>
            <h1>Register an account</h1>
            {inputs.map((input) => (
              <div key={input.id} className="form-group">
                <FormInput
                  label={input.label}
                  errorMessage={input.errorMessage}
                  id={input.name} // Assign input name as id
                  type={input.type}
                  placeholder={input.placeholder}
                  value={values[input.name]}
                  onChange={handleChange}
                  name={input.name}
                />
              </div>
            ))}
            <div className='Login'>
              Already have an account? <a href='/login' className='link'>Login</a>
            </div>
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

export default Register