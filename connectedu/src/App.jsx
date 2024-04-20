import React from "react";

// Import Router functions
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

// Import Page Component
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/home";
import Footer from "./components/footer/Footer";
import MyPurchase from "./pages/myPurchase/MyPurchase";
import MyCourse from "./pages/mycourse/mycourse";
import CreateCourse from "./pages/createCourse/createCourse";
import Courses from "./pages/courses/courses";
import Course from "./pages/course/course";
import Notifications from "./pages/notifications/Notifications";
import Notification from "./pages/notification/Notification";
import PaymentCheckout from "./pages/paymentCheckout/paymentCheckout";
import CheckoutSuccess from "./components/checkoutSuccess/checkoutSuccess";

// Import Page Styling -- General css
import './app.scss';
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import ForgotPass from "./pages/forgotPass/ForgotPass";
import Profile from "./pages/profile/Profile";
import AccountSettings from "./components/userProfilecard/AccountSettings";
import VerifyOTP from "./pages/forgotPass/verifyOTP";
import ResetPassword from "./pages/forgotPass/resetPassword";
import Dashboard from "./pages/dataAnalytics/Dashboard";
import ManageUser from "./pages/ManageUser/ManageUser";
import ManageClass from "./pages/ManageClass/ManageClass";


function App() {

  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
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
          element: <Home />
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
          path: "/signin",
          element: <Register />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/forgotPassword',
          element: <ForgotPass />
        },
        {
          path: '/users/:activePage',
          element: <Profile />
        },
        {
          path: '/forgotPassword/verifyOTP',
          element: <VerifyOTP />
        },
        {
          path: '/forgotPassword/resetPass',
          element: <ResetPassword />
        },
        {
          path: '/paymentCheckout',
          element: <PaymentCheckout />
        },
        {
          path: '/checkout-success',
          element: <CheckoutSuccess />
        },
        {
          path: '/Dashboard',
          element: <Dashboard />
          
        },
        {
          path: '/ManageUser',
          element: <ManageUser />
        },
        {
          path: '/ManageClass',
          element: <ManageClass />
        },

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
