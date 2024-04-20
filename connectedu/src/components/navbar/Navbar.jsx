import { useEffect, useState } from 'react'
import "./Navbar.scss"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = () => {

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

  const currentUser = 
  {
    id: 1,
    userName: "Educators",
    isEducator: true
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
            // <div className='user' onClick={() => setOpen(!open)}>
            //   <AccountCircleIcon />
            //   {/* <img src="" alt="" /> */}
            //   <span>{currentUser?.userName}</span>
            //   { open &&
            //     <div className='options'>
            //       {
            //         currentUser?.isEducator && (
            //           <>
            //             <Link className='link' to="/myCourse">My Courses</Link>
            //             <Link className='link' to="/createCourse">Create New Courses</Link>
            //             <Link className='link' to='/users/accountSettings'>Profile</Link>
            //           </>
            //         )
            //       }
            //       {!currentUser?.isEducator && <span> Become an Educator </span>}
            //       <Link className='link' to="/myPurchase">My Purchase</Link>
            //       <Link className='link' to="/notifications">Notifications</Link>
            //       <Link className='link' to="/createCourse">Logout</Link>
            //     </div>
            //   }
            // </div>
            <div className="user" onClick={() => setOpen(!open)}>
              {
                currentUser?.isEducator ? (
                  <>
                    <Link className='link item' to="/createCourse">Create New Courses</Link>
                  </>
                ) : (
                  <>
                    <Link className='link item' to="/createCourse">Become an Educator</Link>
                  </>
                )
              }
              <Link className='link item' to="/myCourse">My Courses</Link>
              <Link className='link item' to="/myPurchase">My Purchase</Link>
              <Link className='link item' to="/paymentCheckout">My Payment</Link>
              <Link className='link item' to="/notifications">Notifications</Link>
              <div className="item">
                <AccountCircleIcon />
                {/* <img src="" alt="" /> */}
                <span>{currentUser?.userName}</span>
              </div>
              {open &&
                <div className='options'>
                  <Link className='link' to='/users/accountSettings'> My Profile </Link>
                  <Link className='link' to="/Dashboard">Admin Dashboard</Link>
                  <Link className='link' to="/ManageUser">Manage User</Link>
                  <Link className='link' to="/ManageClass">Manage Courses</Link>
                  <Link className='link' to="/dashboard/MainDashboard">My Dashboard</Link>
                  <Link className='link' to="/createCourse">Logout</Link>
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
          <hr />
        </>
      )}
    </div>
  )
}

export default Navbar