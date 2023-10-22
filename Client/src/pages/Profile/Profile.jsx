import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import LoadingGif from "../../assets/loading.gif";
import ProfileUser from "./ProfileUser/Profile.userpanel";
import ProfileAdmin from "./ProfileAdmin/Profile.admin";
import Loading from "../../components/Loading/Loading";


const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
