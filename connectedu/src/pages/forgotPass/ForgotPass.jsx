import React ,{ useState } from 'react'
import "./ForgotPass.scss"
import { useNavigate } from 'react-router-dom';
import newRequest from "../../utils/newRequest";


const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

    let navigate = useNavigate();
    const handleChange = (event) => {
      setEmail(event.target.value);
    };
  

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        await newRequest.post("/otp/forgotPassword", {
          email,
        });

        navigate("/forgotPassword/verifyOTP", { state: { email } });

      } catch (err) {
        setMessage(err.response.data.message);
      }
    };
    
     
  return (
    <div className='forgotPass'>
      <div className='container'>
        <div className='left'>
          <form onSubmit={handleSubmit}>
            <h1>Forgot Password?</h1>
            <div className='input-box'>
              <input onChange={handleChange} type="email" name="email" placeholder='Email address' required autoComplete='off'/>
            </div>
            {message && <p>{message}</p>}
            <button>Submit</button>
          </form>
          
        </div>
        <div className='right'>
          <img src={"/images/ConnectEduLogo-bg.png"} />
        </div>
      </div>
    </div>
  )
}

export default ForgotPass
