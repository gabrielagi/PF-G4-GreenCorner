import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { GrCart, GrSearch } from "react-icons/gr";
import { AiFillShop } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { Badge } from "@mui/material";
import LoginButton from "../Auth0/LoginButton";
import LogoutButton from "../Auth0/LogoutButton";
import leaf from "../../assets/leaf.png";
import person from "../../assets/person.png";
import fav from "../../assets/favorito.png";
import logout from "../../assets/cerrar-sesion.png";
import { getProductByName, getProductCart } from "../../Redux/actions/product/action";
import { toast } from "react-toastify";
import styles from "./Navbar.module.css";
import loading from "../../assets/loading.gif";
import { useLocation } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const inputRef = useRef(null);
  const products = useSelector((state) => state.productCart);
  const userDetail = useSelector((state) => state.userDetail);
  let count = products.length;
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (isSearchVisible) {
      inputRef.current.focus();
    }
    if (user && user.email) {
      dispatch(getProductCart(user.email));
    }
  }, [isSearchVisible, dispatch, user]);

  useEffect(() => {
    const closeMenuOnClickOutside = (e) => {
      if (open && !e.target.closest(`.${styles.userMenu}`) && !e.target.closest(`.${styles.container}`)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", closeMenuOnClickOutside);
    
    return () => {
      document.removeEventListener("click", closeMenuOnClickOutside);
    };
  }, [open,count]);

  const handleSearchMouseEnter = () => {
    if (searchValue) {
      dispatch(getProductByName(searchValue))
        .then((response) => {
          if (response) {
            navigate("/shop");
          }
        })
        .catch((error) => {
          console.log(error);
          notify();
        });
    } else {
      setSearchVisible(!isSearchVisible);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchValue) {
      handleSearchMouseEnter();
    } else if (e.key === "Enter" && !searchValue) {
      dispatch(getProductByName(searchValue));
    }
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const isLinkActive = (path) => {
    return location.pathname === path;
  };



  const notify = () =>
    toast.error("Product not found, try again.🪴", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <nav className={styles.nav}>
      <a href="/" className={styles.nav__brand}>
        GreenCorner <img src={leaf} className={styles.logo} alt="GreenCorner Logo" />{" "}
      </a>

      <ul className={styles.nav__menu}>
        <li className={styles.nav__item}>
          <a href="/" className={`${styles.nav__link} ${isLinkActive("/") ? styles.activeLink : ""}`}>
            <div className={styles.home}>Home</div>
          </a>
        </li>
        <li className={styles.nav__item}>
          <Link to="/shop" className={`${styles.nav__link} ${isLinkActive("/shop") ? styles.activeLink : ""}`}>
            Products
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link to="/guides" className={`${styles.nav__link} ${isLinkActive("/guides") ? styles.activeLink : ""}`}>
            Guide
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link to="/about-us" className={`${styles.nav__link} ${isLinkActive("/about-us") ? styles.activeLink : ""}`}>
            About Us
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link to="/contact-us" className={`${styles.nav__link} ${isLinkActive("/contact-us") ? styles.activeLink : ""}`}>
            Contact Us
          </Link>
        </li>
      </ul>
      <div className={styles.nav__toggler}>
        
        {!isLoading ? (
          <>
            <a href="/shop" className={styles.shop}>
              <AiFillShop style={{ fontSize: "24px" }} /> <p className={styles.p}>Products</p>
            </a>
            <a href="#" className={styles.guide}>
              <BsBook style={{ fontSize: "24px" }} /> <p className={styles.p}>Guide</p>
            </a>
            <div className={styles.search} onKeyDown={handleKeyDown}>
              <input
                type="text"
                placeholder="Search here..."
                ref={inputRef}
                className={`${styles.searchInput} ${
                  isSearchVisible ? styles.searchInputVisible : ""
                }`}
                value={searchValue}
                onChange={handleInputChange}
              />
              <a href="#" className={styles.search}>
                <GrSearch
                  onClick={handleSearchMouseEnter}
                  style={{ fontSize: "24px" }}
                />{" "}
                <p className={styles.p}>Search</p>
              </a>
            </div>

            <Badge badgeContent={count} color="success">
              <Link to="/cart" className={styles.cart}>
                <GrCart style={{ fontSize: "24px" }} /> <p className={styles.p}>Cart</p>
              </Link>
            </Badge>
            {isAuthenticated ? (
              <div className={styles.container}>
                <img
                  onClick={() => setOpen(!open)}
                  src={userDetail.picture || user.picture}
                  alt={user.name}
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50px",
                    objectFit: "fill",
                  }}
                />
                {open && (
                  <div className={styles.userMenu}>
                    <ul>
                      <li className={styles.li}>
                        <Link to="/profile">
                          <img src={person} alt="Profile" /> Profile
                        </Link>
                      </li>
                      <li className={styles.li}>
                        <Link to="/favorites">
                          <img src={fav} alt="My Garden" /> My Garden
                        </Link>
                      </li>
                      <li className={styles.li}>
                        <a>
                          <img src={logout} alt="Logout" />
                          <LogoutButton />
                        </a>
                      </li>
                    </ul>
                    <div className={styles.arrow}></div>
                  </div>
                )}
              </div>
            ) : (
              <LoginButton />
            )}
          </>
        ) : (
          <div className={styles.loading}>
          <img src={loading} alt="Loading" />
        </div>
        )

        
        }
      </div>
    </nav>
  );
};

export default Nav;
