import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./LoginButton.module.css"; 
import { AiOutlineUserAdd } from "react-icons/ai";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={styles.buttonContainer}>
      <button
        onClick={() => loginWithRedirect()}
        className={styles.primaryButton} 
        id={styles.buttonLarge}
      >
        Login
      </button>
      <button
        onClick={() => loginWithRedirect()}
        className={styles.primaryButton} 
        id={styles.buttonSmall}
      >
        <AiOutlineUserAdd style={{ fontSize: "17px" }} />
      </button>
    </div>
  );
};

export default LoginButton;

