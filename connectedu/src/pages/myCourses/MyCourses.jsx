import React from 'react';
import './MyCourses.scss';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const MyCourse = () => {
  let navigate = useNavigate();

  const viewCourse = (courseId) => {
    let path = `/viewCourse/${courseId}`;
    navigate(path);
  };

  const purchasedCoursesQuery = useQuery({
    queryKey: ["purchasedCourses"],
    queryFn: () => newRequest.get(`/orders/purchasedCourses`).then((res) => res.data),
  });

  if (purchasedCoursesQuery.isFetching) return <div>Loading...</div>;
  if (purchasedCoursesQuery.error) return <div>Something went wrong!</div>;

  return (
    <div className='myCourses'>
      <div className="container">
        <div className="title">
          <h1> My Learning </h1>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
            {purchasedCoursesQuery.data.map((course) => 
              <tr key={course._id}>
                <td>
                  <img src={course.thumbnailUrl[0]} alt="" />
                </td>
                <td className='courseTitle'>
                  {course.title.length > 30 ? course.title.substring(0, 30) + '...' : course.title}
                </td>
                <td> RM {course.price} </td>
                <td>
                  <button className='continue' onClick={() => viewCourse(course._id)}>Continue Learning</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCourse;
