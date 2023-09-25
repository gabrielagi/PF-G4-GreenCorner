const axios = require("axios");
const {
  getAllProduct,
  postProduct,
  deleteProduct,
  updateProduct,
} = require("../Controller/product.controller");

const getAllProductHandler = async (req, res) => {
  try {
    // Si buscamos un Producto por nombre
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

const getProductByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;

    let productFound;
    const allProduct = await getAllProduct();

    // Verificar si el id es un número
    if (/^\d+$/.test(id)) {
      productFound = allProduct.find((product) => product.id === +id);
    }
    // Verificar si el id es un UUID
    else {
      productFound = allProduct.find((product) => product.id === id);
    }

    if (!productFound) {
      throw new Error(`No se encontró al Producto con id: ${id}`);
    }

    res.status(200).json(productFound);
  } catch (error) {
    console.log("Error en getProductByIdHandler:", error.message);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

const postProductHandler = async (req, res) => {
  try {
    const product = req.body;

    console.log("Un product enviado", product);
    const response = await postProduct(product);
    console.log("response", response);
    if (response !== false) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "No se pudo crear el Producto" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await deleteProduct(id);

    if (success) {
      res.status(200).json({ message: "Producto eliminado exitosamente" });
    } else {
      res
        .status(404)
        .json({ error: `No se encontró un Producto con el ID ${id}` });
    }
  } catch (error) {
    console.error("Error en deleteProductHandler:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
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
