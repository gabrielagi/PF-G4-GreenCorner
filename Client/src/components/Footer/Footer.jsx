
import './Footer.styles.css'
import "tailwindcss/tailwind.css"
const Footer = () => {
  return (
    <div className=" bg-black font-poppins">
        <div className="bg-black h-">
          <div className="grid  justify-center mx-auto sm:grid-cols-2  md:grid-cols-4 mr-20 -ml-[100px] md:px-60 md:py-10 hover:text-white">
            <div className="footer-col mx-auto grid pl-20 my-10 space-y-10 ">
              <div><h4 className=''>Linksssss</h4>
                </div>
              <ul>
                <li><a href="#">Linkkkkkkkkkkkkkkkk1</a></li>
                <li><a href="#">Linkkkkkkkkkkkkkkkk2</a></li>
                <li><a href="#">Linkkkkkkkkkkkkkkkk3</a></li>
                <li><a href="#">Linkkkkkkkkkkkkkkkk4</a></li>
              </ul>
            </div>
            <div className="footer-col mx-auto grid pl-20 my-10 space-y-10 ">
              <h4>Linkssssss2</h4>
              <ul>
                <li><a href="#">Link1</a></li>
                <li><a href="#">Link2</a></li>
                <li><a href="#">Link3</a></li>
                <li><a href="#">Link4</a></li>
              </ul>
            </div>
            <div className="footer-col  mx-auto grid pl-20 my-10 space-y-10 md:pl-2">
              <h4>Linkssssss3</h4>
              <ul>
                <li><a href="#">Link1</a></li>
                <li><a href="#">Link2</a></li>
                <li><a href="#">Link3</a></li>
                <li><a href="#">Link4</a></li>
              </ul>
            </div>
            <div className="footer-col  grid mx-auto pl-20 my-10 space-y-10 md:pl-0">
              <h4>Linkssssssssss</h4>
              <div className="social-link">
               <a href="#"></a>
                <a href="#"></a>
               <a href="#"></a>
               <a href="#"></a>
              </div >
              <div className='text-6xl font-bold text-center text-white'>
                GreenCorner
              </div>
            </div>
          </div>
          <h3 className='text-center text-white py-20 text-3xl'>CopyRight 2023 | GreenCorner.com | All rights reserved</h3>
       
        </div>

    </div>

    
  )
}

export default Footer