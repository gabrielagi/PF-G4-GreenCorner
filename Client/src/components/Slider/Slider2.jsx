import { useEffect } from 'react';
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
//  import './Slider.styles.css'


const Slider = (images, setActiveImg) => {
useEffect(()=>{
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView:3 , 
  spaceBetween:5,
  autoplay: {
            delay: 1000,
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
<div className="swiper">
  {/* <!-- Additional required wrapper --> */}
  <div className="swiper-wrapper h-[200px]">
  
{images.images.map((i, index) => <div  key={`thumb-${i.id}`} className="swiper-slide h-[150px] w-[150px]"
 >
 <img onClick={() => handleImageClick(i)} className='h-full w-[150px] object-cover object-center'   src={i}  alt={`Thumbnail ${index}`}/> 
 </div>)} 

</div>
  {/* <!-- If we need pagination --> */}
  <div className="swiper-pagination"></div>
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