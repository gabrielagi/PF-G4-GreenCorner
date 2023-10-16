const axios = require("axios");

//Todos los const de abajo son llamadas a la base de datos
const {
  getAllProduct,
  getProductById,
  getProductCart,
  postProduct,
  postProductCart,
  updateProduct,
  findRelatedProducts,
  getAllTrending,
  deleteProduct,
  deleteProductCart,
  updateProductCart,
} = require("../Controller/product.controller");
const Product = require("../models/Product");
const ShoppingCart = require("../models/ShoppingCart");

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
    console.error("Error en getAllProductHandler:", error.message);
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
    res.status(500).json({ error: "Error en el servidor." });
  }
};

//Crea un producto  (admin dashboard)
const postProductHandler = async (req, res) => {
  try {
    const productData = req.body;
    const newProductCart = await postProduct(productData);

    if (newProductCart) {
      res.status(201).json({
        success: true,
        message: "Producto creado con éxito",
        data: newProductCart,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "No se pudo crear el producto" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//Inserta un producto en el carrito
const postProductCartHandler = async (req, res) => {
  try {
    const productData = req.body;
    const productCart = await postProductCart(productData);

    if (productCart) {
      res.status(201).json(productCart);
    } else {
      res.status(400).json("No se pudo crear el producto");
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getProductCartHandler = async (req, res) => {
  try {
    const email = req.query.email;

    const allProductCart = await getProductCart(email);

    res.status(200).json(allProductCart);
  } catch (error) {
    console.error("Error en getAllProductHandler:", error.message);
  }
};

//Borra un producto por id (admin dashboard)
const deleteProductHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const productDelete = await Product.findByPk(id);
    if (!productDelete) {
      return res.status(404).json({ error: "The ID to delete does not exist" });
    } else {
      await productDelete.destroy();
      return res.status(204).send();
    }
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//Actualizar un Producto por id (admin dashboard)
const updateProductHandler = async (req, res) => {
  console.log('llegue')
  try {

    const { id } = req.params;
   
    const updatedProductData = req.body;
    console.log(updatedProductData);
    const success = await updateProduct(id, updatedProductData);

    if (success) {
      res
        .status(200)
        .json({ message: "Producto actualizado exitosamente", id: id });
    } else {
      res
        .status(404)
        .json({ error: `No se encontró un Producto con el ID ${id}` });
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
    console.error("Error en getRelatedProductsHandler:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

//Busca los productos que tengan el atributo isTrending en true (home)
const getAllTrendingHandler = async (req, res) => {
  try {
    const allTrending = await getAllTrending();
    res.status(200).json(allTrending);
  } catch (error) {
    console.error("Error en getAllTrendingHandler:", error);
    res
      .status(500)
      .json({ error: "Error en el handler al obtener los productos Trending" });
  }
};

const deleteHandler = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deleter = await deleteProduct(id);
    if (deleter === true) {
      return res
        .status(200)
        .json({ message: "Producto eliminado exitosamente" });
    } else {
      return res.status(404).send("Produncto no encontrado");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateProductCartHandler = async (req, res) => {
  const { id, email } = req.params;
  const { quantity } = req.body;

  try {
    const updated = await updateProductCart(id, email, quantity);

    if (updated) {
      return res
        .status(200)
        .json({ message: "Cantidad de producto actualizada exitosamente" });
    } else {
      return res.status(404).send("Producto no encontrado en el carrito");
    }
  } catch (error) {
    return res.status(500).send("Error en el servidor: " + error.message);
  }
};

const deleteProductCartHandler = async (req, res) => {
  const { id, email } = req.params;

  try {
    const deleter = await deleteProductCart(id, email);
    if (deleter === true) {
      return res
        .status(200)
        .json({ message: "Producto eliminado exitosamente" });
    } else {
      return res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllProductHandler,
  getProductByIdHandler,
  getProductCartHandler,
  postProductHandler,
  postProductCartHandler,
  deleteProductHandler,
  updateProductHandler,
  getRelatedProductsHandler,
  getAllTrendingHandler,
  deleteHandler,
  deleteProductCartHandler,
  updateProductCartHandler,
};
