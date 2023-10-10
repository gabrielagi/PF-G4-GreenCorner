import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
import './Slider.styles.css'


const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'vertical',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });



const Slider = () => {
  return (
    <div>
        
       {/* <!-- Slider main container --> */}
<div className="swiper">
  {/* <!-- Additional required wrapper --> */}
  <div className="swiper-wrapper">
    {/* <!-- Slides --> */}
    <div className="swiper-slide bg-red-500">Slide 1</div>
    <div className="swiper-slide bg-blue-500">Slide 2</div>
    <div className="swiper-slide bg-green-500">Slide 3</div>
    ...
  </div>
  {/* <!-- If we need pagination --> */}
  <div className="swiper-pagination"></div>
{/* 
  <!-- If we need navigation buttons --> */}
  <div className="swiper-button-prev bg-black"> </div>
  <div className="swiper-button-next"> </div>

  {/* <!-- If we need scrollbar --> */}
  <div className="swiper-scrollbar"></div>
</div>
    </div>
  )
}

export default Slider