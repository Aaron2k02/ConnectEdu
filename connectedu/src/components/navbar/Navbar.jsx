import { useEffect, useState } from 'react'
import "./Navbar.scss"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = ({ filterCoursesByCategory }) => {

  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  }

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive)
    };
  }, []);

  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    filterCoursesByCategory(category);
  };  

  const currentUser = 
  {
    id: 1,
    userName: "Educators",
    Role: "Educator", // Role can be "User", "Admin", or "Educator"
  };

  return (
    <div className={active || (pathname !== "/" && pathname !== "/signin") ? "navbar active" : "navbar"}>
      <div className='container'>
        <div className='logo'>
          <Link className='link' to="/">
            <span className='text'> ConnectEdu </span>
          </Link>
          <span className='dot'> . </span>
          <img src={'/images/ConnectEduLogo-bg.png'} alt="" />
        </div>
        <div className='links'>
          {!currentUser && (
            <>
              <span> Explore </span>
              <Link className='link' to="/signin">Sign in</Link>
              <button> Start Learning </button>
            </>
          )}
          {currentUser && (
            <div className="user">
              {currentUser.Role === "Educator" && (
                <Link className='link item' to="/manageCourses">Manage Courses</Link>
              )}
              {currentUser.Role === "User" && (
                <Link className='link item' to="/educatorRegister">Become an Educator</Link>
              )}
              {currentUser.Role === "Admin" && (
                <>
                  <Link className='link item' to="/Dashboard">Admin Dashboard</Link>
                  <Link className='link item' to="/ManageUser">Manage User</Link>
                  <Link className='link item' to="/ManageClass">Manage Courses</Link>
                </>
              )}
              {currentUser.Role !== "Admin" && (
                <>
                  <Link className='link item' to="/myCourses">My Courses</Link>
                  <Link className='link item' to="/myPurchase">Purchase History</Link>
                  <Link className='link item' to="/notifications">Notifications</Link>
                </>
              )}
              <div className="item" onClick={() => setOpen(!open)}>
                <AccountCircleIcon />
                {/* <img src="" alt="" /> */}
                <span>{currentUser?.userName}</span>
              </div>
              {open &&
                <div className='options'>
                  {currentUser.Role !== "Admin" && (
                    <>
                      <Link className='link' to='/users/accountSettings'> My Profile </Link>
                      <Link className='link' to="/dashboard/MainDashboard">My Dashboard</Link>
                     
                    </>
                  )}
                  <Link className='link' to="/">Logout</Link>
                </div>
              }
            </div>
          )}
        </div>
      </div>
      {(active || (pathname !== "/" && pathname !== "/signin")) && (
        <>
          <hr />
          <div className="menu">
            <span className={`link ${activeCategory === "UI UX Design" ? "active" : ""}`} onClick={() => handleCategoryClick("UI UX Design")}>
              UI UX Design
            </span>
            <span className={`link ${activeCategory === "Web Development" ? "active" : ""}`} onClick={() => handleCategoryClick("Web Development")}>
              Web Development
            </span>
            <span className={`link ${activeCategory === "Mobile App Development" ? "active" : ""}`} onClick={() => handleCategoryClick("Mobile App Development")}>
              Mobile App Development
            </span>
            <span className={`link ${activeCategory === "Data Science" ? "active" : ""}`} onClick={() => handleCategoryClick("Data Science")}>
              Data Science
            </span>
            <span className={`link ${activeCategory === "Software Engineering" ? "active" : ""}`} onClick={() => handleCategoryClick("Software Engineering")}>
              Software Engineering
            </span>
            <span className={`link ${activeCategory === "Artificial Intelligence" ? "active" : ""}`} onClick={() => handleCategoryClick("Artificial Intelligence")}>
              Artificial Intelligence
            </span>
            <span className={`link ${activeCategory === "Cybersecurity" ? "active" : ""}`} onClick={() => handleCategoryClick("Cybersecurity")}>
              Cybersecurity
            </span>
          </div>
          <hr />
        </>
      )}
    </div>
  )
}

export default Navbar