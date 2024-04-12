import React, {  useState } from "react"
import FormInput from "../register/featured/FormInput"
import "./login.scss"

const Login = () => {
  const [values,setValues] = useState({
    username:"",
    email:"",
    password:"",
    
  })

  const inputs=[
    {
      id:1,
      name:"username",
      type:"text",
      placeholder:"Username",
      label:"Username",
      required:true
    },
    
    {
      id:2,
      name:"password",
      type:"password",
      placeholder:"Password",
      label:"Password",
      required:true,
    },
   
  ]


  const handleSubmit=(e)=>{
    e.preventDefault();
    
  }

  const onChange =(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  }
  return (
    <div className='login'>
      <div className="container">
        <div className="left">
          <form onSubmit={handleSubmit}>
            <div className="welcome-container">
              <h1>Welcome back!</h1>
              <img src={"/images/ConnectEduLogo-bg.png"}  className="welcome-image" />
            </div>
            <h2>We miss you!</h2>
            {inputs.map((input)=>(
              <FormInput key={input.id}{...input} value={values[input.name]} onChange={onChange} />
            ))}
           

            <div>
              <a href="/forgotPassword" className="link">Forgot Password?</a>
            </div>
            <button>Login</button>
            
            <div className="register-link">
              Dont have an account? <a href="/signin" className="link">Register</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login