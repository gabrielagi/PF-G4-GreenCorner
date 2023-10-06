const { emit } = require("process");
const { WelcomeEmail } = require("../../nodemailer/mailer");
const {
  getAllUsers,
  getUSerbyId,
  postFavorite,
  getAllFavorites,
  getByRol,
  getUserbyName,
  postUser,
  deleteUser,
  getUserbyEmail,
} = require("../Controller/user.controller");

const getFavoritesHandler = async (req, res) => {
  try {
    const allFavorites = await getAllFavorites();
    res.status(200).json(allFavorites);
  } catch (error) {
    console.error("Error en getFavoritesHandler:", error.message);
  }
};

const postFavoritesHandler = async (req, res) => {
  try {
    const productData = req.body;
    const productFavorite = await postFavorite(productData);

    if (productFavorite) {
      res.status(201).json({
        success: true,
        message: "This product has been add in favorite",
        data: productFavorite,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Cannot add in favorite" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const newUserHandler = async (req, res) => {
  const { nickname, email, picture, lastname, email_verified, rating } =
    req.body;

  if (!nickname) {
    return res.status(500).send("nickname missing");
  }
  if (!email) {
    return res.status(500).send("email missing");
  }
  if (!picture) {
    return res.status(500).send("picture missing");
  }
  try {
    const newUser = await postUser(
      nickname,
      email,
      picture,
      lastname,
      email_verified,
      rating
    );
    console.log("estoy en el post :D");
    const userEmail = newUser.email;
    const userName = newUser.nickname;
    await WelcomeEmail(userEmail, userName);
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong");
  }
};

const byIdHander = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await getUSerbyId(id);
    if (!user) {
      return res.status(404).send("Not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

const byEmailHandler = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await getUserbyEmail(email);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

const byNameHander = async (req, res) => {
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
module.exports = {
  newUserHandler,
  postFavoritesHandler,
  getFavoritesHandler,
  byIdHander,
  byNameHander,
  allUsers,
  byRolHandler,
  deleteHandler,
  byEmailHandler,
};
