const { Product } = require("../db");
const { Category } = require("../db");

//Obtiene todos los productos con sus categorías asociadas (home)
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


//Obtiene un producto por id con sus categorías asociadas (product detail)
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


//Crea un producto y lo guarda en la base de datos con sus categorías asociadas (admin dashboard) (falta imagen por defecto)
const postProduct = async (productData) => {
  try {
  
    console.log(productData);
    const { name, description, price, image, stock, available, categories } = productData;

    if (!name || !price || !stock) {
      throw new Error("Faltan completar campos obligatorios");
    }

    let urlDeImagen = "";
    if (image) {
      urlDeImagen = image;
    } else {
      urlDeImagen =
        ""; // Poner aquí la URL de la imagen por defecto 
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      image: urlDeImagen,
      stock,
      available,
    });

    if (categories && categories.length > 0) {
      await newProduct.setCategories(categories);
    }

   return newProduct;
  } catch (error) {
    console.error("Error en postProduct:", error.message);
    return( "Error en el servidor")
  }
};


//Actualiza un producto por id (admin dashboard)
const updateProduct = async (id, updatedData) => {
  try {
    const existingProduct = await Product.findByPk(id);
    if (!existingProduct) {
      return false; 
    }
    await existingProduct.update(updatedData);
    return true; 
  } catch (error) {
    throw error;
  }
};


//Lista de 5 productos relacionados (product detail)
const findRelatedProducts = async (productId) => {
  const targetProduct = await Product.findByPk(productId, {
    include: 'categories',
  });

  if (!targetProduct) {
    throw new Error('Producto no encontrado');
  }

  const targetCategories = targetProduct.categories.map((category) => category.id);

  const relatedProducts = await Product.findAll({
    where: {
      product_id: {
        [sequelize.Op.ne]: targetProduct.product_id,
      },
    },
    include: [
      {
        model: Category,
        as: 'categories',
        attributes: ['id'],
      },
    ],
  });

  const filteredRelatedProducts = relatedProducts.filter((product) => {
    const productCategories = product.categories.map((category) => category.id);
    return productCategories.some((categoryId) => targetCategories.includes(categoryId));
  });

  return filteredRelatedProducts.slice(0, 5);
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  updateProduct,
  findRelatedProducts,

};
