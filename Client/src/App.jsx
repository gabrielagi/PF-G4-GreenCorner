import { Routes, Route } from "react-router-dom";
import "./App.css";
import "tailwindcss/tailwind.css";
import NavbarUser from "./components/Navbar/Navbar.user";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

const App = () => {
  return (
    <div>
      <NavbarUser />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        {/* <Route path='/shop' element={< />} />
          <Route path='/favourites' element={<Favourites />} /> */}
      </Routes>
    </div>
  );
};

export default App;
