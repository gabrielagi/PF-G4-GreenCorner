import nodemailer from 'nodemailer';

const  GMAIL_USER = "greencornerg4@gmail.com"
const  GMAIL_PASS  = "hhod sruk oaak iizo";

const ClientEmail = async ({name, message}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: GMAIL_USER,
          pass: GMAIL_PASS
      },
  });
  


    const mailOptions = {
      from: `${name} want to contact us`,
      to: GMAIL_USER,
      subject: 'Contact Us',
      text: message, // Usar el contenido del template HTML aquí
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error al enviar el correo electrónico: ', error);
  }
};
export default ClientEmail