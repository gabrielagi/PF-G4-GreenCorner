const mercadopago = require("mercadopago");

require("dotenv").config();

const { ACCESS_TOKEN, DB_HOST, SERVER_PORT } = process.env;

const HOST = `https://greencorner.onrender.com/payment/`;

const { getAllProduct, getProductById, updateProduct, deleteAllProductCart } = require("../Controller/product.controller");

const {
  postOrder,
  postOrderDetail,
  getOrderById,
  updateOrders
} = require("../Controller/order.controller");

// Configuro mercado pago
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

let emaill;
let ejemplo;
let orderId;

const createOrder = async (req, res) => {
  console.log(req.body);
  // El product puede ser un objeto individual desde Detail o un array desde Cart
  const product = req.body.product;
  const amount = req.body.amount || 1; // Si amount no es enviado asumo un valor predeterminado en 1
  console.log("Este es el producto que me llega a payment: ", product);

  ejemplo = product;
  const newEmail = req.body.email;

  emaill = req.body.email;
  console.log("El email que me llega es: ", newEmail);

  // Guardo los items que se van a vender
  let items = [];

  //Vamos a guardar el total de precio a pagar
  let cartTotalAmount = 0;

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
      cartTotalAmount += item.price * item.amount; //Acumular el total de precio por todos los productos
      const availableStock = getAvailableStock(item.id, allProducts);
      if (availableStock < item.amount) {
        insufficientStockProducts.push(item);
      }
    }
  } else if (typeof product === "object") {
    cartTotalAmount = product.price * amount;
    const availableStock = getAvailableStock(product.product_id, allProducts);
    if (availableStock < amount) {
      insufficientStockProducts.push(product);
    }
  }

  // Creo una nueva orden de compra
  let newOrderData = {
    date: new Date().toLocaleDateString(), // Formato de fecha "14/10/2022"
    status: "Pending",
    shippingAddress: "P. Sherman Calle Wallaby 42, Sidney",
    addressHouseNumber: 42,
    total: parseInt(cartTotalAmount),
    email: newEmail,
  };
  const newOrder = await postOrder(newOrderData);
  console.log("La nueva orden creada tiene ID: ", newOrder.dataValues.id);
  const newOrderId = newOrder.dataValues.id;
  orderId = newOrder.dataValues.id

  // Tengo que controlar si es un array de productos o un producto en particular
  if (Array.isArray(product)) {
    for (const item of product) {
      const productDetail = {
        quantity: item.amount,
        unit_price: parseInt(item.price),
        order_id: newOrderId,
        product_id: item.id,
      };
      let newOrderDetail = await postOrderDetail(productDetail);
      console.log("La nueva ordenDetail creada tiene ID: ", newOrderDetail);
    }
  } else if (typeof product === "object") {
    const productDetailObject = {
      quantity: product.amount,
      unit_price: parseInt(product.price),
      order_id: newOrderId,
      product_id: product.product_id,
    };
    let newOrderDetailObject = await postOrderDetail(productDetailObject);
    console.log("La nueva ordenDetail creada tiene ID: ", newOrderDetailObject);
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

  //Creo las orden y los order detail de la compra

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
      notification_url: "https://4040-190-97-127-163.ngrok.io/payment/webhook",
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

const success = async (req, res) => {
  console.log(req.query);
  console.log("Necesito en success");

  // Asegúrate de que ejemplo sea un array con al menos un elemento
  if (ejemplo && ejemplo.length > 0) {
    const { id, amount } = ejemplo[0];

    const Products = await getProductById(id);
    const updateProducts = Products.dataValues;

    if ("stock" in updateProducts) {
      updateProducts.stock -= amount;
    }

    await deleteAllProductCart(emaill);

    let orders = await getOrderById(orderId);
    let updateOrderss = orders.dataValues;

    console.log(orders);
    
    if ("status" in updateOrderss) {
      updateOrderss.status = "Finish";
    }

    await updateOrders(orderId, updateOrderss)
    .then((success) => {
      if (success) {
        console.log("Producto actualizado exitosamente");
      } else {
        console.log(`No se encontró un Producto con el ID ${idOrden}`);
      }
    })
    .catch((error) => {
      console.error("Error en updateProduct:", error.message);
    });

    await updateProduct(id, updateProducts)
      .then((success) => {
        if (success) {
          console.log("Producto actualizado exitosamente");
        } else {
          console.log(`No se encontró un Producto con el ID ${id}`);
        }
      })
      .catch((error) => {
        console.error("Error en updateProduct:", error.message);
      });

    // res.send('Pago realizado')
    // store in database
    // Puedo guadar la información del usuario una vez que compró
    // Actualizar cantidad de productos en el Stock de los productos vendidos

    // res.redirect("https://green-corner.vercel.app/"); // Agregar componente notificación para redirigir
    console.log("Antes de redirigir");

  res.redirect("https://green-corner.vercel.app/");
};
}
const failure = (req, res) => {
  console.log(req.query);
  // res.send('Pago realizado')
  // store in database
  // Puedo guadar la información del usuario una vez que compró
  // Actualizar cantidad de productos en el Stock de los productos vendidos
  res.redirect("https://green-corner.vercel.app/"); // Agregar componente notificación para redirigir si sale mal
};

const receiveWebhook = async (req, res) => {
  try {
    const { body } = req; // Obtén el cuerpo JSON de la solicitud

    // Verifica que el tipo de notificación sea "payment"
    if (body.type === "payment") {
      const paymentId = body.data.id;

      // Realiza acciones basadas en el ID del pago, como actualizar tu base de datos
      // También puedes verificar el estado del pago, como "approved", "pending", "in_process", etc.

      // Ejemplo de actualización en la base de datos (debes implementar esto):
      // await actualizarEstadoDePago(paymentId, body.data.status);

      console.log(
        "Notificación de pago recibida:",
        paymentId,
        body.data.status
      );
    }

    res.status(204).end(); // Responde con un estado 204 (sin contenido) para confirmar la recepción
  } catch (error) {
    console.error("Error al procesar la notificación de Mercado Pago:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

module.exports = { createOrder, receiveWebhook, success, failure };
