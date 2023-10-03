import { Routes, Route } from "react-router-dom";
import "./App.css";
import "tailwindcss/tailwind.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Shop from "./pages/Shop/Shop";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import AboutUs from "./components/About Us/AboutUs";
import Navbar from "./components/Navbar/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";
import Create from "./pages/Create";
import Guides from "./pages/Guides/Guides";

const App = () => {
  return (
    <div>
      <Navbar />
      <ToastContainer />
      {/*  <Profile /> */}
      {/*  ESTO BORRARLO SOLO ESTA PARA VER COMO FUNCIONA EL LOGIN*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/create" element={<Create />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/create" element={<Create/>} />
        { <Route path="/profile" element={<Profile/>} /> }
      </Routes>
      {/*<Footer />*/}
    </div>
  );
};

export default App;
