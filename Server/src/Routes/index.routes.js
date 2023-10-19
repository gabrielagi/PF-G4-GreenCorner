const { Router } = require("express");
const userRouter = require("./user.routes");
const productRouter = require("./product.routes");
const categoriesRouter = require("./category.routes");
const orderRouter = require("./order.routes");
const paymentRouter = require("./payment.routes");
const mailRouter = require("./mail.routes")
const testimonialRouter = require("./testimonial.routes")
const router = Router();
// const nodemailer = require('nodemailer');

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/category", categoriesRouter);
router.use("/order", orderRouter);
router.use("/payment", paymentRouter);
router.use("/send-email", mailRouter)
router.use("/testimonial", testimonialRouter)


module.exports = router;
