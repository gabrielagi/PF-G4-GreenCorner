// import {useForm} from 'react-hook-form'
// import  { useState, useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from 'react-redux';
// import { addProduct, getAllProducts, getAllCategories } from '../Redux/actions/product/action'


// const Create=() =>{
//   const {register, handleSubmit }= useForm()
//   const categories = useSelector(state => state.categories)
//   const [productData, setProductData] = useState({
//     name: "",
//     price: "",
//     stock: "",
//     categories: null,
//     images: []
//   });
  
//   const dispatch = useDispatch()
  
//   useEffect(() => {
//     dispatch(getAllProducts());
//     dispatch(getAllCategories());
//   }, [dispatch]);


//   const handleInputChange = (event) => {
    
//     const { name, value } = event.target;
//     if (name === "categories") {
//       const selectedCategories = Array.from(event.target.selectedOptions).map(option => option.value);
//       const updatedCategories = (productData.categories || []).concat(selectedCategories);
//       setProductData({ ...productData, categories: updatedCategories });
//     } else {
//       setProductData({ ...productData, [name]: value });
//     }
//   };

  

//   return <div>
//      <h2>añade un producto</h2>
//     <form> 
//       <div>
//       <label>Titulo</label>
//       <input type='text' name='titulo'></input>
//       </div>

//       <div>
//       <label>Precio</label>
//       <input type='number' name='precio'></input>
//       </div>

//       <div>
//       <label>Imagenes</label>
//       <input type='file' name='imagenes'></input>
//       </div>

//       <div>
//       <label>Stock</label>
//       <input type='number' name='stock'></input>
//       </div>

//       <div>
//       <label>Categories</label>
//       <select>
//         {categories.map((c)=>{(<option value=''></option>)} )}
        
//       </select>
//       </div>
//     </form>

//   </div>


// }

// export default Create























import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getAllProducts, getAllCategories } from '../Redux/actions/product/action'


const Create = () => {
  




  const categories = useSelector(state => state.categories)
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    stock: "",
    categories: null,
    images: []
  });
  

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handlePhotoChange = async (event) => { //array de imagenes en B64
    const fileUpload = event.target.files[0];
    const base64 = await convertBase64(fileUpload)
    const updatedPhotos = [...productData.images, base64]; 
    setProductData({ ...productData, images: updatedPhotos });
  };
  

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);


  const handleInputChange = (event) => {
    
    const { name, value } = event.target;
    if (name === "categories") {
      const selectedCategories = Array.from(event.target.selectedOptions).map(option => option.value);
      const updatedCategories = (productData.categories || []).concat(selectedCategories);
      setProductData({ ...productData, categories: updatedCategories });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // const formData = new FormData();
    // productData.photos.forEach((photo, index) => {
    //   formData.append(`photo${index}`, photo);
    // });

    try {
      dispatch(addProduct(productData))
    } catch (error) {
      console.error("Error al enviar las fotos:", error);
    }
  };

  console.log(categories)
  console.log(productData)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Categories:</label>
          <select name="categories" onChange={handleInputChange} multiple>
          {categories?.map((cate, i) =>(<option key={i} value={cate.id} >{cate.name}</option>) 
           )}
          </select>
        </div>

        <div>
          <label>Stock:</label>
          <input
            type="text"
            name="stock"
            value={productData.stock}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Images:</label>
          <input
            type="file"
            name="photo"
            onChange={handlePhotoChange}
            multiple
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {productData.images.length > 0 && (
        <div>
          <h2>Archivos seleccionados:</h2>
          <ul>
            {productData.images.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Create;
