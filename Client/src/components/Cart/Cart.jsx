import "./Cart.css";
const Cart = ({name, price, image, amount}) => {
  const total = (price * amount)
  const pricee = price.replace(/\.00$/, '');

return(
    <div>
        <div className="image"><img src={image}/></div>
        <div className="name"><strong>{name}</strong></div>
        <div className="price"><strong>${pricee}</strong></div>
        <div className="amount"><h3>{amount}</h3></div>
        <div className="total"><strong>${total}</strong></div>
        <div className="border-radius">
        <div className="exit"><button>X</button></div></div>          
        <div className="decoration"></div>
    </div>
)

}

export default Cart;