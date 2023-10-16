require('dotenv').config();
const { GMAIL_USER, GMAIL_PASS } = process.env;
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const WelcomeEmail = async (email, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: GMAIL_USER,
          pass: GMAIL_PASS
      },
  });
  
    // Leer el contenido del template HTML
    const templatePath = path.join(__dirname, 'templateWelcomeEmail.html');
    const templateContent = fs.readFileSync(templatePath, 'utf-8');

    const modifiedTemplate = templateContent.replace("[Nombre del Usuario]", name);


    const mailOptions = {
      from: GMAIL_USER,
      to: email,
      subject: 'Bienvenido a Green Corner!',
      html: modifiedTemplate, // Usar el contenido del template HTML aquí
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error al enviar el correo electrónico: ', error);
  }
};
const Purchase = async (email, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: GMAIL_USER,
          pass: GMAIL_PASS
      },
  });
  
    // Leer el contenido del template HTML
    const templatePath = path.join(__dirname, 'templatePurchaseEmail.html');
    const templateContent = fs.readFileSync(templatePath, 'utf-8');

    const modifiedTemplate = templateContent.replace("[Nombre del Usuario]", name);


    const mailOptions = {
      from: GMAIL_USER,
      to: email,
      subject: 'Compra exitosa',
      html: modifiedTemplate, // Usar el contenido del template HTML aquí
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error al enviar el correo electrónico: ', error);
  }
};


const purchasefail = async (email, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: GMAIL_USER,
          pass: GMAIL_PASS
      },
  });
  
    // Leer el contenido del template HTML
    const templatePath = path.join(__dirname, 'templatePurchaseFailEmail.html');
    const templateContent = fs.readFileSync(templatePath, 'utf-8');

    const modifiedTemplate = templateContent.replace("[Nombre del Usuario]", name);


    const mailOptions = {
      from: GMAIL_USER,
      to: email,
      subject: 'Problemas con el pago',
      html: modifiedTemplate, // Usar el contenido del template HTML aquí
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error al enviar el correo electrónico: ', error);
  }
};

const purchasePending = async (email, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: GMAIL_USER,
          pass: GMAIL_PASS
      },
  });
  
    // Leer el contenido del template HTML
    const templatePath = path.join(__dirname, 'templatePurchasePending.html');
    const templateContent = fs.readFileSync(templatePath, 'utf-8');

    const modifiedTemplate = templateContent.replace("[Nombre del Usuario]", name);


    const mailOptions = {
      from: GMAIL_USER,
      to: email,
      subject: 'Pago pendiente',
      html: modifiedTemplate, // Usar el contenido del template HTML aquí
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error al enviar el correo electrónico: ', error);
  }
}

module.exports = { WelcomeEmail, Purchase, purchasePending, purchasefail }