import React from 'react'
import './Courses.scss'
import { useState, useEffect } from 'react';

import { courses } from '../../data/coursesData';

import CourseCard from '../../components/courseCard/CourseCard';

const Courses = ({ selectedCategory }) => {
  const [isActive, setIsActive] = useState(false);

  const filteredCourses = selectedCategory
    ? courses.filter(course => course.category === selectedCategory)
    : courses;
  
  useEffect(() => {
    // Show content with fading effect after a short delay (to allow CSS transition)
    const timeout = setTimeout(() => {
      setIsActive(true);
    }, 100);

    // Clear timeout on component unmount to prevent memory leak
    return () => clearTimeout(timeout);
  }, [selectedCategory]);

  const [open, setOpen] = useState(false);
  // Backend modification to query based on sales of courses
  const [sort, setSort] = useState("sales");

  const reSort = (type) => {
    setSort(type)
    setOpen(false)
  };

  return (
    <div className={`courses ${isActive ? 'active' : ''}`}>
      <div className="container">
        <span className="breadcrumbs">
          ConnectEdu | {selectedCategory ? selectedCategory : "Courses"}
        </span>
        <h1>
          CyberSecurity Experts
        </h1>
        <p>
          Explore the world of CyberSecurity
        </p>
        <div className="menu">
          <div className="left">
            <span>
              Search Course
            </span>
            <input type="text" placeholder='Search Course' />
            <button> Search </button>
          </div>
          <div className="right">
            <div className="sortBy">Sort By: </div>
            <div className="sortType"> {sort === 'sales' ? 'Best Selling' : 'Newest'}</div>
            <img src={"/images/down.png"} alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === 'sales' ?
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                  :
                  <span onClick={() => reSort("sales")}>Best Selling</span>}
              </div>
            )}
          </div>
        </div>
        {/* Course cards */}
        <div className="cards">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} item={course} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Courses