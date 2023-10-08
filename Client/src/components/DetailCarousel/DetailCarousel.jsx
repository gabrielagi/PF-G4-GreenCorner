import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useState } from 'react';
const handleDragStart = (e) => e.preventDefault();

const images=[
    {
        "id": "0",
        "author": "Alejandro Escamilla",
        "width": 5000,
        "height": 3333,
        "url": "https://unsplash.com/photos/yC-Yzbqy7PY",
        "download_url": "https://picsum.photos/id/0/5000/3333"
      },
      {
        "id": "1",
        "author": "Alejandro Escamilla",
        "width": 5000,
        "height": 3333,
        "url": "https://unsplash.com/photos/LNRyGwIJr5c",
        "download_url": "https://picsum.photos/id/1/5000/3333"
      },
      {
        "id": "2",
        "author": "Alejandro Escamilla",
        "width": 5000,
        "height": 3333,
        "url": "https://unsplash.com/photos/N7XodRrbzS0",
        "download_url": "https://picsum.photos/id/2/5000/3333"
      },
      {
        "id": "3",
        "author": "Alejandro Escamilla",
        "width": 5000,
        "height": 3333,
        "url": "https://unsplash.com/photos/Dl6jeyfihLk",
        "download_url": "https://picsum.photos/id/3/5000/3333"
      },
      {
        "id": "4",
        "author": "Alejandro Escamilla",
        "width": 5000,
        "height": 3333,
        "url": "https://unsplash.com/photos/y83Je1OC6Wc",
        "download_url": "https://picsum.photos/id/4/5000/3333"
      },
    
]







const Carousel = () => {

const [mainIndex, setMainIndex] = useState(0);
const handleMainSlideChanged = (e) => {
    setMainIndex(e.item);
  };
const items = images.map((i)=> <img key={i} src={i.download_url} role="presentation" />)
const thumbs = images.map((i, index) => <div  key={`thumb-${i.id}`}
className="thumbnail"
onClick={() => setMainIndex(index)} > <img  src={i.download_url} role="presentation" alt={`Thumbnail ${index}`}/> </div>);

  return (<div className='w-[400px]'>
     <AliceCarousel  disableButtonsControls disableDotsControls activeIndex={mainIndex} mouseTracking animationType="slide" items={items} onSlideChanged={handleMainSlideChanged}/>
      <div className=" my-10 imagen transition-opacity flex flex-row justify-between gap-2  h-60">
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