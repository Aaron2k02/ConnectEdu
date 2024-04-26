import React from 'react';
import './LearningPage.scss';
import LearnCard from '../../learningCard/LearnCard';

const LearningPage = () => {
    const courseEnroll = [
        {
            id: 1, // Add a unique identifier for each course
            title: 'Web Development',
            img: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1600",
        }
    ];

    return (
        <div className='learningPage'>
            <div className='container'>
                <div className='TopBar'>
                    <h2>My Courses</h2>
                </div>
                <div className='enrollList'>
                    {courseEnroll.length > 0 ? (
                        <div className='courseEnroll'>
                            <LearnCard key={courseEnroll[0].id} item={courseEnroll[0]} />
                        </div>
                    ) : (
                        <p>You haven't enrolled in any classes yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LearningPage;
