import { useDispatch } from "react-redux";
import { useEffect  } from "react";
import "tailwindcss/tailwind.css"
import Cards from "../components/Cards/Cards"
import { getAllProducts } from "../Redux/actions/product/action"

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllProducts());
},[dispatch]);

  return (
    <div>
      <h1>Shop</h1>  
    <Cards />
    </div>
  );
}

export default Shop;