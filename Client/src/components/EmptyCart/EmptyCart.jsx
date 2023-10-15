import React from 'react'
import cart from '../../img/cart2.png'
import { Link } from 'react-router-dom'
import { CiLocationArrow1 } from 'react-icons/ci'
const EmptyCart = () => {
  return (

    <div className='grid text-center'>

    <h1 className='text-5xl md:text-[80px] font-poppins font-extrabold text-gray-500 text-center mt-20'>Your shop cart is empty </h1>
    
    <img src={cart} className='  w-[40%] mx-auto'></img>
    <div className='w-[45%]  sm:w-[250px] md:w-[300px] md:h-[90px] mx-auto   '>    <Link to="/shop">
            <button className=" w-full px-4 py-4 sm:px-10 sm:py-6  md:h-[90px] bg-green-500 text-white font-semibold md:py-8 md:text-5xl md:px-20 rounded hover:bg-green-600 font-poppins flex mx-auto">
              {`Visit our Shop `}
              <CiLocationArrow1 size='60%' className=" text-6xl sm:text-4xl" />
            </button>
          </Link>
    </div>



    </div>
  )
}

export default EmptyCart