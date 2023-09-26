import "tailwindcss/tailwind.css";

import React from "react";

function NavbarUser() {
  return (
    <nav className="bg-[#1d252d] p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-bold">Mi Sitio</div>
          <ul className="flex space-x-4">
            <li className="text-white hover:text-gray-300 cursor-pointer">
              Inicio
            </li>
            <li className="text-white hover:text-gray-300 cursor-pointer">
              Acerca de
            </li>
            <li className="text-white hover:text-gray-300 cursor-pointer">
              Servicios
            </li>
            <li className="text-white hover:text-gray-300 cursor-pointer">
              Contacto
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarUser;
