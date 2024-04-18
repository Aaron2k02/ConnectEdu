import React, { useState } from "react"
import FormInput from "../../pages/register/featured/FormInput"
import "./AccountSettings.scss"

const AccountSettings = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",

  })

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      required: true
    },
    {
      id: 2,
      name: "fullname",
      type: "text",
      placeholder: "Full name",
      label: "Full name",
      required: true
    },

    {
      id: 3,
      name: "email",
      type: "Email",
      placeholder: "Email",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "phoneNo",
      type: "text",
      placeholder: "Mobile Phone",
      label: "Phone/Mobile",
      required: true,
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
      <h1 className='mainHead1'>Personal Information</h1>


      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput key={input.id}{...input} value={values[input.name]} onChange={onChange} />
        ))}



        <button>Save changes</button>
      </form>

    </div>
  )
}

export default AccountSettings
