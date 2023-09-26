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

module.exports = {
  getAllProducts,
  getProductById,
};
