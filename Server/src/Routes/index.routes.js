const { Router } = require("express");
const userRouter = require("./user.routes");
const productRouter = require("./product.routes");
const categoriesRouter = require("./category.routes");
const orderRouter = require("./order.routes");
const paymentRouter = require("./payment.routes");
const router = Router();
const nodemailer = require('nodemailer');
const { GMAIL_USER, GMAIL_PASS } = process.env;

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/category", categoriesRouter);
router.use("/order", orderRouter);
router.use("/payment", paymentRouter);


//Try
router.post('/send-email', async (req, res) => {
    try {
        const { name, phoneNumber, message } = req.body;

        // Configura Nodemailer para enviar el correo electrónico
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_PASS,
            },
        });

        // Define la información del correo electrónico
        const mailOptions = {
            from: GMAIL_USER,
            to: 'greencornerg4@gmail.com',
            subject: 'Contact Us',
            text: `Nombre: ${name}\nTeléfono: ${phoneNumber}\nMensaje: ${message}`,
        };

        // Envía el correo electrónico
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Correo electrónico enviado con éxito' });
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        res.status(500).json({ error: 'Error al enviar el correo electrónico' });
    }
});


module.exports = router;
