import "tailwindcss/tailwind.css";
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavbarUser from "../../../components/Navbar/Navbar.user";
import ProfileDashboard from "./ProfileDashboard/ProfileDashboard";
import { Link } from "react-router-dom";
import PaymentMethods from "../../../components/PaymentMethods/PaymentMethods";
import Favorites from "../../Favorites";
import ShoppingHistory from "./ShoppingHistory/ShoppingHistory";

const ProfileUser = () => {
  const { user } = useAuth0();

  const renderComponentBasedOnMenu = () => {
    switch (selectedMenu) {
      case "Profile":
        return <ProfileDashboard />;
      case "Shopping history":
         return <ShoppingHistory />;
      case "Payment methods":
        return <PaymentMethods />;
      case "My Garden":
        return <Favorites></Favorites>;

 

      default:
        return <ProfileDashboard />;
    }
  };
  const [selectedMenu, setSelectedMenu] = useState(null);

  return (
    <div className="flex">
      <div className="w-1/6 z-20">
        {/* Menú lateral */}
        <NavbarUser
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

export default ProfileUser;