import { Link } from "react-router-dom";
const ProductTrending = ({ name, images, price, id }) => {

  return (
    <div className="flex flex-col ml-4">
   
      
   <Link to={`/detail/${id}`}>
        <img src={images[0]} className="" />
      </Link>
       
      <strong className="">{name}</strong>
        
      <h3 className="">${price}</h3>
      
    </div>
  );
};
export default ProductTrending;
