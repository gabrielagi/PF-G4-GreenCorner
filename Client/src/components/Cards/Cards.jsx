
import {  useSelector} from "react-redux";
//import { Link } from "react-router-dom";

import Card from "./Card/Card";



const AllProducts = () => {

    const products = useSelector(state=>state.allProducts)
  

    return(
        <div className="flex relative flex-wrap -left-[-500px] space-x-[100px] ">
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