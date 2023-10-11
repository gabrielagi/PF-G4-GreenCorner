import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductCart } from "../../Redux/actions/product/action";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
const Cart = ({id,name, price, image, amount}) => {
  const total = (price * amount)
  const pricee = price.replace(/\.00$/, '');
  const { user,} = useAuth0();
  const dispatch = useDispatch();

  const handleDelete = (idProduct, email) => {
    dispatch(deleteProductCart(idProduct, email));
  };


return(
    <div>
      <Link to={`/detail/${id}`}>
        <div className="image"><img src={image[0]}/></div>
        </Link>
        <div className="name"><strong>{name}</strong></div>
        <div className="price"><strong>${pricee}</strong></div>
        <div className="amount"><h3>{amount}</h3></div>
        <div className="total"><strong>${total}</strong></div>
        <div className="border-radius">
        <div className="exit"><button onClick={()=>handleDelete(id,user.email)}>X</button></div></div>          
        <div className="decoration"></div>
    </div>
)

}

export default Cart;