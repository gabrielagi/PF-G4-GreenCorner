import "tailwindcss/tailwind.css";
import imageProduct from "../../../img/plantsAbout.jpg";
import { AiFillHeart } from 'react-icons/ai';
import { useState } from "react";
import { Link } from "react-router-dom";


const Card = ({name, image, price, id}) => {
    const [corazon, setCorazon] = useState(false)

    return (
        <div className="bg-slate-100 rounded-md box-border h-85 w-80 p-4 shadow-lg relative flex flex-col justify-between transition transform hover:scale-110 items-center m-4">
           
            <div className="corazon absolute top-2 right-2 text-3xl">                
               <button onClick={() => setCorazon(!corazon)}>
                <AiFillHeart color={corazon ? "red" : "black"} style={{ opacity: '0.7' }}/>
               </button>
            </div>
            <Link to={`/detail/${id}`}>
            <img className="rounded-xl overflow-hidden w-60 h-75 object-cover mb-3" src={image} alt="producto" />
            </Link>
            <div className="text-left w-full">
                <p className="text-xl font-medium ml-6">{name}</p>
            </div>
          
            <div className="flex justify-between items-center mt-3 w-full">
                <p className="text-lg font-bold mx-6">${price}</p>
                <button className="bg-green-500 hover:bg-green-700 font-bold py-1 px-2 rounded text-xs mx-4">Add</button>
            </div>
        </div>
    )
}

export default Card;
