
import {  useSelector} from "react-redux";
import { Link } from "react-router-dom";

import Card from "./Card/Card";



const Cards = (allProducts) => {


    return(
        <div className="flex flex-wrap ml-4">
        {allProducts.map((p, i)=>{
             return   <Link to={`/detail/${p.product_id}`} key={i}>
                <Card
                key={i}
                name={p.name}
                image={p.image}
                price={p.price}                
            />
                </Link>

             
        })}
        
    </div>
       
)};
   
export default Cards