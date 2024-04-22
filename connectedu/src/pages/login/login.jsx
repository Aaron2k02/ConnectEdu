import React, { useState } from "react";
import FormInput from "../register/featured/FormInput";
import { useNavigate } from 'react-router-dom';
import { users } from "../../data/userData"; // Import the JSON data
import "./login.scss";

const Login = ({ handleLogin }) => {

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  let navigate = useNavigate();

  const fields = [
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
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Find user with matching username, email, and password
    const matchedUser = users.find(
      (u) =>
        u.username === user.username &&
        u.email === user.email &&
        u.password === user.password
    );
    if (matchedUser) {
      // Call handleLogin function with the matched user object
      handleLogin(matchedUser);
      // Navigate to home page after successful login
      navigate("/");
    } else {
      // Handle invalid credentials
      if (!user.username || !user.email || !user.password) {
        alert("Please fill in all fields");
      } else {
        alert("Incorrect username, email, or password");
      }
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className='login'>
      <div className="container">
        <div className="left">
          <form onSubmit={handleSubmit}>
            <div className="welcome-container">
              <h1>Welcome back!</h1>
              <img src={"/images/ConnectEduLogo-bg.png"} className="welcome-image" />
            </div>
            <h2>We miss you!</h2>
            {fields.map((field) => (
              <FormInput key={field.id}{...field} value={user[field.name]} onChange={onChange} />
            ))}
            <div>
              <a href="/forgotPassword" className="link">Forgot Password?</a>
            </div>
            <button>Login</button>
            <div className="register-link">
              Dont have an account? <a href="/signin" className="link">Register</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
