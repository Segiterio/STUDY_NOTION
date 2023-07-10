import React from 'react'
import SignUpImage from "../assets/Images/signup.webp"
import Templete from '../components/forms/Templete'

const SignUpPage = () => {
  return (
    <Templete 
    heading={"Join the millions learning to code with StudyNotion for free"} 
    description={"Build skills for today, tomorrow, and beyond."}
    subdescription={" Education to future-proof your career."}
    formType={"Signup"}
    image={SignUpImage}
      />
  )
}

export default SignUpPage;
