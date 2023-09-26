const { Product } = require("../models/Product");
const { Category } = require("../models/Category");


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: "categories",
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    return products;
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};



const getProductById = async (id) => {
  try {
    const product = await Product.findByPk(id, {
      include: {
        model: Category,
        as: "categories",
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    return product;
  } catch (error) {
    throw new Error("Error al obtener el producto por ID");
  }
};

const postProductController = async (req, res) => {
  try {
    const { name, description, price, image, stock, related_products, available } = req.body;
    if (!name || !price || !stock) {
      throw new Error("Faltan completar campos obligatorios");
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      image,
      stock,
      related_products,
      available,
    });
    // Si necesitamos asociar categorías al producto,hacerlo aquí
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  postProductController,
};
