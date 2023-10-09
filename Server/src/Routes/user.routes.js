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

userRouter.get("/getfavorites", getFavoritesHandler);




userRouter.get("/find/:name", byNameHandler);

userRouter.get("/find", emailHandler);

userRouter.get("/:id", byIdHandler);
//anda
userRouter.post("/favorites", postFavoritesHandler);

userRouter.post("/", newUserHandler);

userRouter.delete("/:id", deleteHandler);

userRouter.put("/:id", updateUserHandler);

module.exports = userRouter;
