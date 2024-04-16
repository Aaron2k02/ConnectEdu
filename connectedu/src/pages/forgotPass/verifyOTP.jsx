import React from 'react'
import "./ForgotPass.scss"

const VerifyOTP = () => {
  return (
    <div className='forgotPass'>
      <div className='container'>
        <div className='left'>
          <form action="">
            <h1>Verify OTP</h1>
            <h4>An authentication code has been sent to your email</h4>
            <div className='input-box'>
            
            <input type="text" placeholder='Enter code' required />
            </div>
            <button><a href='/forgotPassword/resetPass' className="link">Verify</a></button>
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
