import { Routes, Route } from "react-router-dom";
import "./App.css";
import "tailwindcss/tailwind.css";
import "react-alice-carousel/lib/alice-carousel.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Shop from "./pages/Shop/Shop";
import Carts from "./components/Cart/Carts";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile/Profile";
import AboutUs from "./components/About Us/AboutUs";
import Navbar from "./components/Navbar/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";
import Create from "./pages/Create/Create";
import Guides from "./pages/Guides/Guides";
import ContactUs from "./pages/Contact-Us/ContactUs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { postUser } from "./Redux/actions/user/user-actions";
import OurTeam from "./components/OurTeam/OurTeam";
import PrivateRoute from "./PrivateRoute";
import NotVerified from "./components/NotVerified/NotVerified";

import DetailCarousel from "./components/DetailCarousel/DetailCarousel";

const App = () => {
  //Carga de usuarios
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      console.log(user);
      const userData = {
        nickname: user.nickname,
        picture: user.picture,
        email: user.email,
        email_verified: user.email_verified,
      };
      console.log(userData);
      dispatch(postUser(userData));
    }
  }, [user, isAuthenticated, isLoading, dispatch]);

  return (
    <div>
      <Navbar />

      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fail" element={<NotVerified />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/shop" element={<Shop />} />

        <Route path="/cart" element={<Carts />} />

        {/* RUTAS PRIVADAS AL INGRESAR SI NO ESTAS LOGIN TE REDIRIGE A HOME */}
        <Route
          path="/favorites"
          element={
            <PrivateRoute
              element={<Favorites />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute
              element={<Profile />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route path="/create" element={<Create />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/prueba" element={<DetailCarousel />} />

        <Route path="/contact-us" element={<ContactUs />} />
        {/* { <Route path="/profile" element={<Profile/>} /> } */}
      </Routes>
    </div>
  );
};

export default App;
