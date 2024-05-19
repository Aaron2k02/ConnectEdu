import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import SlideShow from '../../components/slideshow/SlideShow';
import RatingForm from '../../components/ratingForm/RatingForm';
import ReviewItem from '../../components/reviewItem/ReviewItem';
import PayButton from "../../components/PayButton/PayButton";
import { reviewData } from '../../data/reviewData';
import './course.scss';

const cartItems = [
  { id: 1, name: "Mobile App Development", price: 59.99, cartQuantity: 1, image: "https://i.imgur.com/2xH1X44.png", desc: "We will explore the world of web development" },
];

const cart = { cartItems };

const Course = () => {
  const [seen, setSeen] = useState(false);
  const { id } = useParams();

  const courseQuery = useQuery({
    queryKey: ["course", id],
    queryFn: () => newRequest.get(`/courses/single/${id}`).then((res) => res.data),
  });

  const educatorId = courseQuery.data?.course.educatorId;

  const userQuery = useQuery({
    queryKey: ["user", educatorId],
    queryFn: () => newRequest.get(`/users/${educatorId}`).then((res) => res.data),
    enabled: !!educatorId,
  });

  if (courseQuery.isFetching) return <div>Loading...</div>;
  if (courseQuery.error) return <div>Something went wrong!</div>;

  const { course } = courseQuery.data;

  const togglePop = () => {
    setSeen(!seen);
  };

  return (
    <div className='course'>
      <div className="container">
        <div className="left">
          <span className="breadCrumbs"> ConnectEdu {">"} Information System </span>

          <h1>{course.title}</h1>

          <SlideShow data={course.thumbnailUrl} className='slider' />

          <h2>About This Course</h2>
          <p>{course.description}</p>
          {userQuery.isFetching ? ("Loading...") :
            userQuery.error ? ("Something went wrong!") : (
              <div className="educator">
                <h2>About The Educator</h2>
                <div className="user">
                  <img
                    src={userQuery.data.photoUrl || '/images/noavatar.png'}
                    alt=""
                  />
                  <div className="info">
                    <span>{userQuery.data.username}</span>
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
                    <button>Details</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{userQuery.data.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Educator since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                  </div>
                  <hr />
                  <p>
                    {userQuery.data.description}
                  </p>
                </div>
              </div>
            )}
          <div className="reviewHeader">
            <h2>Reviews</h2>
            <button onClick={togglePop}>Add Review</button>
            {seen ? <RatingForm toggle={togglePop} /> : null}
          </div>
          <div className="reviews">
            {reviewData.map(review => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
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
            {course.topics.map((topic, index) => (
              <div className="item" key={index}>
                <img src="/images/greencheck.png" alt="" />
                <span>{topic}</span>
              </div>
            ))}
          </div>
          <PayButton className='payButton' cartItems={cart.cartItems} />
          {/* <button>Print Certification</button> */}
        </div>
      </div>
    </div>
  );
};

export default Course;
