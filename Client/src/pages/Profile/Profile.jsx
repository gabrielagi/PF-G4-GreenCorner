import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail } from "../../Redux/actions/user/user-actions";
import NavbarUser from "./../../components/Navbar/Navbar.user";
import NavbarAdmin from "./../../components/Navbar/Navbar.admin";
import LoadingGif from "../../assets/loading.gif";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);

  useEffect(() => {
    if (user && user.email) {
      console.log("Un email a buscar", user.email);
      dispatch(getUserByEmail(user.email));
    }
  }, [dispatch, user]);

  return (
    <div>
      {isAuthenticated ? (
        userDetail && userDetail.role === "user" ? (
          <NavbarUser user={userDetail} />
        ) : (
          <NavbarAdmin user={userDetail} />
        )
      ) : (
        // window.redirect("/login")
        <img src={LoadingGif} alt="Loading information profile" />
      )}
    </div>
  );
};

export default Profile;
