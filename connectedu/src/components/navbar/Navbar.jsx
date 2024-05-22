import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import './Navbar.scss';
import LogOutPopup from '../logOutPopup/LogOutPopup'

const Navbar = ({ filterCoursesByCategory }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  }

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/courses") {
      setActiveCategory(null);
      filterCoursesByCategory(null);
    }
    window.scrollTo(0, 0);
  }, [pathname, filterCoursesByCategory]);

  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    filterCoursesByCategory(category);
  };

  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      await newRequest.get("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  let navigate = useNavigate();

  const routeSignIn = () => {
    navigate('/signin');
  };

  return (
    <div className={active || (pathname !== "/" && pathname !== "/signin") ? "navbar active" : "navbar"}>
      <div className='container'>
        <div className='logo'>
          <Link className='link' to="/">
            <span className='text'>ConnectEdu</span>
          </Link>
          <span className='dot'>.</span>
          <img src={'/images/ConnectEduLogo-bg.png'} alt="" />
        </div>
        <div className='links'>
          {!currentUser && (
            <>
              <Link className='link' to="/courses">Explore</Link>
              <Link className='link' to="/login">Sign in</Link>
              <button onClick={routeSignIn}>Start Learning</button>
            </>
          )}
          {currentUser && (
            <div className="user">
              {currentUser.roleId === 2 && (
                <Link className='link item' to="/manageCourses">Manage Courses</Link>
              )}
              {currentUser.roleId === 1 && (
                <Link className='link item' to="/educatorRegister">Become an Educator</Link>
              )}
              {currentUser.roleId === 0 && (
                <>
                  <Link className='link item' to="/Dashboard">Admin Dashboard</Link>
                  <Link className='link item' to="/ManageUser">Manage User</Link>
                  <Link className='link item' to="/ManageClass">Manage Courses</Link>
                </>
              )}
              {currentUser.roleId !== 0 && (
                <>
                  <Link className='link item' to="/myCourses">My Courses</Link>
                  <Link className='link item' to="/myPurchase">Transaction History</Link>
                  <Link className='link item' to="/notifications">Notifications</Link>
                </>
              )}
              <div className="item" onClick={() => setOpen(!open)}>
                <img src={currentUser.photoUrl || "/images/noavatar.png"} alt="" />
                <span>{currentUser?.username}</span>
              </div>
              {open &&
                <div className='options'>
                  {currentUser.role !== "Admin" && (
                    <>
                      <Link className='link' to='/users/accountSettings'>My Profile</Link>
                      <Link className='link' to="/dashboard/MainDashboard">My Dashboard</Link>
                    </>
                  )}
                  <Link className='link' to="/" onClick={handleLogoutClick}>Logout</Link>
                  {showLogoutPopup && (
                    <LogOutPopup
                      toggle={() => setShowLogoutPopup(false)}
                      handleConfirm={handleLogoutConfirm}
                    />
                  )}
                </div>
              }
            </div>
          )}
        </div>
      </div>
      {pathname === "/courses" && (
        <>
          <hr />
          <div className="menu">
            {["UI UX Design", "Web Development", "Mobile App Development", "Data Science", "Software Engineering", "Artificial Intelligence", "Cybersecurity"].map(category => (
              <span key={category} className={`link ${activeCategory === category ? "active" : ""}`} onClick={() => handleCategoryClick(category)}>
                {category}
              </span>
            ))}
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;
