import React, { useState } from "react";
import styles from "./ContactUs.module.css";
import  formimg  from "../../assets/formimg.png";


const ContactUs = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Nombre:", name);
    console.log("Número de teléfono:", phoneNumber);
    console.log("Mensaje:", message);

    setName("");
    setPhoneNumber("");
    setMessage("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Parte izquierda */}
        <div className={styles.leftContent}>
  <div className={styles.textContainer}>
    <div className={styles.upperHalf}>
      <h2>get in touch</h2>
    </div>
    <div className={styles.lowerHalf}>
      <p>Phone: +1234567890</p>
      <p>Email: info@greencorner.com</p>
      <p>Location: GreenCorner HQ, City, Country</p>
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
        placeholder="Your Name" /* Agregamos el atributo placeholder */
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
        placeholder="Phone Number (optional)" /* Agregamos el atributo placeholder */
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className={styles.contactInput}
      />
    </div>
    <div className={styles.formGroup}>
      <textarea
        id="message"
        placeholder="Enter your message here" /* Agregamos el atributo placeholder */
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
