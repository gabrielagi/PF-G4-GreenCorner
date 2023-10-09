import { Link } from "react-router-dom";
const ProductTrending = ({ name, images, price, id }) => {

  return (
    <div className="flex ml-4 items-center">
   
      
   <Link to={`/detail/${id}`}>
        <img src={images[0]} className="rounded-xl overflow-hidden max-h-40 w-40 h-75 object-scale-down mb-3" />
      </Link>
       
      <div className="ml-auto">
        <strong className="text-right">{name}</strong>
        <h3 className="text-right">${price}</h3>
      </div>
      
    </div>
  );
};
export default ProductTrending;
