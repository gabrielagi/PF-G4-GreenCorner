import React from "react";
import { Link } from "react-router-dom";
import { filterCategory,filterFavByCategory } from "../../Redux/actions/product/action"
import { useDispatch, useSelector } from "react-redux";

const Category = ({ name, selected, onSelect }) => {
  const dispatch = useDispatch();
 const favorites= useSelector((state)=>state.favorites)
  const handleChange = () => {
    dispatch(filterCategory(name));
    dispatch(filterFavByCategory(name));
    console.log(favorites)
    onSelect(name);
  };

  return (
    <div>
      <Link onClick={handleChange}>
        <h1 className={selected ? 'text-green-500' : ''}>{name}</h1>
      </Link>
    </div>
  );
};

export default Category;
