import React from "react";
import "./Featured.scss";

function Featured() {
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
            <button>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Web Development</button>
            <button>Mobile App Development:</button>
            <button>Data Science</button>
            <button>Artificial Intelligence</button>
            <button>Cybersecurity</button>
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