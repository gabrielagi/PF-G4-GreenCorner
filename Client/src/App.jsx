import { Routes, Route } from "react-router-dom";
import "./App.css";
import "tailwindcss/tailwind.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Shop from "./pages/Shop";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
