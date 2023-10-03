import React, { useState } from "react";
import styles from "./ContactUs.module.css";


const ContactUs = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Nombre:", name);
    console.log("Mensaje:", message);
  
    setName("");
    setMessage("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card2}>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.contactInput} 
              />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className={styles.textArea} 
            />
          </div>
          <button  className={styles.contactSubmitButton}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;