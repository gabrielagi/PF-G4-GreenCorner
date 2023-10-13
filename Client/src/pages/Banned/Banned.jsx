import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Banned.module.css";
import ContactUs from "../Contact-Us/ContactUs";
import { MdDangerous } from "react-icons/md";
import {BsFillArrowLeftCircleFill}  from "react-icons/bs";

const Banned = () => {
  const { logout } = useAuth0();
  const [showContactUs, setShowContactUs] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);

  const handleLogout = () => {
    logout();
  };

  const handleContactUsClick = () => {
    setShowContactUs(true) 
    setContentVisible(false);
  };

  return (
    <div>
    {contentVisible && (
    <div className={styles.bannedContainer}>
        <div className={styles.bannedContent}>
          <MdDangerous className={styles.bannedIcon} />
          <h1 className={styles.bannedTitle}>Your account has been blocked</h1>
          <p className={styles.bannedText}>
            We regret to inform you that your account has been temporarily
            blocked due to a violation of our community guidelines. Some of the
            possible reasons for the suspension may include (but are not limited
            to):
            <ul className={styles.bannedList}>
              <li>
              🌱Using fraudulent information or counterfeit currency for
                transactions.
              </li>
              <li>🌱Spamming or engaging in fraudulent activities.</li>
              <li>🌱Posting inappropriate or offensive content.</li>
              <li>🌱Leaving offensive or inappropriate comments.</li>
              <li>🌱Participating in any form of harmful or disruptive behavior.</li>
            </ul>
            <p className={styles.linkText}>
            If you believe this is an error or would like to appeal the decision,
            please feel free to{" "}
            <span className={styles.contactLink} onClick={handleContactUsClick}>
              contact us
            </span>{" "}
            and provide any additional information that may help resolve the issue.
            </p>           
          </p>
          <div className={styles.buttonContainer}>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      )}
    {showContactUs && (
        <div>
            <div className={styles.arrowBack}>        
              <BsFillArrowLeftCircleFill className={styles.goBackArrow} onClick={() => (setShowContactUs(false), setContentVisible(true))}/>
            </div>
            <div className={styles.contactUs}>
      <ContactUs />
    </div>
        </div>
    )}
    </div>
  );
};

export default Banned;
