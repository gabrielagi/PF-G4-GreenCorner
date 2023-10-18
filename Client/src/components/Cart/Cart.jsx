import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProductCart, getProductCart } from "../../Redux/actions/product/action";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FaTrashAlt } from "react-icons/fa";

const Cart = ({ id, name, price, image, amount }) => {
  const total = price * amount;
  const pricee = price.replace(/\.00$/, "");
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [deleteClicked, setDeleteClicked] = useState(false);

  const handleDelete = (idProduct, email) => {
    if (!deleteClicked) {
      setDeleteClicked(true);
      dispatch(deleteProductCart(idProduct, email)).then(() => {
        dispatch(getProductCart(user.email));
      });
      setTimeout(() => {
        setDeleteClicked(false);
      }, 3000);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 bg-gray-100 mx-10 rounded-2xl p-4 hover:shadow-md transition duration-300 ease-in-out">
      <div className="flex items-center justify-center sm:row-span-1">
        <Link to={`/detail/${id}`}>
          <div className="w-[150px] h-[150px] mx-auto">
            <img className="w-[100%] h-[100%] rounded-md" src={image[0]} alt={name} />
          </div>
        </Link>
      </div>

      <div className="flex items-center">
        <div className="space-y-10 justify-center">
          <p className="text-3xl font-medium">{name}</p>
          <strong>${pricee}</strong>
        </div>
      </div>

      <div className="grid row-span-2 grid-cols-2 col-span-2 md:grid-cols-2 md:col-span-2">
        <div className="grid col-span-2 justify-center">
          <div className="flex items-start justify-start">
            <p className="text-3xl flex items-start justify-start font-semibold">Amount: {amount}</p>
          </div>
        </div>
        <div className="justify-center grid col-span-2 md:flex md:justify-end items-center">
          <div className="flex total mr-2 sm:mx-10 sm:ml-10">
            <strong>${total}</strong>
            <button
              className={`exit mr-4 sm:mx-10 sm:mr-20 text-2xl transition-transform transform-gpu hover:scale-125 hover:text-xl ${
                deleteClicked ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handleDelete(id, user.email)}
              disabled={deleteClicked}
            >
              <FaTrashAlt size="18" className="hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
