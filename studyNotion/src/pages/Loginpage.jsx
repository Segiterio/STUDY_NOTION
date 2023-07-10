import React from 'react'
import Templete from '../components/forms/Templete'
import LoginImage from "../assets/Images/login.webp"

 const Loginpage = () => {
  return (
   <Templete 
        heading={"Welcome Back"} 
        description={"Build skills for today, tomorrow, and beyond."}
        subdescription={" Education to future-proof your career."}
        formType={"Login"}
        image={LoginImage}
          />
  )
}
export default Loginpage;
//use template component here with props like heading , paragaraph , image  , formType, 