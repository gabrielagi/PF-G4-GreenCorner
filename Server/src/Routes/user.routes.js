const { Router } = require("express");
const {
  // getAllusersHandler,
  // getuserByIdHandler,
  // postuserHandler,
  // deleteuserHandler,
  //getAllFavoritesHandler
} = require("../Handler/product.handler");

const userRouter = Router();

// userRouter.get("/", getAllusersHandler);

// userRouter.get("/:id", getuserByIdHandler);

//userRouter.post("/", postuserHandler);

//userRouter.delete("/:id", deleteuserHandler);

// userRouter.get("/:id/falvorites", getAllFavoritesHandler);

module.exports = userRouter;
