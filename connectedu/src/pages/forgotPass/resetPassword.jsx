import React, {  useState } from "react"
import "./ForgotPass.scss"
import FormInput from "../register/featured/FormInput"

const ResetPassword = () => {

  const [values,setValues] = useState({
    username:"",
    email:"",
    password:"",
    
  })

  const inputs=[
    {
      id:1,
      name:"newPassword",
      type:"password",
      placeholder:"New Password",
      label:"New Password",
      required:true
    },
    
    {
      id:2,
      name:"confirmPassword",
      type:"password",
      placeholder:"Re-enter Password",
      label:"Re-enter Password",
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
    <div className='forgotPass'>
      <div className='container'>
        <div className='left'>
          <form action="">
            <h1>Reset Password</h1>
            <h4>Your previous password has been reseted</h4>
            <div className='resetPass'>
            
            {inputs.map((input)=>(
              <FormInput key={input.id}{...input} value={values[input.name]} onChange={onChange} />
            ))}
            </div>
           <button>Set Password</button>
          </form>
        </div>
        <div className='right'>
          <img src={"/images/ConnectEduLogo-bg.png"} />
        </div>
      
      </div>
      
      
    </div>
  )
}

export default ResetPassword
