import React from 'react';
import Highlighted from '../components/cors/HomePage/Highlighted';
import aboutus1 from "../assets/Images/aboutus1.webp";
import aboutus2 from "../assets/Images/aboutus2.webp";
import aboutus3 from "../assets/Images/aboutus3.webp";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im"
import FoundingStory from "../assets/Images/FoundingStory.png"
import { data } from "../data/aboutData"
import { girdData } from '../data/girdData';
import { useForm } from "react-hook-form"
import CLXbutton from "../components/cors/HomePage/CLXbutton"
import ContactForm from '../components/forms/ContactForm';


export const AboutUs = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm({});
  return (
    //main div
    <div>
      {/* section 1 div */}
      <section className="bg-richblack-800">
        {/* child divs  */}
        {/* div 1 for bg color*/}

        <div className='max-w-maxContent mx-auto w-11/12'>
          {/* max width set */}
          <div className='pt-10'>
            <p className='text-center text-richblack-200 mt-1'>About Us</p>

            <div className='max-w-4xl text-center mx-auto flex flex-col gap-5 mt-8'>

              <h2 className='text-4xl font-bold text-richblack-5'>
                Driving Innovation in Online Education for a <Highlighted color={"bg-gradient-to-t from-blue-300 to-white"}>Brighter Future</Highlighted>
              </h2>
              <p className='text-richblack-300'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
            </div>

            <div className='flex justify-between relative top-12'>
              <img src={aboutus1} alt="about1" loading='lazy'/>
              <img src={aboutus2} alt="about2"  loading='lazy'/>
              <img src={aboutus3} alt="about3" loading='lazy'/>
            </div>

          </div>
        </div>

        {/* div 2 */}
        <div className='bg-richblack-900 px-32 py-24'>
          <div className='flex max-w-maxContent mx-auto w-11/12'>
            <p className='text-3xl leading-[60px] text-richblack-5 font-semibold text-center'>
              <ImQuotesLeft className='w-5 inline relative -top-5' />&nbsp; We are passionate about revolutionizing the way we learn. Our innovative platform combines <Highlighted color={"bg-gradient-to-b from-yellow-300 to-pink-200"}>technology</Highlighted>, <Highlighted color={"bg-gradient-to-t from-blue-50 to-yellow-100"}>expertise</Highlighted>, and <Highlighted color={"bg-gradient-to-l from-caribbeangreen-400 to-richblue-50"}>community</Highlighted> to create an unparalleled educational experience.&nbsp;<ImQuotesRight className='w-5 inline relative -top-5' />
            </p>
          </div>
        </div>
      </section>

      {/* section 2  */}
      <section className='bg-richblack-900 border-t border-richblack-800'>

        <div className='max-w-maxContent w-11/12 mx-auto py-20'>

          <div className='flex justify-between items-center'>
            {/* part 1 */}
            <div className='w-1/2 p-4'>
              <div className='text-4xl font-semibold mb-5 text-richblack-5'>
                <Highlighted color={"bg-gradient-to-r from-pink-300 to-yellow-200"}>Our Founding Story </Highlighted>
              </div>
              <div className='text-richblack-300 flex flex-col gap-4'>
                <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
              </div>
            </div>
            <div className='relative right-12 p-4'>
              <div className='absolute w-56 aspect-video  bg-gradient-to-tr from-pink-500 to-pink-50 top-5 left-1 rounded-[140px/80px] blur-2xl'></div>
              <img src={FoundingStory} alt="FoundingStory" className='relative' loading='lazy'/>

            </div>
          </div>

          {/* part 2 */}
          <div className='flex gap-240 mt-20 p-5'>

            <div className='px-5'>
              <div className='text-4xl font-semibold mb-5 text-richblack-5'>
                <Highlighted color={"bg-gradient-to-t from-yellow-100 to-blue-200"}>Our Vision</Highlighted>
              </div>
              <p className='text-richblack-300'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
            </div>

            <div className='px-5'>

              <div className='text-4xl font-semibold mb-5 text-richblack-5'><Highlighted color={"bg-gradient-to-l from-blue-300 to-richblack-100"}>Our Mision</Highlighted></div>
              <p className='text-richblack-300'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>

            </div>

          </div>

        </div>





      </section>

      {/* fields  */}

      <div className='bg-richblack-800 p-24 border-b-richblack-700'>

        <div className='max-w-maxContent w-11/12 mx-auto'>

          <div className='flex justify-between'>
            {
              data.map((field, index) => (
                <div className='flex flex-col  items-center' key={index}>
                  <h2 className='text-4xl font-bold text-richblack-5'>{field.value}</h2>
                  <p className='mt-3 text-richblack-500  font-semibold'>{field.title}</p>
                </div>
              ))
            }
          </div>

        </div>

      </div>

      <section className='bg-richblack-900 py-20'>

        <div className='mx-auto max-w-maxContent w-11/12 grid grid-cols-4 grid-rows-2 text-white'>
          {
            girdData.map((obj, index) => {
              let styleDiv = "", styleH = "text-lg text-richblack-5 font-semibold mb-5", styleP = "text-richblack-100 text-sm";;
              let button = false;
              switch (index) {
                case 0:
                  {
                    styleDiv = "bg-richblack-900 col-span-2 flex gap-4 flex-col";
                    styleH = "text-4xl text-richblack-5 font-semibold";
                    styleP = "text-richblack-300";
                    button = true;
                    break;
                  }
                case 1:
                case 4:
                case 6:
                  {
                    styleDiv = "bg-richblack-700 p-5";
                    break;
                  }
                case 2:
                case 5:
                  {
                    styleDiv = "bg-richblack-800 p-5 flex flex-col";
                    break;
                  }
                default:
                  {
                    styleDiv = "bg-richblack-900";
                  }
              }
              return <div className={styleDiv} key={index}>
                <h3 className={styleH}>{obj.heading}</h3>
                <p className={styleP}>{obj.description}</p>
                {button && <CLXbutton active={true} go={"/"}>Learn more</CLXbutton>}
              </div>
            }
            )
          }
        </div>

      </section>

      {/* form Section  */}

      <section className='bg-richblack-900 ' >

        {/* container of form and review  */}
        <div className='max-w-maxContent w-11/12 mx-auto' >

          {/* form section div  */}
          <div className='flex flex-col items-center gap-4 p-5'>
            <h2 className='text-3xl font-semibold text-richblack-5'>Get in Touch</h2>
            <p className='text-richblack-300'>We’d love to here for you, Please fill out this form.</p>

            <ContactForm register={register} handleSubmit={handleSubmit} reset={reset} errors={errors} />
          </div>
          {/* rewiew section  */}
          <div >
          </div>
        </div>
      </section>
    </div>
  )
}
