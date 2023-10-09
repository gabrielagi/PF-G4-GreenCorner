const { Router } = require("express");
const {
  createOrder,
  receiveWebhook,
  success,
  failure,
} = require("../Controller/payment.controller");
const paymentRouter = Router();

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

// paymentRouter.post por si el usuario cierra mercado pago sin volver a nuestra app
paymentRouter.post("/webhook", receiveWebhook);

module.exports = paymentRouter;
