import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useState } from 'react';
const handleDragStart = (e) => e.preventDefault();








const Carousel = ( images ) => {
const imagenes=images.images
const [mainIndex, setMainIndex] = useState(0);
const handleMainSlideChanged = (e) => {
    setMainIndex(e.item);
  };
  
const items = imagenes.map((i)=> <img className='w-max h-[500px]' key={i} src={i} role="presentation" />)
console.log(items)
const thumbs = imagenes.map((i, index) => <div  key={`thumb-${i.id}`}
className="thumbnail"
onClick={() => setMainIndex(index)} > <img className='w-full h-[120px]'   src={i} role="presentation" alt={`Thumbnail ${index}`}/> </div>);

  return (<div className='w-full'>
     <AliceCarousel  disableButtonsControls disableDotsControls activeIndex={mainIndex} mouseTracking animationType="slide" items={items} onSlideChanged={handleMainSlideChanged}/>
      <div className=" my-10 imagen transition-opacity flex flex-row justify-between gap-2  w-full h-[80px]">
        {thumbs.map((thumb, index) => (
          <div key={`thumb-${index}`} className="">
            {thumb}
          </div>
        ))}
      </div>
  </div>
    
  );
}
export default Carousel;