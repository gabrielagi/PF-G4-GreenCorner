import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail } from "../../Redux/actions/user/user-actions";

import LoadingGif from "../../assets/loading.gif";
import ProfileUser from "./ProfileUser/Profile.userpanel";
import ProfileAdmin from "./ProfileAdmin/Profile.admin";
import Loading from "../../components/Loading/Loading";


const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);

  useEffect(() => {
    if (user && user.email) {
      //console.log("Un email a buscar", user.email);
      dispatch(getUserByEmail(user.email));
    }
    console.log("Datos email en Profile", userDetail);
  }, [dispatch, user]);

  return (
    <div>
      {isAuthenticated ? (
        userDetail && userDetail.role === "admin" ? (
          <ProfileAdmin />
        ) : (
          <ProfileUser />
        )
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Profile;
