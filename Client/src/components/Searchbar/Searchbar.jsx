import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { getProductByName } from "../../Redux/actions/product/action";

const Searchbar = () => {
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = inputValue.trim();
    if (/^[a-zA-Z]+$/.test(input)) {
      dispatch(getProductByName(inputValue));
    } else {
      window.alert("El nombre ingresado contiene campos erroneos");
    }
    setInputValue("");
    setIsSearching(false);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setIsSearching(value.trim() === "");
  };

  return (
    <form className="relative font-poppins" onSubmit={handleSubmit}>
      <div className="relative flex items-center">
        <input
          type="search"
          placeholder="Search here"
          className="w-48 md:w-64 sm:w-32 p-2 md:p-2 sm:p-1 rounded-full bg-[#f6f6f6] text-gray-700"
          value={inputValue}
          onChange={handleChange}
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full"
          disabled={!inputValue}
        >
          <AiOutlineSearch />
        </button>
      </div>
    </form>
  );
};

export default Searchbar;
