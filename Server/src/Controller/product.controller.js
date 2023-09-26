const { Product } = require("../models/Product");
const { Category } = require("../models/Category");

////////////////////////////////////////////////////////
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


////////////////////////////////////////////////////////
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


//Crea un producto y lo guarda en la base de datos (FALTA PONER IMAGEN POR DEFECTO)
const postProduct = async (productData) => {
  try {
    const { name, description, price, image, stock, related_products, available } = productData;
    if (!name || !price || !stock) {
      throw new Error("Faltan completar campos obligatorios");
    }

    let urlDeImagen = "";
    if (image) {
      urlDeImagen = image;
    } else {
      urlDeImagen =
        ""; //Poner aca la url de la imagen por defecto que quieran
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      image: urlDeImagen,
      stock,
      related_products,
      available,
    });
    // Si necesitamos asociar categorías al producto, hacerlo aquí
    return newProduct;
  } catch (error) {
    throw error;
  }
};





module.exports = {
  getAllProducts,
  getProductById,
  postProduct,

};
