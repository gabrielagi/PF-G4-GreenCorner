const { Router } = require("express");
const {
  // getAllusersHandler,
  // getuserByIdHandler,
  getFavoritesHandler,
  // postuserHandler,
  postFavoritesHandler,
  // deleteuserHandler,
  //getAllFavoritesHandler
} = require("../Handler/user.handler");

const userRouter = Router();

// userRouter.get("/", getAllusersHandler);

  userRouter.get("/getfavorites", getFavoritesHandler);

// userRouter.get("/:id", getuserByIdHandler);

//userRouter.post("/", postuserHandler);

//anda
userRouter.post("/favorites", postFavoritesHandler);

//userRouter.delete("/:id", deleteuserHandler);

// userRouter.get("/:id/falvorites", getAllFavoritesHandler);

module.exports = userRouter;
