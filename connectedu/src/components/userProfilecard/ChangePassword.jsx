import React, {  useState } from "react"
import FormInput from "../../pages/register/featured/FormInput"
import './AccountSettings.scss'

const ChangePassword = () => {

    const [values,setValues] = useState({
        username:"",
        email:"",
        password:"",
        
      })
    
      const inputs=[
        {
          id:1,
          name:"currentPassword",
          type:"password",
          placeholder:"Current Password",
          label:"Current Password",
          required:true
        },
        {
          id:2,
          name:"newPassword",
          type:"password",
          placeholder:"New Password",
          label:"New Password",
          required:true
        },
        
       
      ]
    
    
      const handleSubmit=(e)=>{
        e.preventDefault();
        
      }
    
      const onChange =(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
      }
      
     return (
        <div className='accountSettings'>
            <h1 className='mainhead1'>Change Password</h1>

            <form onSubmit={handleSubmit}>
            {inputs.map((input)=>(
              <FormInput key={input.id}{...input} value={values[input.name]} onChange={onChange} />
            ))}
           

            
            <button>Save changes</button>
          </form>
        </div>
  )
}

export default ChangePassword
