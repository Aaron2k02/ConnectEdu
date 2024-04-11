import { useEffect, useState } from 'react'
import "./Navbar.scss"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = () => {

  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const {pathname} = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  }

  useEffect(() => {
    window.addEventListener("scroll", isActive);
      
    return () => {
      window.removeEventListener("scroll", isActive)
    };
  }, []);

  const currentUser = {
    id: 1,
    userName: "Educators",
    isEducator:true
  }

  return (
    <div className={active || pathname !=="/" ? "navbar active": "navbar"}>
      <div className='container'>
        <div className='logo'>
          <Link className='link' to="/">
            <span className='text'> ConnectEdu </span>
          </Link>
          <span className='dot'> . </span>
        </div>
        <div className='links'>
          <span> Be LifeLong Learners </span>
          <span> Explore </span>
          <span> English </span>
          <span> Sign in </span>
          {!currentUser?.isSeller && <span> Become an Educator </span>}
          {!currentUser && <button> Start Learning </button>}
          {currentUser && (
            <div className='user' onClick={() => setOpen(!open)}>
              <AccountCircleIcon />
              {/* <img src="" alt="" /> */}
              <span>{currentUser?.userName}</span>
              { open &&
                <div className='options'>
                  {
                    currentUser?.isSeller && (
                      <>
                        <span className='link' to="/myCourse">My Courses</span>
                        <span className='link' to="/createCourse">Create New Courses</span>
                      </>
                    )
                  }
                  <Link className='link' to="/myPurchase">My Purchase</Link>
                  <Link className='link' to="/notifications">Notifications</Link>
                  <Link className='link' to="/createCourse">Logout</Link>
                </div>
              }
            </div>
          )}
        </div>
      </div>
      {(active || pathname !=="/" ) && (
        <>
          <hr />
            <div className="menu">
            <Link className='link' to='/'>
              UI UX Design
            </Link>
            <Link className='link' to='/'>
              Web Development
            </Link>
            <Link className='link' to='/'>
              Mobile App Development
            </Link>
            <Link className='link' to='/'>
              Data Science
            </Link>
            <Link className='link' to='/'>
              Software Engineering
            </Link>
            <Link className='link' to='/'>
              Artificial Intelligence
            </Link>
            <Link className='link' to='/'>
              Cybersecurity
            </Link>

            </div>
        </>
      ) }
    </div>
  )
}

export default Navbar