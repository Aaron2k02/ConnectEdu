import React from 'react'
import './LearningPage.scss'

import LearnCard from '../../learningCard/LearnCard'



const LearningPage = () => {

    const courseEnroll=[
        {
            title:'Web Development',
            img:"https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1600",
        }
    ]
  return (
    <div className='learningPage'>
        <div className='container'>
            <div className='TopBar'>
                <h2>My Courses</h2>
            </div>

            <div className='enrollList'>
         
                    
                    
                    {courseEnroll.length > 0 ? (<div className='courseEnroll' >
                        {courseEnroll.slice(0, 4).map((course) => (
                        <LearnCard key={course.id} item={course} />
                        ))}
                        </div>) : (
                        <p>You haven't enrolled in any classes yet.</p> )}
                    

            </div>

        </div>
      
    </div>
  )
}

export default LearningPage
