import "tailwindcss/tailwind.css";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import React from "react";

const ProfileUser = () => {
  const { user, isAuthenticated } = useAuth0();
  return <div>{isAuthenticated && <p>Esta logueado</p>}</div>;
};

export default ProfileUser;
