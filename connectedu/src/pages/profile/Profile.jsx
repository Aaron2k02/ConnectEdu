import React from 'react'
import "./Profile.scss"
import UserSidebar from '../../components/userProfilecard/UserSidebar'
import AccountSettings from '../../components/userProfilecard/AccountSettings'
import { useParams } from 'react-router-dom'
import ChangePassword from '../../components/userProfilecard/ChangePassword'
import PersonalExperience from '../../components/userProfilecard/PersonalExperience'

const Profile = () => {

  const { activePage } = useParams()
  // alert(activePage)
  return (
    <div className='userProfile'>
      <h1>User Profile</h1>
      <div className='inUserProfile'>

        <div className='left'>
          <UserSidebar activePage={activePage} />
        </div>

        <div className='right'>
          {activePage === 'accountSettings' && <AccountSettings />}
          {activePage === 'changepassword' && <ChangePassword />}
          {activePage==='personalexperience' && <PersonalExperience/>}
        </div>
      </div>
    </div>
  )
}

export default Profile
