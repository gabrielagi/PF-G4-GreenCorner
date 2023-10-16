import React from "react";
import "tailwindcss/tailwind.css";
import styles from "./Guides.module.css";
import butterfly from "../../../assets/butterfly-icegif-2.gif";

const ButterfliesGuide = () => {
  return (
    <div>
      <div className={styles.butterflies}>
        <img src={butterfly} alt="Butterfly" />
      </div>
    </div>
  );
};

export default ButterfliesGuide;
