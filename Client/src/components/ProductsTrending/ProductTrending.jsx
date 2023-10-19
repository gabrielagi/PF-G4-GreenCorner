import { Link } from "react-router-dom";
const ProductTrending = ({ name, images, price, id }) => {

  return ( <Link to={`/detail/${id}`}>
    <div className="flex ml-4 items-center h-[120px] bg-neutral-200 bg-opacity-70 my-5 rounded-3xl pr-5 hover:scale-110 hover:bg-opacity-10 transition-all duration-300 ease-in-out shadow-md">

   
         <img src={images[0]} className="rounded-xl overflow-hidden h-full w-[200px] h-75 object-scale-down" />
    
 
    <div className="pl-4 w-full h-30">
         <strong className="text-green-700 md:text-3xl hover:text-[#54c23e] transition-all duration-200 font-bold">{name}</strong>
         <h3 className="text-right font-bold text-gray-500">${price}</h3>
    </div>
 </div></Link>
  );
};
export default ProductTrending;
