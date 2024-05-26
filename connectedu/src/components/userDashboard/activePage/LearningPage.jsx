import React from 'react';
import './LearningPage.scss';
import LearnCard from '../../learningCard/LearnCard';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../../utils/newRequest';

const LearningPage = () => {

    const purchasedCourses = useQuery({
        queryKey: ["purchasedCourses"],
        queryFn: () => newRequest.get(`/orders/purchasedCourses`).then((res) => res.data),
    });

    if (purchasedCourses.isFetching) return <div>Loading...</div>;
    if (purchasedCourses.error) return <div>Something went wrong!</div>;

    return (
        <div className='learningPage'>
            <div className='container'>
                <div className='TopBar'>
                    <h2>My Courses</h2>
                </div>
                <div className='enrollList'>
                    {purchasedCourses.data && purchasedCourses.data.length > 0 ? (
                        purchasedCourses.data.map((course) => (
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
