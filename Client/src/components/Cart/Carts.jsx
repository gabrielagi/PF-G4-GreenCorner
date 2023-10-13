import "tailwindcss/tailwind.css";
import "./Carts.css";
import { useEffect } from "react";
import Cart from "./Cart";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProductCart } from "../../Redux/actions/product/action";
import { useAuth0 } from "@auth0/auth0-react";

const Carts = () => {
  const products = useSelector((state) => state.productCart);
  const dispatch = useDispatch();
  const { user } = useAuth0();

  let total = 0;

  products.map((product) => {
    total += product.Product.price * product.amount;
  });

  useEffect(() => {
    if (user && user.email) {
      dispatch(getProductCart(user.email));
    }
  }, [user, dispatch]);

  const handleCheckout = async () => {
      try {
        
        for (let i = 0; i < products.length; i++) {
  
          let product = []
          product.push({
           id : products[i].Product.product_id,
           amount : products[i].amount,
           name : products[i].Product.name,
           price : products[i].Product.price
          })

          console.log(product);

        
        
        const { data } = await axios.post(
          "http://localhost:3001/payment/create-order",
          { product, amount: products[i].amount }
        );
        console.log("Data en el componente Detail", data);
        console.log("Init point en el componente Detail", data);
      
        location.href = data.result;
      }
      } catch (error) {
        console.log(error.message);
      }

  };




  return (
    <div>
      <div className="title">Your Cart</div>
      <div className="decorationCarts"></div>
      <div className="content">
      <div className="name"><strong>Product</strong></div>
      <div className="price"><strong>Price</strong></div>
      <div className="amount"><strong>Amount</strong></div>
      <div className="total"><strong>Total</strong></div>
      </div>
      <div className="cart">
        {products.length !== 0 ? (
          products.map((p, i) => {
            return (
             
              <Cart
                key={i}
                id={p.Product.product_id}
                amount={p.amount}
                name={p.Product.name}
                price={p.Product.price}
                image={p.Product.images}
              />
            );
          })
        ) : (
          <div><h1>Hola</h1></div>
        )}
      </div>

      <div className="containerCarts">
        <div className="line"></div>
        <div className="ordenSummary"><strong>Orden Summary</strong></div>
        <div className="line2"></div>
        <div className="containerCartsTotal"><strong>${total}</strong></div>   
        <div className="containerCartsTtotal"><strong>Total</strong></div>    
        </div>   
        <button onClick={handleCheckout}><div className="checkoutContainer"><div className="checkout">Checkout</div></div></button>    
        
    </div>
  );
};

export default Carts;
