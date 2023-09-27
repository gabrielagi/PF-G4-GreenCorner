import "tailwindcss/tailwind.css";
import imageProduct from "../../img/plantsAbout.jpg";
import { AiFillHeart } from 'react-icons/ai';
import "./Card.css";

const Card = () => {
    return (
        <div className="bg-slate-100 rounded-md box-border h-50 w-52 p-4 shadow-lg relative flex flex-col justify-between transition transform hover:scale-110">
           
            <div className="corazon absolute top-2 right-2 w-6 h-6">
                
                <AiFillHeart />
            </div>

            <img className="rounded-xl overflow-hidden w-full h-full object-cover mb-3" src={imageProduct} alt="producto" />

            <div>
                <p className="text-xs font-medium">Nombre del Producto</p>
            </div>

            <div className="flex justify-between items-center mt-3">
                <p className="text-lg font-bold mr-2">$5.000</p>
                <button className="bg-green-500 hover:bg-green-700 font-bold py-1 px-2 rounded text-xs">Add</button>
            </div>
        </div>
    )
}

export default Card;
