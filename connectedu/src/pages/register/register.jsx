
import FormInput from './featured/FormInput'
import "./register.scss"
import React, {  useState } from "react"


const Register = () => {
  const [values,setValues] = useState({
    username:"",
    email:"",
    password:"",
    confirmPass:"",
  })

  const inputs=[
    {
      id:1,
      name:"username",
      type:"text",
      placeholder:"Username",
      errorMessage:"Username should be 3-16 characters and shouldn't include any special character!",
      label:"Username",
      pattern:"^[A-Za-z0-9]{3,16}$",
      required:true
    },
    {
      id:2,
      name:"email",
      type:"email",
      placeholder:"Email",
      errorMessage:"It should be a valid email!",
      label:"Email",
      required:true
    },
    {
      id:3,
      name:"password",
      type:"password",
      placeholder:"Password",
      errorMessage:"Password should be 8-12 charcters and include 1 letter, 1 number and 1 special character",
      label:"Password",
      pattern:`^(?=.*[0-9])(?-.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z)-9!@#$%^&*](8,20)$`,
      required:true,
    },
    {
      id:1,
      name:"confirmPAss",
      type:"password",
      placeholder:"Confirm Password",
      errorMessage:"Password is not a match",
      label:"Confirm Password",
      required:true
    },
  ]


  const handleSubmit=(e)=>{
    e.preventDefault();
    const data = new FormData(e.target)
  }

  const onChange =(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  }
  return (
    <div className='register'>
      <div className="container">
        <div className="left">
          <form onSubmit={handleSubmit}>
            <h1>Register an account</h1>
            {inputs.map((input)=>(
              <FormInput key={input.id}{...input} value={values[input.name]} onChange={onChange} />
            ))}
            <div className='Login'>
              Already have an account? <a href='/login'>Login</a>
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