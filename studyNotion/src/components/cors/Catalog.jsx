import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Loader from "./Loader"
import { Link } from 'react-router-dom';
import { getCategoryPageDetails } from '../../Functions/Userfun';
import { setLoading } from '../../Redux/Slices/auth';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactStars from "react-rating-stars-component";

import { FreeMode, Autoplay, Navigation, Pagination } from "swiper/modules";
import { ImStarFull, ImStarHalf, ImStarEmpty } from 'react-icons/im';
import "swiper/css";
import "swiper/css/navigation"
import "swiper/css/pagination"
import Footer from './Footer';

const Catalog = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);
  const [courseData, setCourseData] = useState(null);
  useEffect(() => {
    dispatch(setLoading(true))
    console.log("Category ID ", categoryId);
    (async () => await getCategoryPageDetails(categoryId, setCourseData))();
    dispatch(setLoading(false));
    //get course by Category ID
  }, [categoryId])
  return (
      <div>{
        loading ? (<Loader />) : courseData ? (<div>
          <div className='bg-richblack-800 pt-10'>
            <div className='px-5 max-w-maxContent mx-auto w-11/12'>
              <div className='p-5 flex justify-between items-center'>
                <div>
                  <h1 className='text-3xl font-bold text-richblack-5'>{courseData.selectedCategory.name}</h1>
                  <p className='text-richblack-200 text-sm'>{courseData.selectedCategory.description}</p>
                </div>

                <div>
                  {/* related course */}

                </div>
              </div>
            </div>
          </div>

          <div className='bg-richblack-900'>
            <div className='px-5 max-w-maxContent mx-auto w-11/12'>
              {/* selected category courses */}
              <div>
                <h2 className='text-white text-xl py-3'>Course to get you started</h2>
                <div>
                  {/* filter course by type like new , most popular ,trending  */}
                </div>
                <div className='flex'>
                  <Swiper
                    slidesPerView={3}
                    autoplay={
                      {
                        delay: 2500,
                        disableOnInteraction:true
                      }
                    }
                    pagination={
                      {
                        clickable: true,
                        renderBullet: function (index, className) {
                          // console.log("ClassName",className)
                          return '<span class="bg-white ' + className + '">' + '</span>';
                        }
                      }
                    }
                    loop={courseData.selectedCategory.courses.length > 5 }
                    navigation={true}
                    freeMode={true}
                    modules={[FreeMode, Autoplay, Navigation, Pagination]}
                    spaceBetween={60}
                    className='py-10 px-10'
                  >

                    {courseData.selectedCategory.courses.map((value, index) => (
                      <SwiperSlide key={index} className='flex flex-col text-richblack-5  justify-between gap-2'>
                        <Link to={`/catalog/courses/${value.courseName}/${value._id}`}>
                          <img src={value.thumbnail} className='
                        w-80 aspect-video rounded-md object-cover' alt={value.courseName} />
                        </Link>
                        <p>{value.courseDescription}</p>
                        <h2 className='text-richblack-200 font-normal'>{value.courseName}</h2>
                        <div className='flex gap-2 items-center'>
                          {/* rating in value */}
                          <div className='text-yellow-100' >{value?.rating}4.8</div>
                          <ReactStars
                            count={5}
                            size={24}
                            emptyIcon={<ImStarEmpty />}
                            filledIcon={<ImStarFull />}
                            halfIcon={<ImStarHalf />}
                            value={3.7}
                            isHalf={true}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          {/* review count */}
                          <div></div>
                        </div>
                        <div className='text-lg font-semibold'>
                          Rs. {value.price}
                        </div>
                      </SwiperSlide>
                    ))
                    }
                    <div className='paginationPoints'></div>
                  </Swiper>

                </div>
              </div>
              {/* other category courses */}
              <div>
                <h2 className='text-white text-xl py-3'>Top Course On { } </h2>
                {
                  courseData.differentCategories.map((category, index) => (

                    category.courses.length > 0 && <div key={category._id}>
                      <h2 className='text-white text-xl py-3'>Course on {category.name}</h2>

                      <div className='flex'>
                        <Swiper
                          slidesPerView={3}
                          autoplay={
                            {
                              delay: 2000,
                            }
                          }
                          freeMode={true}
                          modules={[FreeMode,Pagination,Autoplay]}
                          
                          pagination={
                             {
                               clickable:true,
                               renderBullet: function (index, className) {
                          // console.log("ClassName",className)
                          return '<span class="bg-white ' + className + '">' + '</span>';
                           }
                             }
                          }
                          
                          
                          spaceBetween={50}
                          className='py-10 flex flex-col lg:flex-row'
                        >
                          {category.courses.map((value, index) => (
                            <SwiperSlide key={value._id} className='flex flex-col text-richblack-5  justify-between gap-2'>
                              <Link to="/">
                                <img src={value.thumbnail} className='
                        w-80 aspect-video rounded-md object-cover' alt={value.courseName} />
                              </Link>
                              <p>{value.courseDescription}</p>
                              <h2 className='text-richblack-200 font-normal'>{value.courseName}</h2>
                              <div className='flex gap-2 items-center'>
                                {/* rating in value */}
                                <div className='text-yellow-100' >{value?.rating}4.8</div>
                                <ReactStars
                                  count={5}
                                  size={24}
                                  emptyIcon={<ImStarEmpty />}
                                  filledIcon={<ImStarFull />}
                                  halfIcon={<ImStarHalf />}
                                  value={3.7}
                                  isHalf={true}
                                  edit={false}
                                  activeColor="#ffd700"
                                />
                                {/* review count */}
                                <div></div>
                              </div>
                              <div className='text-lg font-semibold'>
                                Rs. {value.price}
                              </div>
                            </SwiperSlide>
                          ))
                          }
                        </Swiper>

                      </div>
                    </div>
                  ))
                }
              </div>

              {/* frequently bought */}

              <div>
                <h2 className='text-white text-xl py-3'>Frequently Bought Together</h2>
              </div>

            </div>
          </div>
          <Footer />
        </div>) : (<div>No course found in this category</div>)
      }</div>
    
  )
}

export default Catalog