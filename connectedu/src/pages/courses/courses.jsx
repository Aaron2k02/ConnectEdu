import React, { useState, useEffect, useRef } from 'react';
import './Courses.scss';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import CourseCard from '../../components/courseCard/CourseCard';

const Courses = ({ selectedCategory }) => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const initialSearch = searchParams.get('search') || '';
  const [sort, setSort] = useState("sales");
  const searchInput = useRef(initialSearch);

  // Build query string
  const buildQuery = () => {
    let query = `?sort=${sort}`;
    if (searchInput.current.value) {
      query += `&search=${searchInput.current.value}`;
    }
    console.log(query);
    return query;
  };

  // Backend Query handling
  const { isFetching, error, data, refetch } = useQuery({
    queryKey: ['courses', search, sort],
    queryFn: () => newRequest.get(`/courses${buildQuery()}`).then((res) => res.data),
  });

  // Function to handle search
  const searchCourse = () => {
    refetch();
  };

  const [isActive, setIsActive] = useState(false);

  // Filter courses based on the selected category and search input
  const filteredCourses = data ? (
    data.filter(course => {
      const matchesCategory = !selectedCategory || course.category.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase());
      const matchesSearch = !searchInput.current.value || course.title.toLowerCase().includes(searchInput.current.value.toLowerCase());
      return matchesCategory && matchesSearch;
    })
  ) : [];

  useEffect(() => {
    // Show content with fading effect after a short delay (to allow CSS transition)
    const timeout = setTimeout(() => {
      setIsActive(true);
      window.scrollTo(0, 0);
    }, 100);

    // Clear timeout on component unmount to prevent memory leak
    return () => clearTimeout(timeout);
  }, [selectedCategory, sort]);

  const [open, setOpen] = useState(false);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    // Refetch data if URL search changes
    refetch();
  }, [search]);

  return (
    <div className={`courses ${isActive ? 'active' : ''}`}>
      <div className="container">
        <span className="breadcrumbs">
          ConnectEdu | {selectedCategory ? selectedCategory : "Courses"}
        </span>
        <h1>
          {selectedCategory ? selectedCategory : "Courses"}
        </h1>
        <p>
          Explore {selectedCategory ? selectedCategory : "Courses"}
        </p>
        <div className="menu">
          <div className="left">
            <span>Search Course</span>
            <input type="text" id="searchCourseInput" placeholder='Search Course' ref={searchInput} defaultValue={initialSearch} />
            <button onClick={searchCourse}>Search</button>
          </div>
          <div className="right">
            <div className="sortBy">Sort By: </div>
            <div className="sortType">{sort === 'sales' ? 'Best Selling' : sort === 'createdAt' ? 'Newest' : 'Price'}</div>
            <img src={"/images/down.png"} alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                <span onClick={() => reSort("sales")}>Best Selling</span>
                <span onClick={() => reSort("createdAt")}>Newest</span>
                <span onClick={() => reSort("price")}>Price</span>
              </div>
            )}
          </div>
        </div>
        {/* Course cards */}
        {/* Conditional Rendering based on query state */}
        {isFetching ? (
          "loading"
        ) : error ? (
          "Something went wrong!"
        ) : (
          <div className="cards">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} item={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
