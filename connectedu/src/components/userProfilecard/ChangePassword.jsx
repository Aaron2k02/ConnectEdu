import React, {  useState,useEffect } from "react"
import FormInput from "../../pages/register/featured/FormInput"
import './AccountSettings.scss'
import { useNavigate } from 'react-router-dom';
import newRequest from "../../utils/newRequest";

const ChangePassword = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const [values,setValues] = useState({
       
        currentPassword:"",
        newPassword:"",
        
      });
      const [message, setMessage] = useState("");
      let navigate = useNavigate();
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


      const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = currentUser._id;
    
        try {
          await newRequest.post(`/auth/change-password/${userId}`, {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          });
    
          navigate("/");
    
        } catch (err) {
          setMessage(err.response.data.message);
        }
      };
    
      const onChange =(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
      };

     return (
        <div className='accountSettings'>
            <h1 className='mainhead1'>Change Password</h1>

            <form onSubmit={handleSubmit}>
            {inputs.map((input)=>(
              <FormInput key={input.id}{...input} value={values[input.name]} onChange={onChange} />
            ))}
             {message && <p>{message}</p>}
            <button>Save changes</button>
          </form>
        </div>
  )
}

export default ChangePassword
