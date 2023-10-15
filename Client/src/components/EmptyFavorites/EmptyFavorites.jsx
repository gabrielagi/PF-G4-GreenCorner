import React from 'react'
import { Link } from 'react-router-dom'
import empty from '../../img/emptycarreta.png'
import { CiLocationArrow1 } from 'react-icons/ci'
const EmptyFavorites = () => {



  return (
    <div className='mb-20 grid  text-center mx-auto'>
        <h1 className='text-4xl sm:text-6xl md:8xl font-bold text-gray-500 -mb-20'> You dont have any plant in your garden </h1>
        <img className= ' -mt-20 grayscale-[40%] object-cover mx-auto' src={empty}></img>
        <Link to="/shop">
            <button className=" bg-green-500 text-white font-semibold py-4 px-8 rounded hover:bg-green-600 font-poppins flex mx-auto sm:text-4xl text-center sm:px-10 sm:w-[30%] sm:h-30">
              {`Visit our Shop `}
              <CiLocationArrow1 className="ml-4 text-4xl sm:text-4xl" />
            </button>
          </Link>
    </div>
  )
}

export default EmptyFavorites