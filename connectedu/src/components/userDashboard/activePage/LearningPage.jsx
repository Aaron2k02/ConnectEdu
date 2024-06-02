import React from 'react';
import './LearningPage.scss';
import LearnCard from '../../learningCard/LearnCard';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../../utils/newRequest';

const LearningPage = () => {
    const { data: courses, isFetching, error } = useQuery({
        queryKey: ["purchasedCourses"],
        queryFn: () => newRequest.get(`/orders/purchasedCourses`).then((res) => res.data),
    });

    if (isFetching) return <div>Loading...</div>;
    if (error) return <div>Something went wrong!</div>;

    return (
        <div className='learningPage'>
            <div className='container'>
                <div className='TopBar'>
                    <h2>My Courses</h2>
                </div>
                <div className='enrollList'>
                    {courses && courses.length > 0 ? (
                        courses.map((course) => (
                            <div className='courseEnroll' key={course._id}>
                                <LearnCard item={course} />
                            </div>
                        ))
                    ) : (
                        <p>You haven't enrolled in any classes yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LearningPage;
