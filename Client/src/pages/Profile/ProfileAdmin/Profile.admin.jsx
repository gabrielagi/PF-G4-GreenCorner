import "tailwindcss/tailwind.css";
import React, { useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import NavbarAdmin from "../../../components/Navbar/Navbar.admin";
import Create from "./Create/Create";
import ShowUsers from "./UserSettings/ShowUsers";
import PaymentMethods from "../../../components/PaymentMethods/PaymentMethods";
import ProfileDashboard from "../ProfileUser/ProfileDashboard/ProfileDashboard";
import ProductDashboard from "./ProductDashboard/ProductDashboard";
import EditUser from "./UserSettings/EditUser";
/* import ShowUsers from "./ShowUsers"; */

const ProfileAdmin = () => {
  const { user } = useAuth0();

  const renderComponentBasedOnMenu = () => {
    switch (selectedMenu) {
      case "Create Product":
        return <Create />;
      case "Products":
        return <ProductDashboard />;
      case "Profile":
        return <ProfileDashboard />;
      case "Users":
        // return <ShoppingHistory />;
        return <ShowUsers />;
      case "Payment methods":
        return <PaymentMethods />;
      case "Charts":
        // return <PaymentMethods />;
        return <EditUser/>
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
