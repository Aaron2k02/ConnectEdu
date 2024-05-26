import React, { useState } from "react"
import FormInput from "../../pages/register/featured/FormInput"
import "./AccountSettings.scss"

import newRequest from "../../utils/newRequest";

const AccountSettings = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    username: currentUser.username,
    email: currentUser.email,
    fullName: currentUser.fullName,
    phoneNumber: currentUser.phoneNumber,
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
      name: "fullName",
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
      name: "phoneNumber",
      type: "tel", // Corrected to "tel" type
      placeholder: "Mobile Phone",
      label: "Phone/Mobile",
      required: true,
      autoComplete: "tel", // Add autoComplete attribute
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = currentUser._id;

    try {
      await newRequest.put(`/auth/personal-info/${userId}`, {
        username: values.username,
        email: values.email,
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
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
      <h1 className='mainHead1'>Personal Information</h1>
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
        ))}
         {message && <p>{message}</p>}
        <button type="submit">Save changes</button>
      </form>
    </div>
  )
}

export default AccountSettings
