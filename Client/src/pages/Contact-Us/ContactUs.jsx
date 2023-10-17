import { useState } from "react";
import styles from "./ContactUs.module.css";
import axios from 'axios';
import { toast } from "react-toastify";



const ContactUs = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar los datos del formulario al servidor
      // const mail = user.mail
      await axios.post('http://localhost:3001/send-email', {
        name,
        phoneNumber,
        message
      });

      // Limpiar los campos después de enviar el formulario
      setName("");
      setPhoneNumber("");
      setMessage("");
      
      toast.success("Mensaje enviado",{
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      // Mensaje de éxito o redirección después de enviar el formulario
      // Puedes implementar esta parte según tus necesidades
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      // Manejar errores aquí, mostrar un mensaje de error al usuario, etc.
    }

  };
  
  return (
    <div className={styles.container}>
      {/* {console.log(user.email)}; */}
      <div className={styles.card_contact}>
        {/* Parte izquierda */}
        <div className={styles.leftContent}>
  <div className={styles.textContainer}>
    <div className={styles.upperHalf}>
      <h2>GET IN TOUCH</h2>
    </div>
    <div className={styles.lowerHalf}>
      {/* {console.log(user)} */}
      <p className={styles.p}>Phone: +1234567890</p>
      <p className={styles.p}>Email: greencornerg4@gmail.com</p>
      <p className={styles.p}>Location: GreenCorner HQ, City, Country</p>
    </div>
  </div>
</div>

        {/* Parte derecha */}
        <div className={styles.rightContent}>
  <form onSubmit={handleSubmit}>
    <div className={styles.formGroup}>
      <input
        type="text"
        id="name"
        placeholder="Your Name" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className={styles.contactInput}
      />
    </div>
    <div className={styles.formGroup}>
      <input
        type="tel"
        id="phoneNumber"
        placeholder="Phone Number (optional)" 
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className={styles.contactInput}
      />
    </div>
    <div className={styles.formGroup}>
      <textarea
        id="message"
        placeholder="Enter your message here" 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className={styles.textArea}
      />
    </div>
    <button className={styles.contactSubmitButton}>Send</button>
  </form>
</div>


      </div>
    </div>
  );
};

export default ContactUs;
