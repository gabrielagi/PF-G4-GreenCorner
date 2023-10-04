import { Link } from "react-router-dom";
const ProductTrending = ({ name, images, price, id }) => {

  return (
    <div className="flex flex-wrap ml-4">
   
      
   <Link to={`/detail/${id}`}>
        <img src={images} className="flex sm:w-[70px]  w-[70px]" />
      </Link>
       
      <strong className=" sm:relative sm:-top-[-20px] sm:ml-[10px]  relative -top-[-20px] ml-[10px] ">{name}</strong>
        
      <h3 className="sm:relative sm:ml-[-50px] sm:-top-[-50px] sm:l-[20px] sm:text-green-600 relative ml-[-50px] -top-[-40px] l-[20px] text-green-600">${price}</h3>
      
    </div>
  );
};
export default ProductTrending;
