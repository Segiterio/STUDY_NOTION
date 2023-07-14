import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getCourseDetails } from '../../../Functions/Userfun'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../../Redux/Slices/auth'
const ContentSideBar = ({ setReviewModal }) => {
  const dispatch = useDispatch();
  const [showSubSection, setShowSubSection] = useState([])
  const { courseId } = useParams();
  const [courseContentdata, setCourseContent] = useState(null);
  
  useEffect(() => {
    dispatch(setLoading(true))
    async function callgetCourseDetails() {
      const result = await getCourseDetails(courseId);
      console.log("dta", result)
      setCourseContent(result?.courseContent);
    };
    callgetCourseDetails();
    dispatch(setLoading(false));
  }, []);
  console.log("hello 3", courseContentdata)
  return (
    <div>
      {
        courseContentdata.map((section) => (
          <div className='' key={section._id}>
            <div>
              <div>{section.sectionName}</div>
              <div>
                <div></div>
                <div onClick={() => {
                  const open = showSubSection.includes(section._id)
                  if (open) {
                    setShowSubSection(showSubSection.filter((value) => value._id != section._id))
                  }
                  else {
                    setShowSubSection([...showSubSection, section._id])
                  }
                }}>
                  <BiChevronDown />
                </div>
              </div>
            </div>
            {showSubSection.includes(section._id) && <div>
              {
                section.subSection.map((sSection) => (
                  <Link to={``}>
                    <div>{sSection.title}</div>
                  </Link>
                )
                )
              }
            </div>}
          </div>
        )
        )
      }
    </div>
  )
}

export default ContentSideBar