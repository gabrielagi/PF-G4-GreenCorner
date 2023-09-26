import { Routes, Route, } from "react-router-dom";
import "./App.css";
import "tailwindcss/tailwind.css";
import NavbarUser from "./components/Navbar/Navbar.user";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Shop from "./pages/Shop";
import Favourites from "./pages/Favourites";
import Profile from "./pages/Profile";


const App = () => {
  
  return(
  
    <div>
      <NavbarUser />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/favourites' element={<Favourites />} />
          <Route path='/profile' element={<Profile />} />

        </Routes>

    </div>
  );
}

export default App;
