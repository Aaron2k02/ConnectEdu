import React, { useState } from "react"
import "./ForgotPass.scss"
import FormInput from "../register/featured/FormInput"
import { useNavigate } from 'react-router-dom';
import newRequest from "../../utils/newRequest";
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const {state} = useLocation();
  const { email } = state;
  let navigate = useNavigate();

  const [values, setValues] = useState({
    email:email,
    newPassword: "",
    confirmPassword: ""

  })

  const [newPassword, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const inputs = [
    {
      id: 1,
      name: "newPassword",
      type: "password",
      placeholder: "New Password",
      label: "New Password",
      required: true
    },

    {
      id: 2,
      name: "confirmPassword",
      type: "password",
      placeholder: "Re-enter Password",
      label: "Re-enter Password",
      required: true,
    },

  ]
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await newRequest.post("/otp/forgotPassword/reset", {
        email,newPassword
      });

      navigate("/login");

    } catch (err) {
      setMessage(err.response.data.message);
    }
  };
  const handleChange = (event) => {
    setPassword(event.target.value);
    setConfirmPass(event.target.value)
  };

  // const onChange = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value })
  // }
  return (
    <div className='forgotPass'>
      <div className='container'>
        <div className='left'>
          <form onSubmit={handleSubmit}>
            <h1>Reset Password</h1>
            <h4>Your previous password has been reseted</h4>
            <div className='resetPass'>
            <div className='input-box'>
              <input onChange={handleChange} id="1" type="password" placeholder='New Password' required />
            </div>
            <div className='input-box'>
              <input onChange={handleChange} id="2" type="password" placeholder='Re-enter Password' required />
            </div>

              {/* {inputs.map((input) => (
                <FormInput key={input.id}{...input} value={values[input.name]} onChange={onChange} />
              ))} */}
              
            </div>
            <button>Set Password</button>
          </form>
        </div>
        <div className='right'>
          <img src={"/images/ConnectEduLogo-bg.png"} />
        </div>

      </div>


    </div>
  )
}

export default ResetPassword
