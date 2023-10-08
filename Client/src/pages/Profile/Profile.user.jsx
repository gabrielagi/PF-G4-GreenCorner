import "tailwindcss/tailwind.css";
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavbarUser from "../../components/Navbar/Navbar.user";
import ProfileDashboard from "./ProfileDashboard/ProfileDashboard";

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
        return <p>Esto muestra mis favoritos</p>;
      // Resto de componentes en el menu
      default:
        return null;
    }
  };
  const [selectedMenu, setSelectedMenu] = useState(null);

  return (
    <div className="flex">
      <div className="flex-grow">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            {/* Menú lateral */}
            <NavbarUser
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          </div>
          <div className="col-span-1">
            {/* Componente renderizado */}
            {renderComponentBasedOnMenu()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
