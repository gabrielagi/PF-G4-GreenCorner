// import Swiper from 'swiper/bundle'
// import 'swiper/css/bundle'
// import './Slider.styles.css'
// import { useState, useEffect } from 'react';
// import { yellow } from '@mui/material/colors';
// import ImagesBanner from '../Banner/imageshover.home';





// const Slider = (props) => {
//   let swiperInstance=null
// const {images, setActiveImg}=props
//   const imagenes=images
//   console.log(imagenes)

//   useEffect(() => {

//     const destroySwiper = () => {
//       if (swiperInstance) {
//         swiperInstance.destroy();
//         swiperInstance = null;
//       }
//     };
    
//     const swiper = new Swiper('swiper-container', {
//       direction: 'horizontal',
//       loop: true,
//       autoplay: {
//         delay: 1000,
//         pauseOnMouseEnter: true,
//         disableOnInteraction: false,
//       },
//       slidesPerView:1,
//       spaceBetween:15,
//       pagination: {
//         el: '.swiper-pagination',
//       },
//       navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//       },
//       scrollbar: {
//         el: '.swiper-scrollbar',
//       },
//     });
  
  
   

//     // Limpia el swiper cuando el componente se desmonta
//     return () => {
//     destroySwiper();
//     };
//   }, ); // El array de dependencias vacío indica que esto solo debe ejecutarse una vez después del montaje inicial
  


//   return (
//     <div>
       
//        {/* <!-- Slider main container --> */}
// <div className="swiper">
//   {/* <!-- Additional required wrapper --> */}
//   <div className="swiper-wrapper">
//     {/* <!-- Slides --> */}

//     <div className="swiper-slide">
//           <img
//             src="https://http2.mlstatic.com/D_NQ_939987-MLA50832730063_072022-OO.webp"
//             alt=""
//           />
//         </div>
//         <div className="swiper-slide">
//           <img
//             src="https://http2.mlstatic.com/D_NQ_817829-MLA50860384312_072022-OO.webp"
//             alt=""
//           />
//         </div>
//         <div className="swiper-slide">
//           <img
//             src="https://http2.mlstatic.com/D_NQ_955859-MLA50696530729_072022-OO.webp"
//             alt=""
//           />
//         </div>
//         <div className="swiper-slide">
//           <img
//             src="https://http2.mlstatic.com/D_NQ_999003-MLA50928299324_072022-OO.webp"
//             alt=""
//           />
//         </div>
//         <div className="swiper-slide">
//           <img
//             src="https://http2.mlstatic.com/D_NQ_954078-MLA50783791927_072022-OO.webp"
//             alt=""
//           />
//         </div>

//     {/* {imagenes.map((i, index) => <div  key={`thumb-${i.id}`}
// className="thumbnail"
// onClick={() => setActiveImg(index)} > <img className='swiper-slide w-full h-[120px]'   src={i}  alt={`Thumbnail ${index}`}/> </div>)} */}
//   </div>
//   {/* <!-- If we need pagination --> */}
//   <div className="swiper-pagination"></div>
// {/* 
//   <!-- If we need navigation buttons --> */}
//   <div className="swiper-button-prev bg-black"> </div>
//   <div className="swiper-button-next"> </div>

//   {/* <!-- If we need scrollbar --> */}
//   <div className="swiper-scrollbar  "></div>
// </div>
//     </div>
//   )
// }

// export default Slider