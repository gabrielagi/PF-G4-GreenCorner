import { useState } from "react";
import styles from "./ContactUs.module.css";
import { useAuth0 } from "@auth0/auth0-react";




const ContactUs = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuth0();

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
      <div className={styles.card_contact}>
        {/* Parte izquierda */}
        <div className={styles.leftContent}>
  <div className={styles.textContainer}>
    <div className={styles.upperHalf}>
      <h2>get in touch</h2>
    </div>
    <div className={styles.lowerHalf}>
      {console.log(user)}
      <p className={styles.p}>Phone: +1234567890</p>
      <p className={styles.p}>Email: info@greencorner.com</p>
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
