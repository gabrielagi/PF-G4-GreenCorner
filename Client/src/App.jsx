import { Routes, Route } from "react-router-dom";
import "./App.css";
import "tailwindcss/tailwind.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Shop from "./pages/Shop";
import Favorites from "./pages/Favorites";
/* import Profile from "./pages/Profile"; */
import Navbar from "./components/Navbar/Navbar";
import AboutUs from "./components/About Us/AboutUs";
import Nav from "./components/Nav/Nav";
/* import LoginButton from "./components/Auth0/LoginButton";
import Profile from "./components/Auth0/ProfileExample";
import LogoutButton from "./components/Auth0/LogoutButton"; */
import { useAuth0 } from "@auth0/auth0-react";
  

const App = () => {

/* const {isAuthenticated} = useAuth0(); */


  return (
    <div>



      <Nav />
      {/* {isAuthenticated ?<LogoutButton/> : <LoginButton/> }
     
      
      <Profile/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<AboutUs />} />
       {<Route path="/aboutus" element={<Detail />} /> }
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        
      </Routes>
    </div>
  );
};

export default App;
