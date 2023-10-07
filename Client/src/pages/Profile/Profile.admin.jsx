import "tailwindcss/tailwind.css";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavbarAdmin from "../../components/Navbar/Navbar.admin";

const ProfileAdmin = () => {
  const { user } = useAuth0();
  return (
    <div>
      <NavbarAdmin />
    </div>
  );
};

export default ProfileAdmin;
