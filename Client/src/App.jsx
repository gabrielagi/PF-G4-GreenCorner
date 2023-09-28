import { Routes, Route } from "react-router-dom";
import "./App.css";
import "tailwindcss/tailwind.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Shop from "./pages/Shop";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar/Navbar";
import AboutUs from "./components/About Us/AboutUs";
import Nav from "./components/Nav/Nav";
import { useAuth0 } from "@auth0/auth0-react";
  
import Footer from "./components/Footer/Footer";

const App = () => {

  return (
    <div>
      <Nav />
      <Profile/> {/*  ESTO BORRARLO SOLO ESTA PARA VER COMO FUNCIONA EL LOGIN*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<AboutUs />} />
       {/*<Route path="/aboutus" element={<Detail />} /> */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/favorites" element={<Favorites />} />
        {/* <Route path="/profile" element={<Profile/>} /> */}
        
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
