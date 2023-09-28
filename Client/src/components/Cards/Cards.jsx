import { useEffect, useSelector } from "react";
import { useDispatch } from "react-redux";
//import { Link } from "react-router-dom";
import { getAllProducts } from "../../Redux/actions/product/action"
import Card from "./Card/Card";



const AllProducts = () => {

    const products = useSelector(state=>state.allProducts)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllProducts());
    },[dispatch]);

    return(
        <div className="flex flex-wrap ml-4">
        {products.map((p, i)=>{
            return <Card
                key={i}
                name={p.name}
                image={p.image}
                price={p.price}                
            />
        })}
    </div>
       
)};
   
export default AllProducts