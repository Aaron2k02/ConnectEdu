import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import FormInput from './featured/FormInput';
import "./register.scss";
import React, { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: ""
  });
  const [error, setError] = useState("");

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email!",
      label: "Email",
      required: true
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 8-12 characters and include 1 letter, 1 number, and 1 special character",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPass",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Password does not match",
      label: "Confirm Password",
      required: true
    },
  ];

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPass) {
      setError("Passwords do not match");
      return;
    }
    try {
      // Check if the user already exists
      const existingUserResponse = await newRequest.post("/auth/check-user", {
        email: user.email,
        username: user.username
      });

      if (existingUserResponse.data.exists) {
        // Redirect to login if user already exists
        navigate("/login");
        return;
      }

      // If user doesn't exist, proceed with registration
      await newRequest.post("/auth/register", {
        username: user.username,
        email: user.email,
        password: user.password,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className='register'>
      <div className="container">
        <div className="left">
          <form onSubmit={handleSubmit}>
            <h1>Register an account</h1>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={user[input.name]}
                onChange={onChange}
                autoComplete="off"
              />
            ))}
            {error && <p className="error">{error}</p>}
            <div className='Login'>
              Already have an account? <a href='/login' className='link'>Login</a>
            </div>
            <button>Submit</button>
          </form>
        </div>
        <div className="right">
          <img src={"/images/ConnectEduLogo-bg.png"} alt="ConnectEdu Logo" />
        </div>
      </div>
    </div>
  );
};

export default Register;
