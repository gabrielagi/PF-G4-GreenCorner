import React, { useState, useEffect } from 'react';
import plantgif from "../../assets/plantgif.gif";
import Category from "./Categorie";

const Categories = ({ allCategories, reset }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);



  const handleCategorySelect = (name) => {
    setSelectedCategory(name);
  };

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
        <button onClick={()=>setSelectedCategory(true)}>
        All categories
      </button>
      </div>
    </div>
  );
};

export default Categories;
