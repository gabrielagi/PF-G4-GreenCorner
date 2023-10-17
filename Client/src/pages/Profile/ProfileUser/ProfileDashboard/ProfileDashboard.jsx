import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserByEmail,
  updateUser,
} from "../../../../Redux/actions/user/user-actions"; // Importa la acción updateUser
import styles from "./ProfileDashboard.module.css";

const ProfileDashboard = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nickname: "",
    name: "",
    lastName: "",
    picture: "",
  });
  const [profileImage, setProfileImage] = useState("");
  const [tempProfileImage, setTempProfileImage] = useState("");
  const [originalProfileImage, setOriginalProfileImage] = useState("");

  useEffect(() => {
    dispatch(getUserByEmail(user.email));
  }, [dispatch, user.email]);

  const userProfile = useSelector((state) => state.userDetail);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = () => {
    setFormData({
      nickname: userProfile.nickname,
      name: userProfile.name,
      lastName: userProfile.lastName,
      picture: userProfile.picture,
    });
    setEditMode(true);
    setOriginalProfileImage(profileImage || userProfile.picture);
  };

  const handleCancelEdit = () => {
    setFormData({
      nickname: "",
      name: "",
      lastName: "",
      picture: "",
    });
    setTempProfileImage("");
    setProfileImage(originalProfileImage);
    setEditMode(false);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedUserData = {
        ...formData,
      };
      dispatch(updateUser(userProfile.id, updatedUserData));
      setTempProfileImage("");
      setProfileImage(updatedUserData.picture);
      setEditMode(false);
    } catch (error) {
      console.error("Error al guardar cambios:", error.message);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    try {
      const base64Image = await convertBase64(file);
      setTempProfileImage(base64Image);
      setFormData({
        ...formData,
        picture: base64Image,
      });
    } catch (error) {
      console.error("Error al convertir la imagen:", error.message);
    }
  };

  return (
    <div className={styles.centeredContainer}>
      <div className={styles.card2}>
        <div className={styles.card__image2}>
          <img
            src={tempProfileImage || profileImage || userProfile.picture}
            alt="Profile Picture"
          />
        </div>
        {editMode && (
          <div className={styles.imageUpload}>
            <label htmlFor="profile-image" className={styles.uploadLabel}>
              Change Profile Image
            </label>
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.uploadInput}
            />
          </div>
        )}
        <p className={styles.card__title2}>{user.email}</p>
        <div>
          {editMode ? (
            <div className={styles.editableFields}>
              <input
                className={styles.inputEdit}
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                placeholder="Nickname"
              />
              <input
                className={styles.inputEdit}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <input
                className={styles.inputEdit}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
              <button className={styles.buttonEdit} onClick={handleSaveChanges}>
                Save Changes
              </button>
              <button
                className={styles.buttonEditCancel}
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className={styles.staticFields}>
              <p>
                <span className={`${styles.card__text2} inline-block`}>
                  Nickname:
                </span>{" "}
                <span className="inline-block">{userProfile.nickname}</span>
              </p>
              <p>
                <span className={`${styles.card__text2} inline-block`}>
                  Name:
                </span>{" "}
                <span className="inline-block">{userProfile.name}</span>
              </p>
              <p>
                <span className={`${styles.card__text2} inline-block`}>
                  Last Name:
                </span>{" "}
                <span className="inline-block">{userProfile.lastName}</span>
              </p>

              <button className={styles.buttonEdit} onClick={handleEditClick}>
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
