import FormInput from './featured/FormInput'
import "./educatorRegister.scss"
import React, { useState } from "react"

import newRequest from "../../utils/newRequest";

const EducatorRegister = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    username: currentUser.username,
    email: currentUser.email,
    educationalBackground: currentUser.profile.educationalBackground,
    professionalExperience: currentUser.profile.professionalExperience,
    skillsAndQualifications: currentUser.profile.qualifications,
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
      required: true,
      autoComplete: "username", // Add autoComplete attribute
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email!",
      label: "Email",
      required: true,
      autoComplete: "email", // Add autoComplete attribute
    },
    {
      id: 3,
      name: "educationalBackground",
      type: "text",
      placeholder: "Educational Background",
      errorMessage: "Enter your education level",
      label: "Educational Background",
      required: true,
      autoComplete: "education", // Add autoComplete attribute
    },
    {
      id: 4,
      name: "professionalExperience",
      type: "text",
      placeholder: "Previous Teaching Experience (if any)",
      label: "Professional Experience",
      autoComplete: "experience", // Add autoComplete attribute
    },
    {
      id: 5,
      name: "qualification",
      type: "text",
      placeholder: "Skills and Qualifications",
      label: "Skills and Qualifications",
      autoComplete: "qualification", // Add autoComplete attribute
    },
  ]



  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = currentUser._id;

    setMessage('');

    // Validate email and username before making the API call
    if (values.email !== currentUser.email) {
        setMessage('Wrong email');
        return; // Exit the function if email is wrong
    }

    if (values.username !== currentUser.username) {
        setMessage('Wrong username');
        return; // Exit the function if username is wrong
    }
    try {
      const response = await newRequest.put(`/users/register-educator/${userId}`, {
        email: values.email,
        username: values.username,
        qualifications: values.qualification, 
        professionalExperience: values.professionalExperience, 
        educationalBackground: values.educationalBackground
      });
      if (response.status === 200) {
        setMessage('Profile updated successfully');
      } else {
        setMessage('Failed to update profile');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'An error occurred');
    }
  };

  const onChange =(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  };
  return (
    <div className='educatorRegister'>
      <div className="container">
        <div className="left">
          <div className='header'>
            <div>
              <h1>Empower Minds, Shape Futures:</h1>
              <h2> Join us as an educator</h2>
            </div>
            <div>
              <img src={"/images/ConnectEduLogo-bg.png"} alt="ConnectEdu Logo" />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
            ))}
             {message && <p>{message}</p>}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EducatorRegister
