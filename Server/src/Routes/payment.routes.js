const { Router, json } = require("express");
const {
  createOrder,
  receiveWebhook,
  success,
  failure,
} = require("../Controller/payment.controller");
const paymentRouter = Router();

const mercadopago = require("mercadopago");

require("dotenv").config();

const { ACCESS_TOKEN } = process.env;

// Configuro mercado pago
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

// Crear la orden de pago
paymentRouter.post("/create-order", createOrder);

// Redirigir al usuario si el pago sale bien
paymentRouter.get("/success", success);

// Redirigir al usuario si el pago sale mal
paymentRouter.get("/failure", failure);

// Redirigir al usuario si el pago esta pendiente de cobro
paymentRouter.get("/pending", (req, res) => {
  res.send("pending");
});

// paymentRouter.post por si el usuario cierra Mercado Pago sin volver a nuestra app
paymentRouter.post("/webhook", json(), receiveWebhook);

module.exports = paymentRouter;
