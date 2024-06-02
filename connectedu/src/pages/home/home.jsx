import React, { useEffect, useState } from 'react'
import './Home.scss'

import "react-multi-carousel/lib/styles.css";

// components
import Featured from '../../components/featured/Featured'
import TrustedBy from '../../components/trustedBy/TrustedBy'
import Slide from '../../components/Slide/Slide';

// local data
import { cards } from '../../data/categoryData';
import CategoryCard from '../../components/categoryCard/CategoryCard';
import EducatorCard from '../../components/educatorCard/EducatorCard';

import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';

const Home = () => {
  const [educators, setEducators] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchEducators = async () => {
      try {
        const response = await newRequest.get('/users/educators');
        setEducators(response.data);
      } catch (error) {
        console.error('Error fetching educators:', error);
      }
    };
    fetchEducators();
  }, []);

  const routeSignIn = () => {
    navigate('/signin');
  }

  return (
    <div className='home'>
      <Featured/>
      <TrustedBy />
      <div className="courseCategory">
        <h1> Explore our popular Courses Category </h1>
        <p> Here are some popular courses category based on number of student Enrolled</p>
        <Slide slidesToSlide={1}>
          {
            cards.map(card => (
              <CategoryCard key={card.id} item={card} />
            ))
          }
        </Slide>
      </div>

      <div className="features">
        <div className="container">
          <div className="item">
            <h1>
              Embrace lifelong learning with ConnectEdu at your fingertips.
            </h1>
            <div className="title">
              <img src={'/gif/icons8-check.gif'} alt="" />
              Empowering Educators Worldwide
            </div>
            <p>
              A platform to create, manage, and sell your educational content.
            </p>
            <div className="title">
              <img src={'/gif/icons8-check.gif'} alt="" />
              Quality Learning, Endless Possibilities
            </div>
            <p>
              Seeking a quality online learning experience, resources, and community.
            </p>
            <div className="title">
              <img src={'/gif/icons8-check.gif'} alt="" />
              Grow Skills, Enrich Life
            </div>
            <p>
              For individuals of any age interested in personal growth and skill development.
            </p>
          </div>
          <div className="item">
            <video src={''} controls />
          </div>
        </div>
      </div>

      <div className="educators">
        <h1> Our Amazing Educators </h1>
        <Slide slidesToSlide={1}>
          {
            educators.map(educator => (
              <EducatorCard key={educator._id} educator={educator} />
            ))
          }
        </Slide>
      </div>

      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1> Educator Business </h1>
            <h1> Teach others and commercialize your educational content</h1>
            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <div className="title">
              <img src={'/gif/icons8-check.gif'} alt="" />
              Empowering Educators Worldwide
            </div>
            <div className="title">
              <img src={'/gif/icons8-check.gif'} alt="" />
              Quality Learning, Endless Possibilities
            </div>
            <div className="title">
              <img src={'/gif/icons8-check.gif'} alt="" />
              Grow Skills, Enrich Life
            </div>
            <button onClick={routeSignIn}>Explore ConnectEdu Business</button>
          </div>
          <div className="item">
            <img src={"/images/ConnectEduLogo-bg.png"} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home