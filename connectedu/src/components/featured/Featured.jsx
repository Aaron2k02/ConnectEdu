import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from 'react-router-dom';

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses?search=${input}`);
  }

  const handleCategoryClick = (category) => {
    navigate(`/courses?search=${category}`);
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
              <input type="text" id="searchInput" placeholder='Try "building mobile app"' onChange={e => setInput(e.target.value)} />
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button onClick={() => handleCategoryClick("Web Development")}>Web Development</button>
            <button onClick={() => handleCategoryClick("Mobile App Development")}>Mobile App Development</button>
            <button onClick={() => handleCategoryClick("Data Science")}>Data Science</button>
            <button onClick={() => handleCategoryClick("Artificial Intelligence")}>Artificial Intelligence</button>
            <button onClick={() => handleCategoryClick("Cybersecurity")}>Cybersecurity</button>
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
