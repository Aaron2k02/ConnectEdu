import React from 'react'
import './userSidebar.scss'
import { Link } from 'react-router-dom';

const UserSidebar = ({activePage}) => {
  return (
    <div className='usersSidebar'>
    {
      activePage === 'accountSettings' ?
        <div className='s2'>
          <span>Account Settings</span>
        </div>
        :
        <Link
          to='/users/accountSettings'
          className='link'

        >
          <div className='s1'>
            <span>Account Settings</span>
          </div>
        </Link>
    }


    {
      activePage === 'changepassword' ?
        <div className='s2'>
          <span>Change Password</span>
        </div>

        :
        <Link
          to='/users/changepassword' className='link'>
          <div className='s1'>
            <span>Change Password</span>
          </div>
        </Link>
    }

    

  </div>
  )
}

export default UserSidebar
