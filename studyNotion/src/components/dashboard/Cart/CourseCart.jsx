import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveFromCart } from "../../../Redux/Slices/cart"
import ReactStars from "react-rating-stars-component"
import { ImStarFull, ImStarHalf, ImStarEmpty } from 'react-icons/im';
import { RiDeleteBin6Line } from "react-icons/ri"
import { toast } from 'react-toastify';
const CourseCart = () => {

    const { cart } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    return (
        <div className='text-white flex flex-col gap-3'>
            {
                cart.map((course) => (
                    <div key={course._id} className='gap-6 border-t border-richblack-500 py-4 grid grid-cols-[.6fr_1fr_.4fr] items-center '>
                        <div><img src={course?.thumbnail} loading='lazy' alt={course?.title} className='object-cover rounded-md border border-richblack-700'/></div>
                        <div className='flex flex-col justify-around'>

                            <p className='text-lg font-bold text-richblack-25'>{course?.courseDescription.substring(0,40)} ...</p>
                            <p className='text-richblack-200'>{course?.courseName}</p>
                            <div className='flex items-center gap-1'>
                                <span className='text-yellow-100'>{4.8}</span>
                                <ReactStars
                                    count={5}
                                    emptyIcon={<ImStarEmpty />}
                                    filledIcon={<ImStarFull />}
                                    halfIcon={<ImStarHalf />}
                                    edit={false}
                                    activeColorcolor="#CFAB08"
                                    size={20}
                                    value={4.5}
                                    isHalf={true}
                                />

                                <span className='text-richblack-400'>Review Count</span>

                            </div>
                        </div>
                        <div >
                            <button onClick={() => {
                                toast.success("Item Removed")
                                dispatch(RemoveFromCart(course))
                            }} className='flex items-center gap-1 py-1 px-2 text-sm font-normal bg-richblack-700 text-pink-200 rounded-md' >
                                <RiDeleteBin6Line />Remove
                            </button>

                            <div className='text-yellow-100 font-bold text-xl mt-3'>
                                {/* get dynamic price here */}
                                Rs {course.price}
                            </div>
                        </div>

                    </div>
                )
                )
            }
        </div>
    )
}

export default CourseCart