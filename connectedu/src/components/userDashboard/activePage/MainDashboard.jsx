import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PopularCard from '../../popularCard/PopularCard';
import LearningCard from '../../learningCard/LearningCard';
import { courses } from '../../../data/coursesData';
import './MainDashboard.scss'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { Link } from 'react-router-dom';
const MainDashboard = () => {

    const courseEnroll=[
        {
            title:'Web Development',
            img:"https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1600",
        }
    ]
    var settings = {
        accessibility: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,


    };


    return (
        <div className='mainDash'>
            <div className='container'>

                <div className='PopularDash'>
                    <h2>Popular Course</h2>
                    <div>
                        <Slider {...settings}>
                            {courses.map((course) => (
                                <PopularCard key={course.id} item={course} />
                            ))
                            }

                        </Slider>
                    </div>
                </div>
                <hr className='custom-hr'/>
                <div className='LearningDash'>
                    <div className='learninghead'>
                        <h2>Learning</h2>
                        
                          <Link className='view' to='/dashboard/MyLearning'><span>View all</span>
                          <ArrowForwardOutlinedIcon/>
                          </Link>
                          
                        
                        
                    </div>
                    <div className='desc'>
                        <span>Unlock your potential, keep learning! Dive deeper into your lessons today</span>
                    </div>
                    
                    
                    {courseEnroll.length > 0 ? (<div className='courseEnroll' >
                        {courseEnroll.slice(0, 4).map((course) => (
                        <LearningCard key={course.id} item={course} />
                        ))}
                        </div>) : (
                        <p>You haven't enrolled in any classes yet.</p> )}
                    </div>

                <hr className='custom-hr'/>
                

                <div className='qnaDash'>
                    <h2>Join Us Now!</h2>
                    <div className='qnaBox'>
                      <div className='qnaLine'>
                      <h3>Transform passion into purpose!</h3>
                      <span>Take the leap and become an educator with us</span>
                      </div>
                        
                        <button>Join us</button>
                    </div>

                </div>


            </div>

        </div>
    )
}

export default MainDashboard
