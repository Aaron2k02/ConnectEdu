import React from 'react'
import './StudentDash.scss'

import { useParams } from 'react-router-dom'
import DashboardSidebar from '../../components/userDashboard/DashboardSidebar'
import MainDashboard from '../../components/userDashboard/activePage/MainDashboard'
import LearningPage from '../../components/userDashboard/activePage/LearningPage'





const StudentDashboard = () => {

  const { activePage } = useParams()
  // alert(activePage)
  return (
    <div className='userDashboard'>
      
      <div className='inUserDashboard'>

        <div className='left'>
          <DashboardSidebar activePage={activePage}/>
        </div>
        <div className='center'>
          {activePage === 'MainDashboard' && <MainDashboard/>}
          {activePage=== 'MyLearning'&& <LearningPage/>}
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard