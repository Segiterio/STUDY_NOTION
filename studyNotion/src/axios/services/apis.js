const BASE_URL = import.meta.env.VITE_BASE_URL;

export const categories = {
      CATEGORIES_API : BASE_URL+'api/v1/course/showAllCategories',
      GET_COURSE_BY_CATEGORY_ID: BASE_URL + 'api/v1/course/getCategoryPageDetails',
}
export const endPoints = {
          USER_LOGIN :BASE_URL + "api/v1/auth/login",
          USER_DETAILS:BASE_URL + "api/v1/profile/getUserDetails",
          SEND_OTP:BASE_URL + "api/v1/auth/sendotp",
          USER_SIGNUP:BASE_URL + "api/v1/auth/signup",
          FORGET_PASSWORD:BASE_URL +"api/v1/auth/reset-password" ,
          RESET_PASSWORD_TOKEN:BASE_URL +"api/v1/auth/reset-password-token" ,
          CHANGE_PASSWORD:BASE_URL + "api/v1/auth/changepassword",
          CHECK_TOKEN : BASE_URL+"api/v1/auth/checktoken",
}

export const profilePointes = {
       UPDATE_Display_Picture : BASE_URL + "api/v1/profile/updateDisplayPicture",
       UPDATE_PROFILE : BASE_URL + "api/v1/profile/updateProfile",
       GET_ENROLLED_COURSES : BASE_URL + "api/v1/profile/getEnrolledCourses"
}

export const coursePoints ={
           GET_COURSE_CATEGORIES : BASE_URL + "api/v1/course/showAllCategories",
           MAKE_STATUS:BASE_URL + "api/v1/course/publishCourse",
           GET_INSTRUCTOR_COURSES :BASE_URL + "api/v1/course/getInstructorCourses",
           DELETE_COURSE_API : BASE_URL + "api/v1/course/deleteCourse",
           GET_COURSE_DETAILS : BASE_URL + "api/v1/course/getCourseDetails",
           EDIT_COURSE_API : BASE_URL + "api/v1/course/editCourse",
           CREATE_COURSE_API : BASE_URL +"api/v1/course/createCourse" 
           
}

export const sectionPoints = {
            CREATE_SECTION: BASE_URL + "api/v1/course/addSection",
            UPDATE_SECTION:BASE_URL + "api/v1/course/updateSection"
}
export const subSectionPoints = {
       GET_SUBSECTION_DETAIL : BASE_URL + "api/v1/course/getSubSectionDetail",
       UPDATE_SUBSECTION_API : BASE_URL + "api/v1/course/updateSubSection",
       ADD_SUBSECTION_API : BASE_URL + "api/v1/course/addSubSection"
}

export const  razorpayPoints = {
        CAPTURE_PAYMENT : BASE_URL + "api/v1/payment/capturePayment",
        VERIFY_SIGNATURE : BASE_URL + "api/v1/payment/verifyPayment",
        SEND_SUCCESSFUL_PAYMENT_EMAIL : BASE_URL + "api/v1/payment/sendPaymentSuccessMail"
}