import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserByEmail,
  updateUser,
} from "../../../../Redux/actions/user/user-actions";
import styles from "../../ProfileUser/ProfileDashboard/ProfileDashboard.module.css";

function validate(input) {
  const errors = {};

  if (input.nickname && !/^[A-Za-z\s]$/.test(input.nickname)) {
    errors.nickname = "Nickname is required.";
  }

  if (input.name && !/^[A-Za-z\s]{1,30}$/.test(input.name)) {
    errors.name =
      "Name must be a valid string with a maximum length of 30 characters.";
  }

  if (input.lastName && !/^[A-Za-z\s]{1,30}$/.test(input.lastName)) {
    errors.lastName =
      "Name must be a valid string with a maximum length of 30 characters.";
  }

  if (input.email && !/^.+@.+\..+$/.test(input.email)) {
    errors.email =
      "Email must be in a valid format (e.g., example@example.com).";
  }

  return errors;
}

export default function EditUser() {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    nickname: "",
    name: "",
    lastName: "",
    email: "",
    role: "",
    status: "",
  });

  const [errors, setErrors] = useState({
    nickname: "",
    name: "",
    lastName: "",
    email: "",
    role: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors(validate({...userData, [name]: value}))
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validate(userData);
    if (Object.keys(formErrors).length === 0) {
      // No hay errores en la validación
      try {
        const updatedUserData = {
          ...userData,
        };
        console.log(updatedUserData)
        dispatch(updateUser(userData.id, updatedUserData));
        // setEditMode(false);
      } catch (error) {
        console.error("Error al guardar cambios:", error.message);
      }
    } else {
      // Hay errores en la validación
      setErrors(formErrors);
    }
  };

  return (
    <div>
      <div>
        <div className={styles.card_create}>
          <div className={styles.contTitle}>
            <div className={styles.title}>Update you User</div>
          </div>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.form}>
              <div className={styles.izq}>
                <div>
                  <div>Nickname:</div>
                  <input
                    type="text"
                    value={userData.nickname}
                    onChange={handleChange}
                    name="nickname"
                    placeholder="Nickname"
                    className="w-full rounded-lg border border-blue-200 p-4 pe-12 text-[12px] shadow-sm"
                  />
                  {errors.nickname && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.nickname}
                    </div>
                  )}
                </div>

                <div>
                  <div>Name:</div>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={handleChange}
                    name="name"
                    placeholder="Name"
                    className="w-full rounded-lg border border-blue-200 p-4 pe-12 text-[12px] shadow-sm"
                  />
                  {errors.name && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <div>Last Name:</div>
                  <input
                    type="text"
                    value={userData.lastName}
                    onChange={handleChange}
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full rounded-lg border border-blue-200 p-4 pe-12 text-[12px] shadow-sm"
                  />
                  {errors.lastName && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </div>
                  )}
                </div>

                <div>
                  <div>Email:</div>
                  <input
                    type="text"
                    value={userData.email}
                    onChange={handleChange}
                    name="email"
                    placeholder="Email"
                    className="w-full rounded-lg border border-blue-200 p-4 pe-12 text-[12px] shadow-sm"
                  />
                  {errors.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div>
                  <div>Role:</div>
                  <select
                    className="w-full rounded-lg border border-blue-200 p-4 pe-12 text-[12px] shadow-sm"
                    id="role"
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className={styles.der}>
                <button
                  id="bt"
                  className={styles.button}
                  onClick={(e) => handleSubmit(e)}
                  disabled={Object.keys(errors).length > 0}
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
