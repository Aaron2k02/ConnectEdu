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
    <div className={active || (pathname !== "/" && pathname !== "/signin") ? "navbar active": "navbar"}>
      <div className='container'>
        <div className='logo'>
          <Link className='link' to="/">
            <span className='text'> ConnectEdu </span>
          </Link>
          <span className='dot'> . </span>
        </div>
        <div className='links'>
          <span> Explore </span>
          <span> English </span>
          <Link className='link' to="/signin">Sign in</Link>
          {!currentUser?.isEducator && <span> Become an Educator </span>}
          {!currentUser && <button> Start Learning </button>}
          {currentUser && (
            <div className='user' onClick={() => setOpen(!open)}>
              <AccountCircleIcon />
              {/* <img src="" alt="" /> */}
              <span>{currentUser?.userName}</span>
              { open &&
                <div className='options'>
                  {
                    currentUser?.isEducator && (
                      <>
                        <Link className='link' to="/myCourse">My Courses</Link>
                        <Link className='link' to="/createCourse">Create New Courses</Link>
                        <Link className='link' to='/users/accountSettings'>Profile</Link>
                      </>
                    )
                  }
                  <Link className='link' to="/myPurchase">My Purchase</Link>
                  <Link className='link' to="/notifications">Notifications</Link>
                  <Link className='link' to="/createCourse">Logout</Link>
                </div>
              }
            </div>
            // <div className="user">
            //   {
            //     currentUser?.isEducator && (
            //       <>
            //         <Link className='link' to="/myCourse">My Courses</Link>
            //         <Link className='link' to="/createCourse">Create New Courses</Link>
            //         <Link className='link' to="/myPurchase">My Purchase</Link>
            //       </>
            //     )
            //   }
            //   <Link className='link' to="/notifications">Notifications</Link>
            //   <Link className='link' to="/createCourse">Logout</Link>
            //   <AccountCircleIcon />
            //   {/* <img src="" alt="" /> */}
            //   <span>{currentUser?.userName}</span>
            // </div>
          )}
        </div>
      </div>
      {(active || (pathname !== "/" && pathname !== "/signin")) && (
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