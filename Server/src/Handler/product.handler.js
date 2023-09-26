const axios = require("axios");
const {
  getAllProduct,
  getProductById,
  postProduct,
  updateProduct,
  findRelatedProducts,
} = require("../Controller/product.controller");
const Product = require("../models/Product");



//Busca un producto por nombre que pasemos por query y si no enviamos ninguno devuelve todos los productos (search bar y home)
const getAllProductHandler = async (req, res) => {
  try {
    const name = req.query.name ? req.query.name.toLowerCase() : null;
    const allProduct = await getAllProduct();
    if (name) {
      console.log("Un name a buscar", name);
      const filteredProduct = allProduct.filter((product) =>
        product.name.toLowerCase().includes(name)
      );
      filteredProduct.length
      ? res.status(200).json(filteredProduct)
      : res.status(404).json({ error: "Producto no encontrado" });
    } else {
      res.status(200).json(allProduct);
    }
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

//Busca un producto por id (product detail)
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

//Crea un producto  (admin dashboard) 
const postProductHandler = async (req, res) => {
  try {
    const productData = req.body;
    // console.log(productData);
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

//Borra un producto por id (admin dashboard)
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

//Actualizar un Producto por id (admin dashboard)
const updateProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProductData = req.body; 
    const success = await updateProduct(id, updatedProductData);

    if (success) {
      res.status(200).json({ message: "Producto actualizado exitosamente" });
    } else {
      res.status(404).json({ error: `No se encontró un Producto con el ID ${id}` });
    }
  } catch (error) {
    console.error("Error en updateProductHandler:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

//Busca 5 productos relacionados por categoría (product detail)
const getRelatedProductsHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const relatedProducts = await findRelatedProducts(id);

    res.status(200).json(relatedProducts);
  } catch (error) {
    console.error('Error en getRelatedProductsHandler:', error.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};





module.exports = {
  getAllProductHandler,
  getProductByIdHandler,
  postProductHandler,
  deleteProductHandler,
  updateProductHandler,
  getRelatedProductsHandler,
};
