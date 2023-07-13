import React from 'react'
import { useSelector } from 'react-redux';
import BuyCourse from './BuyCourse';
import CourseCart from './CourseCart';

const Cart = () => { 
  const {total, totalItem,cart} = useSelector(state => state.cart);
  return (
    <div className='flex flex-col'>
       <h1 className='text-2xl text-richblack-5'>Cart</h1> 
        {
           totalItem > 0 ? (
              <div className='py-5'><p className='text-richblack-100'>{totalItem} Courses in wishlist</p>
              <div className='grid grid-cols-[.75fr_.25fr] gap-2 place-items-start'>
                 <CourseCart/>
                 <BuyCourse total={total} cart={cart}/>
                 </div>
              </div>) : (<p className='my-auto self-center text-4xl font-normal text-richblack-600'>Cart is Empty</p>)
        }
    </div>
  )
}

export default Cart