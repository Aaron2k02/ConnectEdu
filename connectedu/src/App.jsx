import React from "react";

// Import Router functions
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

// Import Page Component
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import MyPurchase from "./pages/MyPurchase/MyPurchase";
import MyCourse from "./pages/mycourse/mycourse";
import CreateCourse from "./pages/createCourse/CreateCourse";
import Courses from "./pages/courses/courses";
import Course from "./pages/course/course";
import Notifications from "./pages/notifications/Notifications";
import Notification from "./pages/notification/Notification";
import Register from "./pages/register/register";

// Import Page Styling -- General css
import './app.scss';
import Login from "./pages/login/login";

function App() {

  const Layout = () => {
    return (
      <div className="app">
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element:<Home/>
        },
        {
          path: "/courses",
          element: <Courses />
        },
        {
          path: "/course/:id",
          element: <Course />
        },
        {
          path: "/myPurchase",
          element: <MyPurchase />
        },
        {
          path: "/myCourse",
          element: <MyCourse />
        },
        {
          path: "/createCourse",
          element: <CreateCourse />
        },
        {
          path: "/notifications",
          element: <Notifications />
        },
        {
          path: "/notification/:id",
          element: <Notification />
        },
        {
          path:"/signin",
          element:<Register/>
        }
      ]
    },
  ]);


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
