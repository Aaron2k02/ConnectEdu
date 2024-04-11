import { useEffect, useState } from 'react'
import "./Navbar.scss"

const Navbar = () => {

  const [active, setActive] = useState(false);

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
    <div className={active ? "navbar active": "navbar"}>
      <div className='container'>
        <div className='logo'>
          <span className='text'> ConnectEdu </span>
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
            <div className='user'>
              <img src="" alt="" />
              <span>{currentUser?.userName}</span>
              <div className='options'>
                {
                  currentUser?.isSeller && (
                    <>
                      <span>My Courses</span>
                      <span>Create New Courses</span>
                    </>
                  )
                }
                <span>Orders</span>
                <span>Notifications</span>
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {active && (
        <>
          <hr />
            <div className="menu">
            <span> Test </span>
            <span> Test 2 </span>
            <span> Test 3 </span>
          </div>
        </>
      ) }
    </div>
  )
}

export default Navbar