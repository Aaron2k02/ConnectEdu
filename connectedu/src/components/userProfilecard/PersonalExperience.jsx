import React, { useState } from "react"
import FormInput from "../../pages/register/featured/FormInput"
import "./AccountSettings.scss"
import { useNavigate } from 'react-router-dom';
import newRequest from "../../utils/newRequest";

const PersonalExperience = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    skills:"", 
    professionalExperience:'', 
    educationalBackground:''

  })

  const inputs = [
    {
      id: 1,
      name: "EducationalBackground",
      type: "text",
      placeholder: "Educational Background",
      errorMessage: "Enter your education level",
      label: "Educational Background",
      required: true
    },
    {
      id: 2,
      name: "Professional Experience",
      type: "text",
      placeholder: "Previous Teaching Experience (if any)",
      label: "Professional Experience",
   
    },
    {
      id: 3,
      name: "Skills and Qualifications",
      type: "text",
      placeholder: "Skills and Qualifications",
      label: "Skills and Qualifications",
   
    },
    
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = currentUser._id;

    try {
      await newRequest.put(`/auth/profile/${userId}`, {
        skills:values.skills, 
        qualifications:values.skills, 
        professionalExperience:values.professionalExperience, 
        educationalBackground:values.educationalBackground
       
      });
      setMessage('Profile updated successfully');

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
      <h1 className='mainHead1'>Personal Experience</h1>
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput key={input.id}{...input} value={values[input.name]} onChange={onChange} />
        ))}
        {message && <p>{message}</p>}
        <button>Save changes</button>
      </form>

    </div>
  )
}

export default PersonalExperience
