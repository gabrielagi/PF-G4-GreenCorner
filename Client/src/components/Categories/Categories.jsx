import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import plantgif from "../../assets/plantgif.gif";
import Category from "./Categorie";
import { resetAllProducts } from "../../Redux/actions/product/action";

const Categories = ({ allCategories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();


  const handleCategorySelect = (name) => {
    setSelectedCategory(name);    
  };

  const handleClear = () => {
    setSelectedCategory(true);
    dispatch(resetAllProducts());
  }

  return (
    <div className="grid items-center text-start ml-4">
      <h1 className="text-4xl font-poppins italic mt-4 mb-2">
        All Categories
      </h1>
      <br />
      
      <div className="mt-4 mb-2">
        {allCategories ? (
          allCategories.map((p, i) => (
            <Category
              key={i}
              name={p.name}
              id={p.id}
              selected={p.name === selectedCategory}
              onSelect={handleCategorySelect}
            />
          ))
        ) : (
          <div>
            <img src={plantgif} alt="loading" />
          </div>
        )}
        <button className="font-bold hover:scale-110" onClick={handleClear}>
          All categories
        </button>
      </div>
    </div>
  );
};

export default Categories;
