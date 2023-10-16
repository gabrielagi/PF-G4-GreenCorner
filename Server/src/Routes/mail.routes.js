const { contactUsMail, purchaseHandler, purchasefailHandler } = require ("../Handler/mail.handler")
const { Router } = require("express");
const mailRouter = Router();


mailRouter.post("/", contactUsMail)
mailRouter.post("/fail", purchasefailHandler)
mailRouter.post ("/success", purchaseHandler)

module.exports = mailRouter
