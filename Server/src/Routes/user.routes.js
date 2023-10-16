const { Router } = require("express");
const {
  allUsers,
  byIdHandler,
  byNameHandler,
  getFavoritesHandler,
  postFavoritesHandler,
  getOneFavoriteHandler,
  byRolHandler,
  newUserHandler,
  deleteHandler,
  updateUserHandler,
  deleteFavoritesHandler,
  emailHandler,
  deleteFavoriteBDHandler
} = require("../Handler/user.handler");

const { getTestimonialHandler, createTestimonialHandler} = require("../Handler/testimonial.handler")
const userRouter = Router();

userRouter.get("/", allUsers);

userRouter.get("/getfavorites", getFavoritesHandler);

userRouter.get("/getOnefavorites", getOneFavoriteHandler);

userRouter.get("/find/:name", byNameHandler);

userRouter.get("/find", emailHandler);

userRouter.get("/:id", byIdHandler);
//anda
userRouter.post("/favorites", postFavoritesHandler);

userRouter.post("/", newUserHandler);

userRouter.delete("/:id", deleteHandler);

userRouter.delete("/favorites/:id", deleteFavoriteBDHandler);

userRouter.delete("/favorites/:email/:id", deleteFavoritesHandler);



userRouter.put("/:id", updateUserHandler);

// userRouter.get("/testimonial", getTestimonialHandler)
// userRouter.post ("/testimonial", createTestimonialHandler)

module.exports = userRouter;
