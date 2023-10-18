import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import imageProduct from "../../../img/plantsAbout.jpg";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import {
  postFavorites,
  deleteFavorite,
  getOneFavorites
} from "../../../Redux/actions/user/user-actions";
import Swal from 'sweetalert2';
import {
  getAllProducts,
  postProductCart,
  getProductCart,
} from "../../../Redux/actions/product/action";

const Card = ({ name, images, price, id }) => {
  const [corazon, setCorazon] = useState(false);
  const [addToCartClicked, setAddToCartClicked] = useState(false);
  const [addFavoriteClicked, setAddFavoriteClicked] = useState(false);
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const dispatch = useDispatch();

  let heart = "❤️";
  let heartBroke = "💔";
 const loginAlert = () => {
  Swal.fire({
    title: 'Error',
    text: 'You need to login first!',
    icon: 'error',
    showCancelButton: true,
    confirmButtonText: 'Go to login',
    confirmButtonColor: 'green',
    cancelButtonText: 'Cancel',
    cancelButtonColor: 'red', 
  }).then((result) => {
    if (result.isConfirmed) {
      loginWithRedirect();
    }
  });
};
  useEffect(() => {
    if (user && user.email) {
      dispatch(getOneFavorites(user.email, id)).then((result) => {
        setCorazon(result);
      });
    }

    if (!isAuthenticated) {
      console.log("aaaaaa");
    }
  }, [user, dispatch]);

  const notify = (message) => {

    if (message === "This product has been add in the cart") {
      toast.success(message + " 🛒", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(message + " 🛒", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const notifyII = (message, icons) =>
    toast.error(message, {
      icon: icons,
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleAdd = (product_id) => {
    if (isAuthenticated) {
      console.log("Se agrego al card el producto: ", product_id);
      if (!addToCartClicked) {
        setAddToCartClicked(true);

        let cart = {
          email: user.email,
          product_id: product_id,
          amount: 1,
        };
        console.log("Se manda al cart: ", cart);
        dispatch(postProductCart(cart)).then((result) => {
          dispatch(getProductCart(user.email));
          notify(result);
        });

        setTimeout(() => {
          setAddToCartClicked(false);
        }, 3000);
      }
    } else {

      loginAlert();
    }
  };

  const handleHeart = (product_id) => {
    if (isAuthenticated) {
      if (!addFavoriteClicked) {
        setAddFavoriteClicked(true);
      }

      let favorite = {
        email: user.email,
        product_id: product_id,
      };

      if (!corazon) {
        console.log(corazon);

        dispatch(postFavorites(favorite)).then((result) => {
          notifyII(result, heart);
        });

        setCorazon(!corazon);
      } else {
        dispatch(deleteFavorite(product_id, user.email)).then((result) => {
          notifyII(result, heartBroke);
        });

        setCorazon(!corazon);
      }

      setTimeout(() => {
        setAddFavoriteClicked(false);
      }, 3000);
    } else {
      loginAlert();
    }
  };

  return (
    <div className="bg-slate-100 bg-opacity-60 rounded-md box-border md:h-85 md:w-80 p-4 shadow-lg relative flex flex-col justify-between transition transform hover:scale-110 items-center">
      <div className="corazon absolute hover:scale-110 top-2 right-2 text-3xl">
        <button
          onClick={() => handleHeart(id)}
          disabled={addFavoriteClicked}
          className={`${
            addFavoriteClicked
              ? "cursor-not-allowed scale-125"
              : ""
          }`}
        >
          {corazon ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="">
        <Link to={`/detail/${id}`}>
          <img
            className="h-full w-full rounded-xl overflow-hidden  max-h-[180px] object-scale-down mb-3"
            src={images[0]}
            alt="producto"
          />
        </Link>
      </div>
      <div className="text-left w-full bg-slate-100" style={{ paddingBottom: "30px" }}>
        <p className="font-poppins break-words ml-6">{name}</p>
      </div>

      <div className="bg-slate-100 flex justify-between items-center mt-3 w-full relative">
        <p className="text-lg font-bold mx-6">${price}</p>
        <button
          className={`bg-transparent border-2 ${
            addToCartClicked
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-green-50 hover:scale-110 hover:shadow-lg hover:text-green-500"
          } absolute right-0 bottom-1 text-black font-normal w-16 h-16 rounded-3xl text-2xl mx-4`}
          onClick={() => handleAdd(id)}
          disabled={addToCartClicked}
        >
          {addToCartClicked ? <span className="text-green-500">✓</span> : "+"}
        </button>
      </div>
    </div>
  );
};

export default Card;
