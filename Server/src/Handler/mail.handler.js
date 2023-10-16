const { GMAIL_USER, GMAIL_PASS } = process.env;
const nodemailer = require('nodemailer');
const {purchasefail, purchase} =require ("../../nodemailer/mailer")

const purchaseHandler = async (req, res) => {
    try {
        const { name, email } = req.body
        await purchase(name, email)
        res.status(200).json({ message: 'Correo electrónico enviado con éxito' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al enviar el correo electrónico' });

    }
}

const purchasefailHandler = async (req, res) => {
    try {
        const { name, email } = req.body
        await purchasefail(name, email)
        res.status(200).json({ message: 'Correo electrónico enviado con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al enviar el correo electrónico' });
    }
}
const contactUsMail = async (req, res) => {
    try {
        const { name, phoneNumber, message} = req.body;

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
            from: "Contact Us",
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
}

module.exports = {
    contactUsMail,
    purchaseHandler,
    purchasefailHandler
}