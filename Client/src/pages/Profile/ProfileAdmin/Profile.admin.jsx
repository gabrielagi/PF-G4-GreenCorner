import "tailwindcss/tailwind.css";
import React, { useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import NavbarAdmin from "../../../components/Navbar/Navbar.admin";
import Create from "./Create/Create";
import ShowUsers from "./UserSettings/ShowUsers";
import Category from "./CategoryCrud/CategoryCrud";
import PaymentMethods from "../../../components/PaymentMethods/PaymentMethods";
import ProfileDashboard from "../ProfileUser/ProfileDashboard/ProfileDashboard";
import ProductDashboard from "./ProductDashboard/ProductDashboard";
import OrderAdmin from "./OrderAdmin/OrderAdmin";
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
        return <ShowUsers />;
      case "Orders":
          return <OrderAdmin />;
      case "Payment methods":
        return <PaymentMethods />;
      case "Categories":
        // return <PaymentMethods />;
        return <Category />;

      // Resto de componentes en el menu
      default:
        return <ProfileDashboard />;
    }
  };
  const [selectedMenu, setSelectedMenu] = useState(null);

  return (
    <div className="flex">
      <div className="w-1/6 z-20">
        {/* Menú lateral */}
        {/* Menú lateral */}
        <NavbarAdmin
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      </div>
      <div className="w-5/6 sm:mr-40 z-10">
        {/* Componente renderizado */}
        {renderComponentBasedOnMenu()}
      </div>
    </div>
  );
};

export default ProfileAdmin;
