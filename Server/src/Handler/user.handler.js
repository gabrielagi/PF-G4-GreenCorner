const { emit } = require("process");
const { WelcomeEmail } = require("../../nodemailer/mailer");
const {
  getAllUsers,
  getUserById,
  postFavorite,
  getAllFavorites,
  getOneFavorite,
  getByRol,
  getUserbyName,
  createUser,
  deleteUser,
  updateUser,
  getUserByEmail,
  deleteFavorite,
  deleteFavoriteBD
} = require("../Controller/user.controller");

var cloudinary = require("cloudinary").v2;

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

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

const getFavoritesHandler = async (req, res) => {
  try {
    const { email } = req.query;
    console.log('esto es en el handler' + email)
    const allFavorites = await getAllFavorites(email);
    res.status(200).json(allFavorites);
  } catch (error) {
    console.error("Error en getFavoritesHandler:", error.message);
  }
};
const getOneFavoriteHandler = async (req, res) => {
  try {
    const { email, id } = req.query;
    console.log('esto es en el handler' + email)
    const oneFavorite = await getOneFavorite(email,id);
    res.status(200).json(oneFavorite);
  } catch (error) {
    console.error("Error en getFavoritesHandler:", error.message);
  }
};

const postFavoritesHandler = async (req, res) => {
  try {
    const productData = req.body;

    const productFavorite = await postFavorite(productData);

    if (productFavorite) {
      res.status(201).json(productFavorite);
    } else {
      res
        .status(400)
        .json({ success: false, message: "Cannot add in favorite" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//CREA NUEVO USUARIO
const newUserHandler = async (req, res) => {
  const { nickname, email, picture, email_verified, status } = req.body;
  if (!nickname || !email || !picture) {
    return res
      .status(400)
      .json({ message: "Nickname, email, and picture are required fields." });
  }

  try {
    const newUser = await createUser(
      nickname,
      email,
      picture,
      email_verified,
      status
    );
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "SSomething went wrong" });
  }
};

//ACTUALIZA USUARIO
const updateUserHandler = async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;

  try {
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userData.picture) {
      const uploadedImages = await uploadImages([userData.picture]);
      userData.picture = uploadedImages[0];
    }

    const updatedUser = await updateUser(userId, userData);

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const byIdHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).send("Not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

const byNameHandler = async (req, res) => {
  const name = req.params.name;
  try {
    const user = await getUserbyName(name);
    if (!user) {
      return res.status(404).send("Not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

// Email
const emailHandler = async (req, res) => {
  const email = req.query.email;
  console.log("Un email en el handler", email);
  try {
    const userFound = await getUserByEmail(email);

    console.log("Un usuario encontrado en el handler", userFound);

    return res.status(200).json(userFound);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    if (!users) {
      return res.status(404).send("Not users yet");
    }
    return res.status(200).json(users);
  } catch {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

const byRolHandler = async (req, res) => {
  const userRol = req.params.rol;
  try {
    const user = await getByRol(userRol);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something's wrong, I can feel it");
  }
};

const deleteHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const deleter = await deleteUser(id);
    return res.status(200).json(deleter);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Oops");
  }
};

const deleteFavoritesHandler = async (req, res) => {
  const { id, email } = req.params;
  
  try {
    const deleter = await deleteFavorite(id, email);
    return res.status(200).json(deleter);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Oops");
  }
};
const deleteFavoriteBDHandler = async (req, res) => {
  const { id } = req.params;
      console.log('llegó al handler') 
       console.log(id)
  try {
    const deleter = await deleteFavoriteBD(id);

  
    return res.status(200).json(deleter);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Oops");
  }
};
module.exports = {
  newUserHandler,
  postFavoritesHandler,
  getFavoritesHandler,
  getOneFavoriteHandler,
  byIdHandler,
  byNameHandler,
  allUsers,
  byRolHandler,
  deleteHandler,
  updateUserHandler,
  deleteFavoritesHandler,
  emailHandler,
  deleteFavoriteBDHandler
};
