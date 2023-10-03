import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
const ProductTrending = ({ name, images, price, id }) => {
  const dispatch = useDispatch();

  const handleChange = (id) => {
    //dispatch(filterCategory(name));
  };

  return (
    <div className="flex flex-wrap ml-4">
      <br /><br />
      
      <Link onClick={() => handleChange(id)}>
        <img src={images} className="flex sm:w-[70px]  w-[70px]" />
      </Link>
        {/*Aca esta el error de que se agrupan los nombres*/}
      <strong className="sm:absolute sm:ml-[80px] sm:-top-[-20px] absolute ml-[80px] -top-[-20px]">{name}</strong>
        
      <h3 className="sm:absolute sm:ml-[80px] sm:-top-[-40px] sm:l-[20px] sm:text-green-600 absolute ml-[80px] -top-[-40px] l-[20px] text-green-600">${price}</h3>
    </div>
  );
};
export default ProductTrending;
