import "tailwindcss/tailwind.css";
// import "./Carts.css";
import { useEffect, useState } from "react";
import Cart from "./Cart";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProductCart } from "../../Redux/actions/product/action";
import { useAuth0 } from "@auth0/auth0-react";
import EmptyCart from "../EmptyCart/EmptyCart";
import Loading from "../Loading/Loading";


const Carts = () => {
  const products = useSelector((state) => state.productCart);
  const dispatch = useDispatch();
  const { user, isLoading } = useAuth0();




  let total = 0;
  let [info, setInfo] = useState({});

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
      // Preguntar si el usuario es admin

      let product = [];
      for (let i = 0; i < products.length; i++) {
        const price = Number(products[i].Product.price);
        console.log("Price del producto a comprar: ", price);
        const amount = Number(products[i].Product.amount);
        console.log("Amount del producto a comprar: ", amount);
        console.log("Email del producto a comprar: ", products[i].email);
        if (!isNaN(price)) {
          product.push({
            id: products[i].Product.product_id,
            amount: Number(products[i].amount),
            name: products[i].Product.name,
            price: price,
          });
        } else {
          console.error(
            `Invalid price for product ${products[i].Product.product_id}`
          );
        }
      }
      const { data } = await axios.post(
        "https://greencorner.onrender.com/payment/create-order",
        { product, email: user.email }
      );
      console.log("Data en el componente Detail", data);
      console.log("Init point en el componente Detail", data);

      location.href = data.result;
    } catch (error) {
      console.log(error.message);
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className=" bg-gray-200 md:mx-20 font-poppins">
      <h1 className="text-7xl font-bold text-center my-12 pt-12  text-green-500">
        Your Cart
      </h1>
      {/* <div className="grid grid-cols-4">
        <div className="flex justify-center items-center ">  <p className=""></p></div>
        <div className="flex justify-center items-center "><p className="">NAME</p>  </div>
        <div className="flex justify-center items-center "> <p className="">AMOUNT</p></div>
        <div className="flex justify-center items-center "> <p className="">TOTAL</p></div>
        
          
         

        </div> */}

      <div className="cart">
        
        {products.length !== 0 ? (
          products.map((p, i) => {
            return (
              <div className="my-4" key={i}>
                <Cart
                  id={p.Product.product_id}
                  amount={p.amount}
                  name={p.Product.name}
                  price={p.Product.price}
                  image={p.Product.images}
                />
              </div>
            );
          })
        ) : (
          <div>
            <EmptyCart />
          </div>
        )}
      </div>

      <div className=" grid grid-cols-1 md:flex md:flex-col my-3 pb-5 align-baseline pr-20 text-center justify-end items-end ">
        <div className=" flex flex-grow ">
          <div className="  bg-white py-2  ml-24 md:mx-auto text-3xl font-semibold flex justify-center w-[130px]  ">
            Total: <p className="pl-4 text-green-600">{total}</p>
          </div>
          <button
            className=" mx-5 bg-white w-[200px]  text-2xl font-medium"
            onClick={handleCheckout}
          >
            Continue to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carts;
