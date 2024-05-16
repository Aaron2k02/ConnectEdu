import React, { useState } from "react";
import FormInput from "../register/featured/FormInput";
import { useNavigate } from 'react-router-dom';
import { users } from "../../data/userData"; // Import the JSON data
import "./login.scss";

const Login = ({ handleLogin }) => {
  //backend
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  const fields = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      required: true,
      onChange: (e) => setUserName(e.target.value)
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
      onChange: (e) => setPassword(e.target.value)
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
      onChange: (e) => setPassword(e.target.value)
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (matchedUser) {
      handleLogin(matchedUser);
      navigate("/");
    } else {
      if (!username || !password) {
        alert("Please fill in all fields");
      } else {
        alert("Incorrect username or password");
      }
    }
  };

  return (
    <div className='login'>
      <div className="container">
        <div className="left">
          <form onSubmit={handleSubmit}>
            <div className="welcome-container">
              <h1>Welcome back!</h1>
              <img src={"/images/ConnectEduLogo-bg.png"} className="welcome-image" alt="ConnectEdu Logo" />
            </div>
            <h2>We miss you!</h2>
            {fields.map((field) => (
              <FormInput
                key={field.id}
                {...field}
                value={field.name === "username" ? username : password}
                autoComplete="off"
              />
            ))}
            <div>
              <a href="/forgotPassword" className="link">Forgot Password?</a>
            </div>
            <button>Login</button>
            <div className="register-link">
              Don't have an account? <a href="/signin" className="link">Register</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
