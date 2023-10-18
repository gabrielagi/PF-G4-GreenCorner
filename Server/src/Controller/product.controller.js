const { Product, User, ShoppingCart, Category } = require("../db");

var cloudinary = require("cloudinary").v2;

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

//Obtiene todos los productos con sus categorías asociadas (home)
const getAllProduct = async (req, res) => {
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

const getProductCart = async (email) => {
  try {
    let cart = ShoppingCart.findAll({
      where: {
        email: email,
      },
      include: [
        {
          model: Product,
          required: true,
        },
        {
          model: User,
          required: true,
        },
      ],
    });

    return cart;
  } catch (error) {
    console.error("Error en getProductCart:", error.message);
    res.status(500).json({ error: "Error en" });
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

async function uploadImages(images) {
  try {
    const uploadedImageURLs = [];

    for (const image of images) {
      const result = await cloudinary.uploader.upload(image);
      uploadedImageURLs.push(result.url);
    }

    console.log("URLs de imágenes subidas a Cloudinary:", uploadedImageURLs);
    return uploadedImageURLs;
  } catch (error) {
    console.error("Error al subir imágenes a Cloudinary:", error);
    throw error;
  }
}

const postProductCart = async (cart) => {
  try {
    const { product_id, email, amount } = cart;

    const [shoppingCart, created] = await ShoppingCart.findOrCreate({
      where: {
        product_id: product_id,
        email: email,
        amount: amount,
      },
    });

    if (!created) {
      return "This product already in the cart";
    } else {
      return "This product has been add in the cart";
    }
  } catch (error) {
    console.error("Error en postProductCart:", error.message);
    throw new Error("Error en el servidor");
  }
};

//Crea un producto y lo guarda en la base de datos con sus categorías asociadas (admin dashboard) (falta imagen por defecto)
const postProduct = async (productData) => {
  try {
    const {
      name,
      description,
      price,
      images,
      stock,
      available,
      categories,
      isTrending,
    } = productData;

    if (!categories) {
      throw new Error("Las categorías son obligatorias");
    }

    if (!name || !price || !stock) {
      throw new Error("Faltan completar campos obligatorios");
    }

    const imagesResult = await uploadImages(images);

    const newProduct = await Product.create({
      name,
      description,
      price,
      images: imagesResult,
      stock,
      available,
      isTrending,
    });

    if (categories && categories.length > 0) {
      await newProduct.addCategory(categories);
    }

    return newProduct;
  } catch (error) {
    console.error("Error en postProduct:", error.message);
    throw new Error("Error en el servidor");
  }
};

//Actualiza un producto por id (admin dashboard)
const updateProduct = async (id, updatedData) => {
  try {
    const existingProduct = await Product.findByPk(id);
    if (!existingProduct) {
      return false;
    }
    const existingCategories = await existingProduct.getCategories();
    const updatedCategories = updatedData.categories || [];

    const categoriesToRemove = existingCategories.filter(
      (category) =>
        !updatedCategories.some(
          (updatedCategory) => updatedCategory.name === category.name
        )
    );

    for (const category of categoriesToRemove) {
      await existingProduct.removeCategory(category);
    }
    for (const category of updatedCategories) {
      const [categoryInstance] = await Category.findOrCreate({
        where: { name: category.name },
      });
      await existingProduct.addCategory(categoryInstance);
    }

    if (updatedData.images && updatedData.images.length > 0) {
      const newImagesResult = await uploadImages(updatedData.images);

      existingProduct.images = newImagesResult;
      updatedData.images = newImagesResult;
    }

    await existingProduct.update(updatedData);

    return true;
  } catch (error) {
    throw error;
  }
};

//Lista de 5 productos relacionados (product detail)
const findRelatedProducts = async (productId) => {
  try {
    const targetProduct = await Product.findByPk(productId, {
      include: "categories",
    });
    if (!targetProduct) {
      throw new Error("Producto no encontrado");
    }
    const targetCategories = targetProduct.categories.map(
      (category) => category.id
    );

    const filteredRelatedProducts = [];
    const relatedProducts = await Product.findAll({
      where: {
        id: { [sequelize.Op.ne]: targetProduct.id },
      },
      include: [{ model: Category, as: "categories", attributes: ["id"] }],
    });

    for (const product of relatedProducts) {
      const productCategories = product.categories.map(
        (category) => category.id
      );
      if (
        productCategories.some((categoryId) =>
          targetCategories.includes(categoryId)
        )
      ) {
        filteredRelatedProducts.push(product);
        if (filteredRelatedProducts.length >= 5) {
          return filteredRelatedProducts;
        }
      }
    }
  } catch (error) {
    throw new Error("Error en findRelatedProducts: " + error.message);
  }
};

//Busca todos los productos con el atributo isTrending con valor true (home)
const getAllTrending = async () => {
  try {
    const trendingProducts = await Product.findAll({
      where: { isTrending: true },
    });
    return trendingProducts;
  } catch (error) {
    throw new Error("Error al buscar todos los productos Trending");
  }
};

const deleteProduct = async (id) => {
  try {
    const deleter = await Product.destroy({
      where: {
        product_id: id,
      },
    });
    if (deleter === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return "Error al eliminar el product", error;
  }
};

const updateProductCart = async (id, email, quantity) => {
  try {
    const [updatedRows] = await ShoppingCart.update(
      { amount: quantity },
      {
        where: {
          product_id: id,
          email: email,
        },
      }
    );

    return updatedRows > 0;
  } catch (error) {
    throw error;
  }
};

const deleteProductCart = async (id, email) => {
  try {
    const deleter = await ShoppingCart.destroy({
      where: {
        product_id: id,
        email: email,
      },
    });
    if (deleter === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return "Error al eliminar el product", error;
  }
};

const deleteAllProductCart = async (email) => {
  try {
    const deleter = await ShoppingCart.destroy({
      where: {
        email: email,
      },
    });
    if (deleter === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return "Error al eliminar el product", error;
  }
};

module.exports = {
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
  deleteAllProductCart,
  updateProductCart,
};
