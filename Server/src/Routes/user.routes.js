const { Router } = require("express");
const {
  allUsers,
  byIdHander,
  byNameHander,
  getFavoritesHandler,
  postFavoritesHandler,
  byRolHandler,
  newUserHandler,
  deleteHandler,
  byEmailHandler,
} = require("../Handler/user.handler");

const userRouter = Router();

userRouter.get("/", allUsers);

userRouter.get("/:id", byIdHander);

userRouter.get("/getfavorites", getFavoritesHandler);

userRouter.get("/find/:name", byNameHander);

userRouter.get("/rol/:rol", byRolHandler);

userRouter.get("/find/:email", byEmailHandler);

//anda
userRouter.post("/favorites", postFavoritesHandler);

userRouter.post("/", newUserHandler);

userRouter.delete("/:id", deleteHandler);

module.exports = userRouter;
