import "tailwindcss/tailwind.css";
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileUser from "./Profile.user";
import ProfileAdmin from "./Profile.admin";
import { getUserByRol } from "../../Redux/actions/user/user-actions";

const ProfileUser = () => {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    dispatch(getUserByRol(user.id));
  }, [id]);

  // Verifico si el rol es "user"
  if (isAuthenticated) {
    if (userRole === "user") {
      return <ProfileUser />;
    } else {
      return <ProfileAdmin />;
    }
  } else {
  }
};

export default ProfileUser;
