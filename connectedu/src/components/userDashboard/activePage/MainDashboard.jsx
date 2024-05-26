import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PopularCard from '../../popularCard/PopularCard';
import newRequest from '../../../utils/newRequest';
import './MainDashboard.scss';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LearningCard from '../../learningCard/LearningCard';

const MainDashboard = () => {

    const purchasedCourses = useQuery({
        queryKey: ["purchasedCourses"],
        queryFn: () => newRequest.get(`/orders/purchasedCourses`).then((res) => res.data),
    });

    const popularCourses = useQuery({
        queryKey: ['courses'],
        queryFn: () => newRequest.get(`/courses`).then((res) => res.data),
    });

    const navigate = useNavigate()

    const joinUs = () => {
        navigate('/educatorRegister');
    };

    var settings = {
        accessibility: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    if (purchasedCourses.isFetching || popularCourses.isFetching) return <div>Loading...</div>;
    if (purchasedCourses.error || popularCourses.error) return <div>Something went wrong!</div>;

    return (
        <div className='mainDash'>
            <div className='container'>
                <div className='PopularDash'>
                    <h2>Popular Course</h2>
                    <div>
                        {popularCourses.data.length > 1 ? (
                            <Slider {...settings}>
                                {popularCourses.data.map((course, index) => (
                                    <PopularCard key={index} item={course} />
                                ))}
                            </Slider>
                        ) : (
                            popularCourses.data.map((course, index) => (
                                <PopularCard key={index} item={course} />
                            ))
                        )}
                    </div>
                </div>
                <hr className='custom-hr' />
                <div className='LearningDash'>
                    <div className='learninghead'>
                        <h2>Learning</h2>
                        <Link className='view' to='/dashboard/MyLearning'><span>View all</span>
                            <ArrowForwardOutlinedIcon />
                        </Link>
                    </div>
                    <div className='desc'>
                        <span>Unlock your potential, keep learning! Dive deeper into your lessons today</span>
                    </div>
                    <div className='courseEnroll'>
                        {purchasedCourses.data.map((course, index) => (
                            <LearningCard key={index} item={course} />
                        ))}
                    </div>
                </div>
                <hr className='custom-hr' />
                <div className='qnaDash'>
                    <h2>Join Us Now!</h2>
                    <div className='qnaBox'>
                        <div className='qnaLine'>
                            <h3>Transform passion into purpose!</h3>
                            <span>Take the leap and become an educator with us</span>
                        </div>
                        <button onClick={joinUs}>Join us</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainDashboard;
