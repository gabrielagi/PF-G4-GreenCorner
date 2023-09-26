import "../Nav/Nav.css";
import { CiUser } from "react-icons/ci";
import { GrCart } from "react-icons/gr";
import { GrFormSearch } from "react-icons/gr";

const Nav = () => {
  return (
    <nav className="nav">
      <a href="#" className="nav__brand">
        GreenCorner
      </a>
      <ul className="nav__menu">
        <li className="nav__item">
          <a href="#" className="nav__link">
            Home
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            About Us
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Products
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            News
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
          <GrFormSearch />
        </a>
        <a href="#">
          <GrCart />
        </a>
        <a href="#">
          <CiUser />
        </a>
      </div>
    </nav>
  );
};
export default Nav;
