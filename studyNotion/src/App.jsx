import React, { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home';
import Loginpage from './pages/Loginpage';
import { Navbar } from './components/cors/Navbar';
import { AboutUs } from "./pages/AboutUs"
import SignUpPage from './pages/SignUpPage';
import Otpage from './components/forms/Otpage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SetPassword from './components/forms/SetPassword';
import ResetPasswordToken from './components/forms/ResetPasswardToken';
import OpenRoute from './components/cors/OpenRoute';
import ErrorPage from './components/cors/ErrorPage';
import MyProfile from './components/dashboard/MyProfile';
import Dashboard from './components/dashboard/Dashboard';
import EnrolledCourses from './components/dashboard/EnrolledCourses';
import PurchaseHistory from './components/dashboard/PurchaseHistory';
import Settings from './components/dashboard/Settings';
import Cart from './components/dashboard/Cart/Index';
import ContactUs from './pages/ContactUs';
import { ACCOUNT_TYPE } from './Constants/Constant';
import InstructorDashboard from './components/dashboard/Instructor/InstructorDashboard';
import AddCourses from './components/dashboard/Instructor/AddCourses';
import MyCourses from './components/dashboard/Instructor/MyCourses';
import { useDispatch, useSelector } from 'react-redux';
import { CheckToken } from './Functions/Userfun';
import Catalog from './components/cors/Catalog';
import CourseDetails from './components/cors/CourseDetails';
import Contain from './Contain';
import Index from './components/dashboard/AccessCourse/Index';
import ScrollToTop from './Functions/utils';
const App = () => {
  const { token } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // use location is used form reset password token
  const user = useSelector(state => state.profile)
  const location = useLocation();
  useEffect(() => {
    token && CheckToken(dispatch, navigate, token);
  }, []);
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Contain />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/catalog/courses/:categoryId" element={<Catalog />} />
          <Route path="/catalog/courses/:courseName/:courseId" element={<CourseDetails />} />
        </Route>

        {/* reset password token ke openRoute me Sanka hai */}
        <Route path="/login" element={<OpenRoute><Loginpage /></OpenRoute>} />
        <Route path="/login/Reset-Password-Token" element={<OpenRoute><ResetPasswordToken /></OpenRoute>} />
        <Route path="/signup" element={<OpenRoute><SignUpPage /></OpenRoute>} />
        <Route path="/signup/otp" element={<OpenRoute><Otpage /></OpenRoute>} />


        <Route element={<Dashboard />}>
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/setting" element={<Settings />} />

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && <>
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
              <Route path="/dashboard/purchase-history" element={<PurchaseHistory />} />
              <Route path="/dashboard/cart" element={<Cart />} />
            </>
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && <>
              <Route path="/dashboard/instructor" element={<InstructorDashboard />} />
              <Route path="/dashboard/add-course" element={<AddCourses />} />
              <Route path="/dashboard/my-courses" element={<MyCourses />} />
            </>
          }
        </Route>

        <Route path={`/update-password/${location.pathname.split("/").at(-1)}`} element={<SetPassword />} />

        {user?.accountType === ACCOUNT_TYPE.STUDENT &&
          <Route path="/accessCourse/:courseId/section/:sectionId/subSection/:subSectionId" element={<Index />} />
        }
        <Route path={"*"} element={<ErrorPage />} />
      </Routes>
      <ToastContainer autoClose={2000} />
    </div>
  )
}
export default App;