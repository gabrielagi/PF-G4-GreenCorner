const { Router } = require("express");
const {
  allUsers,
  byIdHandler,
  byNameHandler,
  getFavoritesHandler,
  postFavoritesHandler,
  byRolHandler,
  newUserHandler,
  deleteHandler,
  updateUserHandler,
  emailHandler,
} = require("../Handler/user.handler");

const userRouter = Router();

userRouter.get("/", allUsers);

userRouter.get("/:id", byIdHandler);

userRouter.get("/getfavorites", getFavoritesHandler);

userRouter.get("/find/:name", byNameHandler);

userRouter.get("/find/:email", emailHandler);

//anda
userRouter.post("/favorites", postFavoritesHandler);

userRouter.post("/", newUserHandler);

userRouter.delete("/:id", deleteHandler);

userRouter.put("/:id", updateUserHandler);

module.exports = userRouter;
