import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import SlideShow from '../../components/slideshow/SlideShow';
import ReviewItems from '../../components/reviewItems/ReviewItems';
import './course.scss';
import getCurrentUser from "../../utils/getCurrentUser";

const Course = () => {
  const { id } = useParams();
  const currentUser = getCurrentUser();

  const courseQuery = useQuery({
    queryKey: ["course", id],
    queryFn: () => newRequest.get(`/courses/single/${id}`).then((res) => res.data),
  });

  const purchasedCoursesQuery = useQuery({
    queryKey: ["purchasedCourses"],
    queryFn: () => newRequest.get(`/orders/purchasedCourses`).then((res) => res.data),
  });

  if (courseQuery.isFetching || purchasedCoursesQuery.isFetching) return <div>Loading...</div>;
  if (courseQuery.error || purchasedCoursesQuery.error) return <div>Something went wrong!</div>;

  const { course } = courseQuery.data;
  const purchasedCourses = purchasedCoursesQuery.data;

  const hasPurchasedCourse = purchasedCourses.some(purchasedCourse => purchasedCourse._id === id);
  const myCourse = (course.educatorId._id === currentUser._id)

  console.log("console.log(hasPurchasedCourse);", course);
  console.log("console.log(hasPurchasedCourse);" ,hasPurchasedCourse);

  return (
    <div className='course'>
      <div className="container">
        <div className="left">
          <span className="breadCrumbs"> ConnectEdu {">"} {course.title} </span>

          <h1>{course.title}</h1>

          <SlideShow data={course.thumbnailUrl} className='slider' />

          <h2>About This Course</h2>
          <p className='course-description'>{course.description}</p>
            <div className="educator">
              <h2>About The Educator</h2>
              <div className="box">
                <div className="items">
                  <div className="item">
                    <div className="user">
                      <img
                        src={course.educatorId.photoUrl || '/images/noavatar.png'}
                        alt=""
                      />
                      <div className="info">
                        <span>{course.educatorId.username}</span>
                        <span> Total Course Sold: {course.educatorId.totalSales}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <p>
                  {/* {userQuery.data.description} */}
                </p>
              </div>
            </div>
          <ReviewItems courseId={id} hasPurchasedCourse={ hasPurchasedCourse } />
        </div>
        <div className="right">
          <div className="price">
            <h3>{course.shortTitle}</h3>
            <h2>RM {course.price}</h2>
          </div>
          <div className="details">
            <div className="item">
              <img src="/images/clock.png" alt="" />
              <span>{course.courseDuration} Hours</span>
            </div>
            {!isNaN((course.totalStars / course.rateCount).toFixed(1)) &&
              <div className="stars">
                {Array(Math.round((course.totalStars / course.rateCount).toFixed(1))).fill().map((item, i) => (
                  <img src="/images/star.png" key={i} alt="" />
                ))}
                <span>
                  {Math.round((course.totalStars / course.rateCount).toFixed(1))}
                </span>
              </div>
            }
          </div>
          <div className="features">
            <h3>What you will learn from this course?</h3>
            {course.topics && course.topics.map((topic, index) => (
              <div className="item" key={index}>
                <img src="/images/greencheck.png" alt="" />
                <span>{topic}</span>
              </div>
            ))}
          </div>
          <Link to={hasPurchasedCourse || myCourse ? `/viewCourse/${id}` : `/paymentCheckout/${id}`}>
            <button>
              {myCourse ? "View My Course" :
                (hasPurchasedCourse ? "Continue Learning" : "Enroll Course")
              }
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Course;
