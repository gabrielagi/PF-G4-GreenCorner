import "tailwindcss/tailwind.css";
import React, { useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import NavbarAdmin from "../../../components/Navbar/Navbar.admin";
import Create from "./Create/Create";
import ShowUsers from "./UserSettings/ShowUsers";
import ProfileDashboard from "../ProfileUser/ProfileDashboard/ProfileDashboard";
import PaymentMethods from "../../../components/PaymentMethods/PaymentMethods";

const ProfileAdmin = () => {
  const { user } = useAuth0();

  const renderComponentBasedOnMenu = () => {
    switch (selectedMenu) {
      case "Create Product":
        return <Create />;
      case "Profile":
        // return <Profile />;
        return <ShowUsers />;
      case "Shopping history":
        // return <ShoppingHistory />;
        return <p>Esto muestra el Historial de Compra</p>;
      case "Payment methods":
        return <PaymentMethods />;
      case "My Garden":
        // return <PaymentMethods />;
        return <p>Esto muestra mis favoritos</p>;
      // Resto de componentes en el menu
      default:
        return <ProfileDashboard />;
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
