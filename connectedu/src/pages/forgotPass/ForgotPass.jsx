import React from 'react'
import "./ForgotPass.scss"

const ForgotPass = () => {
  return (
    <div className='forgotPass'>
      <div className='container'>
        <div className='left'>
          <form action="">
            <h1>Forgot Password?</h1>
            <div className='input-box'>
              <input type="email" placeholder=' Email address' required />
            </div>

            <button><a href='/forgotPassword/verifyOTP' className="link">Submit</a></button>
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
