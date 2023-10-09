import React from "react";
import { Link } from "react-router-dom";
import { filterCategory } from "../../Redux/actions/product/action"
import { useDispatch } from "react-redux";

const Category = ({ name, selected, onSelect }) => {
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(filterCategory(name));
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
