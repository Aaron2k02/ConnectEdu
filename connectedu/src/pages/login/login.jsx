import React, { useState } from "react";
import FormInput from "../register/featured/FormInput";
import { useNavigate } from 'react-router-dom';
import "./login.scss";
import newRequest from "../../utils/newRequest";

const Login = ({ handleLogin }) => {
  //backend
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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
      onChange: (e) => setEmail(e.target.value)
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(username);
    // console.log(email);
    // console.log(password);

    try {
      const res = await newRequest.post("/auth/login", {
        username,
        password,
        email,
      });
      
      const { userInfo, userProfile } = res.data;

      localStorage.setItem("currentUser", JSON.stringify(userInfo));
      localStorage.setItem("userProfile", JSON.stringify(userProfile));

      // Handle successful login
      handleLogin(JSON.stringify(res.data));

      // Navigate to home page after successful login
      navigate("/");
      
    } catch (err) {
      setError(err.response.data);
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
                value={field.name === "username" ? username : field.name === "email" ? email : password}
                autoComplete="off"
              />
            ))}
            <div>
              <a href="/forgotPassword" className="link">Forgot Password?</a>
            </div>
            <button>Login</button>
            { error && error}
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
