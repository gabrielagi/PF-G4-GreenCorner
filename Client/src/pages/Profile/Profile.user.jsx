import "tailwindcss/tailwind.css";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavbarUser from "../../components/Navbar/Navbar.user";

const ProfileUser = () => {
  const { user } = useAuth0();
  return (
    <div>
      <NavbarUser />
    </div>
  );
};

export default ProfileUser;
