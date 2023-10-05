<<<<<<< HEAD
// import {useForm} from 'react-hook-form'
// import  { useState, useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from 'react-redux';
// import { addProduct, getAllProducts, getAllCategories } from '../Redux/actions/product/action'
=======
import React, { useState } from "react";
>>>>>>> 3cdf156c3da99a6e6154bdf16d066302d13d471d

import loadingGif from "../assets/loading.gif";

<<<<<<< HEAD
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
=======
const cloudName = "dc9wewxge";
const preset = "green_corner";

const Create = () => {
  const [image, setImage] = useState(""); // Guarda la URL de la imagen que trae Cloudinary
  const [loading, setLoading] = useState(false); // Controla que se muestre el GIF mientras carga la imagen en Cloudinary
  const [newProduct, setNewProduct] = useState({});

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  // Método para hacer la transformación de la URL imagen a Cloudinary
  const uploadImage = async (event) => {
    console.log("File sin recortar: ", event.target.files);
    const fileUpload = event.target.files[0]; // Obtener el primer archivo seleccionado
    console.log("Esto es el archivo cargado: ", fileUpload);

    const data = new FormData();
    data.append("file", fileUpload);
    data.append("upload_preset", preset);
    data.append("cloud_name", cloudName);

    console.log(data);
    setLoading(true);

    try {
      const result = await fetch(cloudinaryUrl, { method: "POST", body: data });
      // const result = await axios.post(cloudinaryUrl, data);
      console.log("Result de llamado a Cloudinary", result);

      if (!result.ok) {
        throw new Error("Error al cargar la imagen a Cloudinary");
      }

      const response = await result.json();
      console.log("URL de la imagen de Cloudinary: ", response.secure_url); // URL de la imagen en Cloudinary

      setImage(response.secure_url);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  // Método handleSubmit

  return (
    <div>
      <h1>Subir Imagen</h1>
      <form>
        <label>Titulo de producto:</label>
        <input type="text" name="title" />
        {/* Comienza la parte de subir imagen y convertirla */}
        <input
          type="file"
          name="file"
          placeholder="Subir una imagen"
          onChange={uploadImage}
        />
      </form>
      {loading && <img src={loadingGif} />}
      {image && (
        <div>
          <h2>Imagen Subida:</h2>
          <img src={image} alt="Imagen Subida" width="300" />
>>>>>>> 3cdf156c3da99a6e6154bdf16d066302d13d471d
        </div>
      )}
    </div>
  );
};

export default Create;
