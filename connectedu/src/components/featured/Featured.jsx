import React from "react";
import "./Featured.scss";
import { useNavigate } from 'react-router-dom';

function Featured() {

  let navigate = useNavigate();

  const handleCategoryClick = () => {
      navigate('/courses'); // navigate to courses page after selecting category
  } 

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Start your <span> self development journey </span> in ConnectEdu
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src={"/images/search.png"} alt="" />
              <input type="text" placeholder='Try "building mobil app"' />
            </div>
            <button >Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button onClick={() => handleCategoryClick()}>Web Development</button>
            <button onClick={() => handleCategoryClick()}>Mobile App Development:</button>
            <button onClick={() => handleCategoryClick()}>Data Science</button>
            <button onClick={() => handleCategoryClick()}>Artificial Intelligence</button>
            <button onClick={() => handleCategoryClick()}>Cybersecurity</button>
          </div>
        </div>
        <div className="right">
          <img src={"/images/ConnectEduLogo-bg.png"} />
        </div>
      </div>
    </div>
  );
}

export default Featured;