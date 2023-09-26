const axios = require("axios");
const {
  getAllProduct,
  getProductById,
  postProduct,
  updateProduct,
} = require("../Controller/product.controller");
const Product = require("../models/Product");



//Busca un producto por nombre que pasemos por query y si no enviamos ninguno devuelve todos los productos 
const getAllProductHandler = async (req, res) => {
  try {
    const name = req.query.name ? req.query.name.toLowerCase() : null;
    const allProduct = await getAllProduct();
    if (name) {
      console.log("Un name a buscar", name);
      const filteredProduct = allProduct.filter((product) =>
        product.name.toLowerCase().includes(name)
      );
      res.status(200).json(filteredProduct);
    } else {
      res.status(200).json(allProduct);
    }
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

//Busca un producto por id
const getProductByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

//Crea un producto
const postProductHandler = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await postProduct(productData);
    
    if (newProduct) {
      res.status(201).json({ success: true, message: "Producto creado con éxito", data: newProduct });
    } else {
      res.status(400).json({ success: false, message: "No se pudo crear el producto" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//Borra un producto por id
const deleteProductHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const productDelete = await Product.findByPk(id);
    if (!productDelete) {
      return res.status(404).json({ error: 'The ID to delete does not exist' });
    } else {
      await productDelete.destroy();
      return res.status(204).send(); 
    }
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Handler para actualizar un Producto
const updateProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProductData = req.body; // Recibe los nuevos datos para actualizar el Product

    const success = await updateProduct(id, updatedProductData);

    if (success) {
      res.status(200).json({ message: "Product actualizado exitosamente" });
    } else {
      res
        .status(404)
        .json({ error: `No se encontró un Product con el ID ${id}` });
    }
  } catch (error) {
    console.error("Error en updateProductHandler:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  getAllProductHandler,
  getProductByIdHandler,
  postProductHandler,
  deleteProductHandler,
  updateProductHandler,
};
