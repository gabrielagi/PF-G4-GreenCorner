import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserByEmail,
  updateUser,
} from "../../../../Redux/actions/user/user-actions";
import styles from "../../ProfileUser/ProfileDashboard/ProfileDashboard.module.css";

function validate(input) {
  const errors = {};

  if (input.nickname && input.nickname.length > 40) {   
    errors.nickname = "Nickname must be a valid string with a maximum length of 40 characters.";
  }

  if (input.name && !/^[A-Za-z\s]{1,40}$/.test(input.name)) { 
    errors.name = "Name must be a valid string with a maximum length of 40 characters.";
  }

  if (input.lastName && !/^[A-Za-z\s]{1,40}$/.test(input.lastName)) {
    errors.lastName = "Name must be a valid string with a maximum length of 40 characters.";
  }

  return errors;
}



export default function EditUser({ user, onSave, onClose }) {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    nickname: user.nickname || "",
    name: user.name || "",
    lastName: user.lastName || "",
    email: user.email || "",
    role: user.role || "",
    status: user.status || "",
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
    setErrors(validate({ ...userData, [name]: value }));
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
        dispatch(updateUser(user.id, updatedUserData))
          .then(() => {
            // Llamamos a la función onSave para guardar los cambios
            onSave();
          })
          .catch((error) => {
            console.error("Error al guardar cambios:", error.message);
          });
      } catch {
        // Hay errores en la validación
        setErrors(formErrors);
      }
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
                  <div>Status:</div>
                  <select
                    className="w-full rounded-lg border border-blue-200 p-4 pe-12 text-[12px] shadow-sm"
                    id="status"
                    name="status"
                    value={userData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
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
