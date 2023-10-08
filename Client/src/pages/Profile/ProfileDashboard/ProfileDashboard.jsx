import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail, updateUser } from "../../../Redux/actions/user/user-actions"; // Importa la acción updateUser
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
      } 


  return (
    <div>
      <h1 className={styles.heading}>Profile</h1>
      <div className={styles.profilePictureContainer}>
        <div className={styles.profilePictureWrapper}>
          <img
            src={tempProfileImage || profileImage || userProfile.picture}
            alt="Profile Picture"
            className={styles.profilePicture}
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
      </div>
      <div className={styles.profileInfo}>
        <p>Email: {user.email}</p>
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
            <button className={styles.buttonEdit} onClick={handleSaveChanges}>Save Changes</button>
            <button className={styles.buttonEdit} onClick={handleCancelEdit}>Cancel</button>
          </div>
        ) : (
          <div className={styles.staticFields}>
            <p>Nickname: {userProfile.nickname}</p>
            <p>Name: {userProfile.name}</p>
            <p>Last Name: {userProfile.lastName}</p>
            <button className={styles.buttonEdit} onClick={handleEditClick}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDashboard;
