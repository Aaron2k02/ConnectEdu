import React, { useState } from "react"
import FormInput from "../../pages/register/featured/FormInput"
import "./AccountSettings.scss"

const PersonalExperience = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",

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


  const handleSubmit = (e) => {
    e.preventDefault();

  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  return (
    <div className='accountSettings'>
      <h1 className='mainHead1'>Personal Experience</h1>


      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput key={input.id}{...input} value={values[input.name]} onChange={onChange} />
        ))}



        <button>Save changes</button>
      </form>

    </div>
  )
}

export default PersonalExperience
