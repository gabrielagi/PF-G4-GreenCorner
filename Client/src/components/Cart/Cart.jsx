import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductCart } from "../../Redux/actions/product/action";
const Cart = ({id,name, price, image, amount}) => {
  const total = (price * amount)
  const pricee = price.replace(/\.00$/, '');
  const dispatch = useDispatch();

  const handleDelete = (idProduct) => {
    dispatch(deleteProductCart(idProduct));
  };


return(
    <div>
        <div className="image"><img src={image[0]}/></div>
        <div className="name"><strong>{name}</strong></div>
        <div className="price"><strong>${pricee}</strong></div>
        <div className="amount"><h3>{amount}</h3></div>
        <div className="total"><strong>${total}</strong></div>
        <div className="border-radius">
        <div className="exit"><button onClick={()=>handleDelete(id)}>X</button></div></div>          
        <div className="decoration"></div>
    </div>
)

}

export default Cart;