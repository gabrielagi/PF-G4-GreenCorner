
import {  useSelector} from "react-redux";
//import { Link } from "react-router-dom";

import Card from "./Card/Card";



const AllProducts = () => {

    const products = useSelector(state=>state.allProducts)
  

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