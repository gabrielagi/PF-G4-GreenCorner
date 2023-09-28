import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./LoginButton.css"; 
import {AiOutlineUserAdd} from "react-icons/ai";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  
  return (
    <div className="button-container">
      <button
        onClick={() => loginWithRedirect()}
        className="primaryButton"
        id="buttonLarge"
      >
        Ingresar
      </button>
      <button
        onClick={() => loginWithRedirect()}
        className="primaryButton"
        id="buttonSmall"
      >
        <AiOutlineUserAdd style={{ fontSize: "17px" }} />
      </button>
    </div>
  );
};

export default LoginButton;
