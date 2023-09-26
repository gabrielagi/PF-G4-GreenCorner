import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import "tailwindcss/tailwind.css";
import NavbarUser from "./components/Navbar/Navbar.user";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavbarUser />
    </>
  );
}

export default App;
