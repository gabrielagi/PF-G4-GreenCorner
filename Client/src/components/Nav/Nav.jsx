import "../Nav/Nav.css";
import { CiUser } from "react-icons/ci";
import { GrCart } from "react-icons/gr";
import { GrSearch } from "react-icons/gr";
import LoginButton from "../Auth0/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Auth0/LogoutButton";
import {ImMenu3} from "react-icons/im";

const Nav = () => {
  const { isAuthenticated } = useAuth0();
 

  return (
    <nav className="nav">
      <a href="/" className="nav__brand">
        GreenCorner 🍃
      </a>
    
      <ul className="nav__menu">
        
        <li className="nav__item">
          <a href="/" className="nav__link">
            <div className="home">Home</div>
          </a>
        </li>
        <li className="nav__item">
          <a href="shop" className="nav__link">
            Products
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Guide
          </a>
        </li>
        <li className="nav__item">
          <a href="about-us" className="nav__link ">
            About Us
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Contact Us
          </a>
        </li>
      </ul>
      <div className="nav__toggler">
  <a href="#">
    <GrSearch style={{ fontSize: "24px" }} />
  </a>  
  
  <a href="#">
    <GrCart style={{ fontSize: "24px" }} />
  </a>
  
  {isAuthenticated ? <LogoutButton /> : <LoginButton />}
</div>

    </nav>
  );
};

export default Nav;
