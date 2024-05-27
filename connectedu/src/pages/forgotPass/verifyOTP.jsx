import React, { useState }from 'react'
import "./ForgotPass.scss"
import { useNavigate } from 'react-router-dom';
import newRequest from "../../utils/newRequest";
import { useLocation } from 'react-router-dom';


const VerifyOTP = () => {
  const {state} = useLocation();
  const { email } = state;
 
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');

    let navigate = useNavigate();
    const handleChange = (event) => {
      setOTP(event.target.value);
    };
  

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        await newRequest.post("/otp/forgotPassword/verify", {
          email,otp
        });

        navigate("/forgotPassword/resetPass",{ state: { email } });

      } catch (err) {
        setMessage(err.response.data.message);
      }
    };


  return (
    <div className='forgotPass'>
      <div className='container'>
        <div className='left'>
          <form onSubmit={handleSubmit}>
            <h1>Verify OTP</h1>
            <h4>An authentication code has been sent to your email</h4>
            <div className='input-box'>
              <input onChange={handleChange} id="otpCode" type="text" placeholder='Enter code' required />
            </div>
            <button>Verify</button>
            {message && <p>{message}</p>}
          </form>
        </div>
        <div className='right'>
          <img src={"/images/ConnectEduLogo-bg.png"} />
        </div>

      </div>


    </div>
  )
}

export default VerifyOTP
