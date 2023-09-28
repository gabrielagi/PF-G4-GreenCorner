import styles from "./Nav.module.css";
import { CiUser } from "react-icons/ci";
import { GrCart } from "react-icons/gr";
import { GrSearch } from "react-icons/gr";
import LoginButton from "../Auth0/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Auth0/LogoutButton";
import {AiFillShop} from "react-icons/ai";
import {BsBook} from "react-icons/bs";

const Nav = () => {
  const { isAuthenticated } = useAuth0();
 

  return (
    <nav className={styles.nav}>
      <a href="/" className={styles.nav__brand}>
        GreenCorner 🍃
      </a>
  
      <ul className={styles.nav__menu}>
        <li className={styles.nav__item}>
          <a href="/" className={styles.nav__link}>
            <div className={styles.home}>Home</div>
          </a>
        </li>
        <li className={styles.nav__item}>
          <a href="shop" className={styles.nav__link}>
            Products
          </a>
        </li>
        <li className={styles.nav__item}>
          <a href="guide" className={styles.nav__link}>
            Guide
          </a>
        </li>
        <li className={styles.nav__item}>
          <a href="about-us" className={`${styles.nav__link} ${styles.aboutUs}`}>
            About Us
          </a>
        </li>
        <li className={styles.nav__item}>
          <a href="contact-us" className={styles.nav__link}>
            Contact Us
          </a>
        </li>
      </ul>
      <div className={styles.nav__toggler}>
        <a href="/shop" className={styles.shop}>
          <AiFillShop style={{ fontSize: "24px" }} /> <a>Products</a>
        </a>
        <a href="#" className={styles.guide}>
          <BsBook style={{ fontSize: "24px" }} /> <a>Guide</a>
        </a>
        <a href="#" className={styles.someOtherClass}>
          <GrSearch style={{ fontSize: "24px" }} /> <a>Search</a>
        </a>
        <a href="#" className={styles.anotherClass}>
          <GrCart style={{ fontSize: "24px" }} /> <a>Cart</a>
        </a>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </nav>
  );
  
};

export default Nav;
