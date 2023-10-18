import { useEffect } from 'react';
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
//  import './Slider.styles.css'


const Slider = ({images, setActiveImg}) => {
useEffect(()=>{
const swiper = new Swiper('.swiper', {
  // Optional parameters

  centerInsufficientSlides:true,
  // centeredSlides:true,
  // centeredSlidesBounds:true,
  
  direction: 'horizontal',
  loop: true,
  slidesPerView:3 , 
  spaceBetween:14,
  autoplay: {
            delay: 3000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
            
          },
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
    enabled:false,
  },
});
  return ()=>{
    swiper.destroy()
  }
},
)
{/* <div className="swiper-wrapper h-[200px]">
  
{images.images.map((i, index) => <div  key={`thumb-${i.id}`} className="swiper-slide"
onClick={() => setActiveImg(index)} >
 <img className='h-[150px] w-[150px]'   src={i}  alt={`Thumbnail ${index}`}/> 
 </div>)} 

</div> */}
const handleImageClick = (image) => {
  setActiveImg(image);
  console.log(image)
};
  return (

<div>
     {/* <!-- Slider main container --> */}
<div className="swiper mx-auto w-[75%]">
  {/* <!-- Additional required wrapper --> */}
  <div className="swiper-wrapper h-[200px] w-[100px] ">
  
{images.map((i, index) => <div  key={`thumb-${i.id}`} className="h-[130px]  swiper-slide mt-10 md:h-[200px] md:w-[200px]"
 >
 <img onClick={() => handleImageClick(i)} className='h-full w-full
 md:h-full md:w-[150px] object-cover object-center'   src={i}  alt={`Thumbnail ${index}`}/> 
 </div>)} 

</div>
  {/* <!-- If we need pagination -->
  <div className="swiper-pagination"></div> */}
{/* 
  <!-- If we need navigation buttons --> */}
  <div className="swiper-button-prev"></div>
  <div className="swiper-button-next"></div>

  {/* <!-- If we need scrollbar --> */}
  <div className="swiper-scrollbar"></div>
</div>
</div>
  
  )
}

export default Slider