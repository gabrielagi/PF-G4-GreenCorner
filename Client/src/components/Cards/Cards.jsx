
import {  useSelector} from "react-redux";
//import { Link } from "react-router-dom";

import Card from "./Card/Card";



const Cards = (allProducts) => {


    return(
        <div className="flex flex-wrap ml-4">
        {allProducts.map((p, i)=>{
            return <Card
                key={i}
                name={p.name}
                image={p.image}
                price={p.price}                
            />
        })}
    </div>
       
)};
   
export default Cards