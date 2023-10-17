const {Router} = require("express")
const testimonialRouter = Router();

const {getTestimonialHandler, createTestimonialHandler, byIdHandler /*, updateHandler*/, deleteHandler } = require("../Handler/testimonial.handler")

testimonialRouter.get("/", getTestimonialHandler)
testimonialRouter.post ("/", createTestimonialHandler)
testimonialRouter.get("/:id", byIdHandler)
// testimonialRouter.put("/:id", updateHandler)
testimonialRouter.delete("/:id", deleteHandler)

module.exports = testimonialRouter