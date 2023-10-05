import React, { useState } from "react";
import axios from "axios";

import loadingGif from "../assets/loading.gif";

const cloudName = "dc9wewxge";
const preset = "green_corner";

const Create = () => {
  const [image, setImage] = useState(""); // Guarda la URL de la imagen que trae Cloudinary
  const [loading, setLoading] = useState(false); // Controla que se muestre el GIF mientras carga la imagen en Cloudinary
  const [newProduct, setNewProduct] = useState({});

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;


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


  // Método para hacer la transformación de la URL imagen a Cloudinary
  const uploadImage = async (event) => {
    console.log("File sin recortar: ", event.target.files);
    const fileUpload = event.target.files[0]; // Obtener el primer archivo seleccionado
    console.log("Esto es el archivo cargado: ", fileUpload);

    
    const base64 = await convertBase64(fileUpload);

    setLoading(true);
    axios
      .post("http://localhost:3001/product/cloudinary", { image: base64 })
      .then((res) => {
        console.log(res.data);
        alert("Image uploaded Succesfully");
      })
      .then(() => setLoading(false))
      .catch(console.log);


    /* const data = new FormData();
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
    } */
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
          multiple
        />
        <button type="submit" >  Subir Imagen</button>
      </form>
      {loading && <img src={loadingGif} />}
      {image && (
        <div>
          <h2>Imagen Subida:</h2>
          <img src={image} alt="Imagen Subida" width="300" />
        </div>
      )}
    </div>
  );
};

export default Create;
