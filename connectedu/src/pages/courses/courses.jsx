import React from 'react'
import './Courses.scss'
import { useState } from 'react';

import { courses } from '../../data/coursesData';

import CourseCard from '../../components/courseCard/courseCard';

const Courses = () => {

  const [open, setOpen] = useState(false)
  // Backedn modification to query based on sales of courses
  const [sort, setSort] = useState("sales")

  const reSort = (type) => {
    setSort(type)
    setOpen(false)
  }

  return (
    <div className='courses'>
      <div className="container">
        <span className="breadcrumbs">
           ConnectEdu | CyberSecurity
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
            <div className="sortType"> {sort === 'sales' ? 'Best Selling':'Newest' }</div>
            <img src={"/images/down.png"} alt="" onClick={()=>setOpen(!open)}/>
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
        <div className="cards">
          {
            courses.map((course) => (
              <CourseCard key={course.id} item={course}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Courses