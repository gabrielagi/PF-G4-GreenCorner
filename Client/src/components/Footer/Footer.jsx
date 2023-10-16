
import { Link } from 'react-router-dom'
import './Footer.styles.css'
import "tailwindcss/tailwind.css"
const Footer = () => {
  return (
    <div className=" bg-black font-poppins">
        <div className="bg-black h-">
          <div className="grid  justify-center  sm:grid-cols-2  md:grid-cols-4 text-gray-500 hover:text-white">
            <div className="bg-blue-400 ">
              <div><h4 className=''>Links</h4>
                </div>
              <ul>
                <li><Link to='/'>Home </Link> </li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/guides">Plant guide</Link></li>
                <li><Link to="/about-us">About us</Link></li>
              </ul>
            </div>
            <div className="bg-gray-400 ">
              <h4>Linkssssss2</h4>
              <ul>
                <li><a href="#">Link1</a></li>
                <li><a href="#">Link2</a></li>
                <li><a href="#">Link3</a></li>
                <li><a href="#">Link4</a></li>
              </ul>
            </div>
            <div className="bg-yellow-400">
              <h4>Linkssssss3</h4>
              <ul>
                <li><a href="#">Link1</a></li>
                <li><a href="#">Link2</a></li>
                <li><a href="#">Link3</a></li>
                <li><a href="#">Link4</a></li>
              </ul>
            </div>
            <div className="bg-red-400">
              <h4>Linkssssssssss</h4>
              <div className="social-link">
               <a href="#"></a>
                <a href="#"></a>
               <a href="#"></a>
               <a href="#"></a>
              </div >
              {/* <div className='text-6xl font-bold text-center text-white'>
                GreenCorner
              </div> */}
            </div>
          </div>
          <h3 className='text-center text-white py-20 text-3xl'>CopyRight 2023 | GreenCorner.com | All rights reserved</h3>
       
        </div>

    </div>

    
  )
}

export default Footer