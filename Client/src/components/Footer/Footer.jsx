
import { Link } from 'react-router-dom'
import './Footer.styles.css'
import "tailwindcss/tailwind.css"
import { FaPhoneAlt , FaMapMarkedAlt} from "react-icons/fa";
import { AiOutlineMail,AiFillLinkedin, AiFillGithub } from "react-icons/ai";
const Footer = () => {
  return (
    <div className=" bg-black font-poppins">
        <div className="bg-black h-">
          <div className="grid justify-center gap-y-4 md:px-40  sm:grid-cols-2  md:grid-cols-4 text-gray-400">
            <div className=" mt-16  mx-auto h-full ">
              <div className=' pr-40 '><h4 className='text-5xl text-white  '>Links</h4>
                </div>
              <ul className='text-3xl  space-y-2 mt-5'>
                <li className='transition duration-400 ease-in-out hover:text-white hover:text-4xl'><Link to='/'>Home </Link> </li>
                <li className='transition duration-400 ease-in-out hover:text-white hover:text-4xl'><Link to="/shop">Shop</Link></li>
                <li className='transition duration-400 ease-in-out hover:text-white hover:text-4xl'><Link to="/guides">Plant guide</Link></li>
                <li className='transition duration-400 ease-in-out hover:text-white hover:text-4xl'><Link to="/about-us">About us</Link></li>
                <li className='transition duration-400 ease-in-out hover:text-white hover:text-4xl'><Link to="/contact-us">Contact us</Link></li>
              </ul>
            </div>
            <div className=" mt-16   mx-auto h-full">
            <div className='pr-40 '><h4 className='text-5xl text-white  '>Legal</h4>
                </div>
                <ul className='text-3xl space-y-2 mt-5'>
                <li className='transition duration-400 ease-in-out hover:text-white hover:text-4xl'><a href="#">Terms of use</a></li>
                <li className='transition duration-400 ease-in-out hover:text-white hover:text-4xl'><a href="#">Privacy policy</a></li>
                <li className='transition duration-400 ease-in-out hover:text-white hover:text-4xl'><a href="#">Cookie policy</a></li>
            
              </ul>
            </div>
            <div className=" mt-16 ml-20  mx-auto h-full">
            <div className='pr-40 '><h4 className='text-5xl text-white  '>Developers</h4>
                </div>
                <ul className='text-3xl space-y-2 mt-5'>
                <li className='flex transition duration-400 ease-in-out hover:text-white hover:text-4xl'><AiFillLinkedin/> <AiFillGithub/> <p>Gabriela Iriart</p></li>
                <li className='flex transition duration-400 ease-in-out hover:text-white hover:text-4xl'><AiFillLinkedin/> <AiFillGithub/> <p>Andrés Marques</p></li>
                <li className='flex transition duration-400 ease-in-out hover:text-white hover:text-4xl'><AiFillLinkedin/> <AiFillGithub/> <p>Francisco Sosa</p></li>
                <li className='flex transition duration-400 ease-in-out hover:text-white hover:text-4xl'><AiFillLinkedin/> <AiFillGithub/> <p>Facundo Storino</p></li>
                <li className='flex transition duration-400 ease-in-out hover:text-white hover:text-4xl'><AiFillLinkedin/> <AiFillGithub/> <p>Matias Avesani</p></li>
                <li className='flex transition duration-400 ease-in-out hover:text-white hover:text-4xl'><AiFillLinkedin/> <AiFillGithub/> <p>Sebastian Diaz</p></li>
                
              </ul>
            </div>
            <div className="  justify-center h-full">
            
              <div className="grid py-20">
               <div className='text-6xl font-bold text-center text-white'>
                GreenCorner
              </div>
              <div className='grid text-gray-300 my-3'>
                  <div className='flex'>
                     <FaPhoneAlt className='mx-4 ' ></FaPhoneAlt>
                     <p>+123 456 789</p>
                    </div>  
                    <div className='flex'>
                       <AiOutlineMail className='mx-4'>GreenCorner@gmail.com</AiOutlineMail> <p>GreenCorner@gmail.com</p></div>
                    <div className='flex'> 
                    <FaMapMarkedAlt className='mx-4'></FaMapMarkedAlt>  <p>P. Sherman Calle Wallaby 42, Sidney</p>
                    </div>
                  
                  
              </div>
           
              </div >
             
            </div>
          </div>
          <h3 className='text-center text-white py-20 text-3xl'>CopyRight 2023 | GreenCorner.com | All rights reserved</h3>
       
        </div>

    </div>

    
  )
}

export default Footer