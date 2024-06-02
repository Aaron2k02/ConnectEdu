import React, { useState } from "react";
import FormInput from "../../pages/register/featured/FormInput";
import './AccountSettings.scss';
import { useNavigate } from 'react-router-dom';
import getCurrentUser from "../../utils/getCurrentUser";
import { changePassword, validateCurrentPassword } from "../../utils/updateCurrentUser";

const ChangePassword = () => {
  const currentUser = getCurrentUser();
  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isCurrentPasswordValid, setCurrentPasswordValid] = useState(true);
  let navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "currentPassword",
      type: "password",
      placeholder: "Current Password",
      label: "Current Password",
      required: true,
    },
    {
      id: 2,
      name: "newPassword",
      type: "password",
      placeholder: "New Password",
      label: "New Password",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isPasswordValid = await validateCurrentPassword(values.currentPassword); // Validate current password
    if (!isPasswordValid) {
      setCurrentPasswordValid(false);
      return;
    }

    const userId = currentUser._id;

    try {
      const res = await changePassword({ // Use the changePassword function to update the password
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      setMessage("Password changed successfully!");

      setTimeout(() => {
        setCurrentPasswordValid(true);
        setMessage(""); // Clear message after a delay
      }, 3000); // Set delay duration in milliseconds

    } catch (err) {

      setMessage(err.response.data.message);

    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className='accountSettings'>
      <h1 className='mainHead1'>Change Password</h1>
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        {!isCurrentPasswordValid && (
          <p style={{ color: "red" }}>Current password is incorrect!</p>
        )}
        {message && <p>{message}</p>}
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
};

export default ChangePassword;
