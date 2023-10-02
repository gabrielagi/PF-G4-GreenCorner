import { Routes, Route } from "react-router-dom";
import "./App.css";
import "tailwindcss/tailwind.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Shop from "./pages/Shop/Shop";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import AboutUs from "./components/About Us/AboutUs";
import Nav from "./components/Nav/Nav";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";
import Create from "./pages/Create";

const App = () => {
  const notify = () =>
    toast.error("Product not found, try again.🪴", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light ",
    });

  return (
    <div>
      
      <Nav notify={notify} />
      <ToastContainer />
     {/*  <Profile /> */}
      {/*  ESTO BORRARLO SOLO ESTA PARA VER COMO FUNCIONA EL LOGIN*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/create" element={<Create/>} />
        {/* <Route path="/profile" element={<Profile/>} /> */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
