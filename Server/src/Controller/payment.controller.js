const mercadopago = require("mercadopago");

require("dotenv").config();

const { ACCESS_TOKEN, DB_HOST, SERVER_PORT } = process.env;

const HOST = `http://${DB_HOST}:${SERVER_PORT}/payment`;

// Configuro mercado pago
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

const createOrder = async (req, res) => {
  // Ahora estoy en Detail testeando, el product puede ser un objeto individual o un array
  const product = req.body.product;
  const amount = req.body.amount;

  const result = await mercadopago.preferences.create({
    items: [
      {
        title: "Laptop",
        quantity: 2,
        unit_price: 500,
        currency_id: "ARS",
      },
    ],
    // URLs de redirección
    back_urls: {
      success: `${HOST}/success`,
      failure: `${HOST}/failure`,
      pending: `${HOST}/pending`, // Cuando el usuario no ha pagado
    },
    // Es cuando el pago ha terminado
    notification_url: "https://fb4d-190-97-120-13.ngrok.io/payment/webhook",
    auto_return: "approved",
  });

  console.log("Result de Create Order", result);

  res.send("creando orden");
};

const success = (req, res) => {
  console.log(req.query);
  // res.send('Pago realizado')
  res.redirect("http://localhost:5173/");
};

const receiveWebhook = async (req, res) => {
  // Recupero lo datos del pago que se realizó para poder ver el el id de la compra llamado data.id y el tipo llamado payment
  const payment = req.query;

  try {
    // Pregunto si la venta es correcta y la respuesta es payment
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(["data.id"]);
      console.log("Data del Webhook", data);

      // store in database
      // Puedo guadar la información del usuario una vez que compró
    }
    res.status(204); // Significa que todo salió bien pero no devuelve nada
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }

  console.log(req.query);
  //res.redirect('url del front')
  res.send("procesando pago");
};

module.exports = { createOrder, receiveWebhook, success };
