import React, { useState } from "react"
import FormInput from "../../pages/register/featured/FormInput"
import "./AccountSettings.scss"

import newRequest from "../../utils/newRequest";

const PersonalExperience = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
 
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    qualifications:currentUser.profile.qualifications, 
    professionalExperience:currentUser.profile.professionalExperience, 
    educationalBackground:currentUser.profile.educationalBackground

  })

  const inputs = [
    {
      id: 1,
      name: "educationalBackground",
      type: "text",
      placeholder: "Educational Background",
      errorMessage: "Enter your education level",
      label: "Educational Background",
      required: true
    },
    {
      id: 2,
      name: "professionalExperience",
      type: "text",
      placeholder: "Previous Teaching Experience (if any)",
      label: "Professional Experience",
   
    },
    {
      id: 3,
      name: "qualifications",
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
       
        qualifications:values.qualifications, 
        professionalExperience:values.professionalExperience, 
        educationalBackground:values.educationalBackground
       
      });
      setMessage('Profile updated successfully');


     

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
