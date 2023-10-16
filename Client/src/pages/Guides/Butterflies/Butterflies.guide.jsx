import React from "react";
import "tailwindcss/tailwind.css";
import styles from "./Guides.module.css";
import butterfly from "../../../assets/butterfly-icegif-2.gif";

const ButterfliesGuide = () => {
  return (
    <div>
      <div className={styles.butterflies}>
        <div className={styles.butterfly2}>
          <img src={butterfly} alt="Butterfly 2" />
        </div>
      </div>
      <div className={styles.butterflies}>
        <div className={styles.butterfly3}>
          <img src={butterfly} alt="Butterfly 2" />
        </div>
      </div>
      <div className={styles.butterfly}>
        <img src={butterfly} alt="Butterfly" className="w-[60px]" />
      </div>
    </div>
  );
};

export default ButterfliesGuide;
