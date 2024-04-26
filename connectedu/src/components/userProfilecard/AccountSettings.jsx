import React, { useState } from "react"
import FormInput from "../../pages/register/featured/FormInput"
import "./AccountSettings.scss"

const AccountSettings = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
    phoneNo: "",
  })

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      required: true,
      autoComplete: "username", // Add autoComplete attribute
    },
    {
      id: 2,
      name: "fullname",
      type: "text",
      placeholder: "Full name",
      label: "Full name",
      required: true,
      autoComplete: "name", // Add autoComplete attribute
    },
    {
      id: 3,
      name: "email",
      type: "email", // Corrected to "email" type
      placeholder: "Email",
      label: "Email",
      required: true,
      autoComplete: "email", // Add autoComplete attribute
    },
    {
      id: 4,
      name: "phoneNo",
      type: "tel", // Corrected to "tel" type
      placeholder: "Mobile Phone",
      label: "Phone/Mobile",
      required: true,
      autoComplete: "tel", // Add autoComplete attribute
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <div className='accountSettings'>
      <h1 className='mainHead1'>Personal Information</h1>
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
        ))}
        <button type="submit">Save changes</button>
      </form>
    </div>
  )
}

export default AccountSettings
