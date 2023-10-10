import "tailwindcss/tailwind.css";
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavbarUser from "../../../components/Navbar/Navbar.user";
import ProfileDashboard from "./ProfileDashboard/ProfileDashboard";
import { Link } from "react-router-dom";
const ProfileUser = () => {
  const { user } = useAuth0();

  const renderComponentBasedOnMenu = () => {
    switch (selectedMenu) {
      case "Profile":
        return <ProfileDashboard />;
      case "Shopping history":
        // return <ShoppingHistory />;
        return <p>Esto muestra el Historial de Compra</p>;
      case "Payment methods":
        // return <PaymentMethods />;
        return <p>Esto muestra los métodos de pago</p>;
      case "My Garden":
        // return <PaymentMethods />;
        return <Link to="/about-us"></Link>;
      default:
        return null;
    }
  };
  const [selectedMenu, setSelectedMenu] = useState(null);

  return (
    <div className="flex">
      <div className="w-1/4">
        {/* Menú lateral */}
        <NavbarUser
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          style={{ position: "relative", zIndex: 999 }}
        />
      </div>
      <div className="w-3/4" style={{ position: "relative", zIndex: 1 }}>
        {/* Componente renderizado */}
        {renderComponentBasedOnMenu()}
      </div>
    </div>
  );
};

export default ProfileUser;
