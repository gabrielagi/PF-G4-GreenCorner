import React from 'react'
import cart from '../../img/cart2.png'
import { Link } from 'react-router-dom'
import { CiLocationArrow1 } from 'react-icons/ci'
const EmptyCart = () => {
  return (

    <div className='grid text-center '>

    <h1 className='text-5xl md:text-[50px]  font-poppins font-extrabold text-gray-500 text-center mt-20'>Your shop cart is empty </h1>
    
    <img src={cart} className='  w-[30%] mx-auto'></img>
    <div className='w-[45%]  sm:w-[250px] md:w-[300px] md:h-[90px] mx-auto   '>  
      <Link to="/shop">
      <div className='-mt-10 bg-green-500
hover:bg-green-600  grid grid-cols-4'>
       <button className=" w-full  sm:px-10 sm:py-6  md:h-[60px] col-span-3 bg-green-500 text-white font-semibold md:py-8 md:text-4xl md:px-10 rounded hover:bg-green-600 font-poppins  mx-auto">
              {`Visit our Shop `}
              
            </button>
            <CiLocationArrow1 color="white" size='50%' className="flex justify-center items-center mt-4 md:mt-9 text-4xl sm:text-4xl " />
    </div>
           
       </Link>
    </div>



    </div>
  )
}

export default EmptyCart