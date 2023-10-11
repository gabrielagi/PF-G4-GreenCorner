import "tailwindcss/tailwind.css";
import React, { useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import NavbarAdmin from "../../../components/Navbar/Navbar.admin";
import Create from "./Create/Create";
import ShowUsers from "./ShowUsers";

const ProfileAdmin = () => {
  const { user } = useAuth0();

  const renderComponentBasedOnMenu = () => {
    switch (selectedMenu) {
      case "Create Product":
        // return <Profile />;
        // return <p>Esto muestra formulario de creacion de producto</p>;
        return <Create />;
      case "Profile":
        // return <Profile />;
        return <p>Esto muestra el Profile</p>;
      case "Shopping history":
        // return <ShoppingHistory />;
        return <ShowUsers />;
      case "Payment methods":
        // return <PaymentMethods />;
        return <p>Esto muestra los métodos de pago</p>;
      case "My Garden":
        // return <PaymentMethods />;
        return <p>Esto muestra mis favoritos</p>;
      // Resto de componentes en el menu
      default:
        return null;
    }
  };
  const [selectedMenu, setSelectedMenu] = useState(null);

  return (
    <div className="flex">
      <div className="w-1/5">
        {/* Menú lateral */}
        {/* Menú lateral */}
        <NavbarAdmin
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      </div>
      <div className="w-4/5" style={{ position: "relative", zIndex: 1 }}>
        {/* Componente renderizado */}
        {renderComponentBasedOnMenu()}
      </div>
    </div>
  );
};

export default ProfileAdmin;
