const mercadopago = require("mercadopago");

require("dotenv").config();

const { ACCESS_TOKEN, DB_HOST, SERVER_PORT } = process.env;

const HOST = `http://${DB_HOST}:${SERVER_PORT}/payment`;

const { getAllProduct } = require("../Controller/product.controller");

// Configuro mercado pago
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

const createOrder = async (req, res) => {
  // El product puede ser un objeto individual desde Detail o un array desde Cart
  const product = req.body.product;
  const amount = req.body.amount || 1; // Si amount no es enviado asumo un valor predeterminado en 1
  console.log("Este es el producto que me llega a payment: ", product);
  // Guardo los items que se van a vender
  let items = [];

  // Controlar que haya suficiente stock para el checkout
  const allProducts = await getAllProduct();
  const insufficientStockProducts = [];

  // Obtén la cantidad de stock disponible para un producto
  function getAvailableStock(productId, allProducts) {
    const productFound = allProducts.find(
      (item) => item.product_id === productId
    );
    console.log(
      "El producto encontrado en el nuevo metodo tiene stock: ",
      productFound.stock
    );
    if (productFound) {
      return productFound.stock;
    }
    return 0;
  }

  // Controlo que cada elemento del Array product tiene stock disponible
  if (Array.isArray(product)) {
    for (const item of product) {
      const availableStock = getAvailableStock(item.id, allProducts);
      if (availableStock <= item.amount) {
        insufficientStockProducts.push(item);
      }
    }
  } else if (typeof product === "object") {
    const availableStock = getAvailableStock(product.product_id, allProducts);
    if (availableStock <= amount) {
      insufficientStockProducts.push(product);
    }
  }

  // Controlo si alguno de los productos no tiene suficiente stock
  if (insufficientStockProducts.length > 0) {
    console.log("Productos con stock insuficiente:", insufficientStockProducts);
  } else {
    // Realiza el proceso de checkout ya que hay suficiente stock
    if (Array.isArray(product)) {
      for (const item of product) {
        const price = parseFloat(item.price); // Convertir a número
        if (!isNaN(price)) {
          items.push({
            id: item.id,
            quantity: item.amount,
            title: item.name,
            unit_price: price, // Usar el precio convertido
            currency_id: "ARS",
          });
        } else {
          console.error(`Invalid price for product ${item.id}`);
        }
      }
    } else if (typeof product === "object") {
      const price = parseFloat(product.price); // Convertir a número
      if (!isNaN(price)) {
        items.push({
          id: product.id,
          quantity: amount,
          title: product.name,
          unit_price: price, // Usar el precio convertido
          currency_id: "ARS",
        });
      } else {
        console.error(`Invalid price for product ${product.id}`);
      }
    }
  }

  // Creo los items para la preferencia
  // let payer = {
  //   name: user.given_name,
  //   surname: user.family_name,
  // };

  // Item de prueba
  // items: [
  //       {
  //         id: 2,
  //         title: "Laptop",
  //         unit_price: 500,
  //         quantity: 3,
  //         currency_id: "ARS",
  //       },
  //     ],

  try {
    const result = await mercadopago.preferences.create({
      payer_email: "test_user_1398180221@testuser.com",
      items,
      back_urls: {
        success: `${HOST}/success`,
        failure: `${HOST}/failure`,
        pending: `${HOST}/pending`,
      },
      notification_url: "https://fb4d-190-97-120-13.ngrok.io/payment/webhook",
      auto_return: "approved",
    });

    console.log("Result de Create Order", result);

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.set("Access-Control-Allow-Credentials", true);
    console.log("URL: ", result.body.init_point);
    res.json({
      result: result.body.init_point,
      // Identificador único que puedes utilizar para referenciar y gestionar esa preferencia en futuras interacciones con la API de Mercado Pago
    });
    console.log("----Fin del Create Order------------");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const success = (req, res) => {
  console.log(req.query);
  // res.send('Pago realizado')
  // store in database
  // Puedo guadar la información del usuario una vez que compró
  // Actualizar cantidad de productos en el Stock de los productos vendidos
  res.redirect("http://localhost:5173/"); // Agregar componente notificación para redirigir
};

const failure = (req, res) => {
  console.log(req.query);
  // res.send('Pago realizado')
  // store in database
  // Puedo guadar la información del usuario una vez que compró
  // Actualizar cantidad de productos en el Stock de los productos vendidos
  res.redirect("http://localhost:5173/"); // Agregar componente notificación para redirigir si sale mal
};

const receiveWebhook = async (req, res) => {
  // Recupero lo datos del pago que se realizó para poder ver el el id de la compra llamado data.id y el tipo llamado payment
  const payment = req.query;

  try {
    // Pregunto si la venta es correcta y la respuesta es payment
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment.id);
      console.log("Data del Webhook", data);
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

module.exports = { createOrder, receiveWebhook, success, failure };
