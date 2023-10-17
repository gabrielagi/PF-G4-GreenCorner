import React from "react";
import users from "./users.json";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  deleteUser,
  updateUserFromEdit,
  orderUserByName,
  orderUserByRole,
  orderUserByStatus,
} from "../../../../Redux/actions/user/user-actions";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import InputLabel from "@mui/material/InputLabel";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import { setCurrentPage } from "../../../../Redux/actions/product/action";
import { FiRefreshCcw } from 'react-icons/fi';
import { MdSettingsBackupRestore } from "react-icons/md";

const ShowUsers = () => {
  const allUsers = useSelector((state) => state.allUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [nameOrder, setNameOrder] = useState("name");
  const [roleOrder, setRoleOrder] = useState("admin");
  const [statusOrder, setStatusOrder] = useState("status");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const currentPage = useSelector((state) => state.pagination.currentPage);
  const usersPerPage = 5;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    // Realiza la búsqueda automáticamente cuando searchTerm cambie
    // Filtra la lista completa de usuarios en función de la búsqueda
    dispatch(setCurrentPage(1));
    const filtered = allUsers.filter((user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, allUsers]);

  const handleChangePage = (event, value) => {
    dispatch(setCurrentPage(value)); // Actualiza la página actual en el estado de Redux
  };

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null); // Nuevo estado para rastrear el usuario seleccionado

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRefresh = () => {
    setRoleOrder("name"); 
    setFilteredUsers(allUsers); 
    setNameOrder(""); 
    setStatusOrder(""); 
    setSearchTerm(""); 
    dispatch(setCurrentPage(1)); 
  };
  

  const editUser = (user) => {
    // Abre el modal de edición y establece selectedUserId y formData en los datos del usuario seleccionado
    setEditMode(true);
    console.log("Contenido user: ", user);
    setFormData(user);
    console.log("Contenido Form Data: ", formData);
    setSelectedUserId(user.id);
  };

  const saveUserChanges = () => {
    // Verifica si hay un usuario seleccionado
    if (selectedUserId !== null) {
      const updatedUserData = {
        nickname: formData.nickname,
        name: formData.name,
        lastName: formData.lastName,
        role: formData.role,
        status: formData.status,
      };

      dispatch(updateUserFromEdit(selectedUserId, updatedUserData))
        .then(() => {
          // Cierra el modal de edición y recarga los usuarios si es necesario
          setEditMode(false);
          setSelectedUserId(null); // Restablece selectedUserId
          dispatch(getAllUsers());
        })
        .catch((error) => {
          console.error("Error al guardar cambios:", error.message);
        });
    }
  };

  function handleOrder(e) {
    const selectedValue = e ? e.target.value : e;

    if (selectedValue === "asc" || selectedValue === "desc") {
      setNameOrder(selectedValue);
      setRoleOrder("");
      setStatusOrder("");
      dispatch(orderUserByName(selectedValue));
      dispatch(setCurrentPage(1));
    } else if (selectedValue === "admin" || selectedValue === "user") {
      setRoleOrder(selectedValue);
      setNameOrder("");
      setStatusOrder("");
      dispatch(orderUserByRole(selectedValue));
      dispatch(setCurrentPage(1));
    } else if (selectedValue === "Active" || selectedValue === "Inactive") {
      setStatusOrder(selectedValue);
      setNameOrder("");
      setRoleOrder("");
      dispatch(orderUserByStatus(selectedValue));
      dispatch(setCurrentPage(1));
    } else {
      setNameOrder("");
      setRoleOrder("");
      setStatusOrder("");
      dispatch(getAllUsers());
      dispatch(setCurrentPage(1));
    }
  }

  // Delete user
  const confirmDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      width: "600px",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id))
          .then(() => {
            dispatch(getAllUsers());
          })
          .catch((error) => {
            console.error("Error al eliminar el producto: ", error);
          });
      }
    });
  };

  console.log(allUsers);

  // Pagination settings
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <>
      {/* Contenido del componente (encabezados, tabla, etc.) */}
      <div className="p-4 bg-white block sm:flex items-center justify-between lg:mt-1.5 pt-10">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <h1 className="text-xl sm:text-5xl font-semibold text-gray-900">
              All users
            </h1>
          </div>
          <div className="sm:flex">
            <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
              {/* Searchbar */}
              <form className="lg:pr-3 flex space-x-4" action="#" method="GET">
                <label htmlFor="users-search" className="sr-only">
                  Search
                </label>
                <FiRefreshCcw  onClick={handleRefresh}/>
                <div className="mt-1 relative lg:w-64 xl:w-96">
                  <input
                    type="text"
                    name="email"
                    id="users-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[10px] rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="Search for users"
                    value={searchTerm}
                    onChange={(e) => {
                      console.log(
                        "searchTerm updated:",
                        e.target.value || "Empty or null value"
                      ); // Agrega este console.log // Agrega este console.log
                      setSearchTerm(e.target.value);
                    }}
                  />
                </div>
                <InputLabel htmlFor="nameOrder">Name</InputLabel>
                <Select
                  id="nameOrder"
                  name="nameOrder"
                  value={nameOrder}
                  onChange={handleOrder}
                  label="Name"
                >
                  <MenuItem value="asc" style={{ fontSize: "15px" }}>
                    A - Z
                  </MenuItem>
                  <MenuItem value="desc" style={{ fontSize: "15px" }}>
                    Z - A
                  </MenuItem>
                </Select>

                <InputLabel>Role</InputLabel>
                <Select
                  id="roleOrder"
                  name="roleOrder"
                  value={roleOrder}
                  onChange={handleOrder}
                  label="Role"
                >
                  <MenuItem value="admin" style={{ fontSize: "15px" }}>
                    Admin - User
                  </MenuItem>
                  <MenuItem value="user" style={{ fontSize: "15px" }}>
                    User - Admin
                  </MenuItem>
                </Select>

                <InputLabel>Status</InputLabel>
                <Select
                  id="statusOrder"
                  name="statusOrder"
                  value={statusOrder}
                  onChange={handleOrder}
                  label="Status"
                >
                  <MenuItem value="Active" style={{ fontSize: "15px" }}>
                    Active - Inactive
                  </MenuItem>
                  <MenuItem value="Inactive" style={{ fontSize: "15px" }}>
                    Inactive - Active
                  </MenuItem>
                </Select>
              </form>
            </div>
          </div>
        </div>
        {/* <div className="flex space-x-1">
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded-md"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded-md"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div> */}
      </div>
      {/*Barra gris */}
      <div className="flex flex-col pt-10">
        {/* Tabla de usuarios */}
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="table-fixed min-w-full divide-y divide-gray-200">
                {/* Encabezados de tabla */}
                <thead className="bg-gray-100">
                        <tr>
                            <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                
                            </th>
                            
                            <th scope="col" className="p-4 text-left text-xl font-medium text-gray-500 uppercase">
                                Name
                            </th>
                            <th scope="col" className="p-4 text-left text-xl font-medium text-gray-500 uppercase">
                               LastName
                            </th>
                            <th scope="col" className="p-4 text-left text-xl font-medium text-gray-500 uppercase">
                               Email
                            </th>
                            <th scope="col" className="p-4 text-left text-xl font-medium text-gray-500 uppercase">
                                Role
                            </th>
                            <th scope="col" className="p-4 text-left text-xl font-medium text-gray-500 uppercase">
                            Status
                            </th>
                            <th scope="col" className="p-4">
                            </th>
                               
                        </tr>
                            
                    </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Mapear los usuarios aquí */}
                  {/* Ejemplo de cómo mapear los usuarios */}
                  {displayedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-100">
                      
                      {/* ... Otros campos de la fila ... */}
                      <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.picture}
                          alt={`${user.name} avatar`}
                        />
                      </td>
                      <td className="p-4 whitespace-nowrap text-[15px] font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="p-4 whitespace-nowrap text-[15px] font-medium text-gray-900">
                        {user.lastName}
                      </td>

                      <td className="p-4 whitespace-nowrap text-[15px] font-medium text-gray-900">
                        {user.email}
                      </td>
                      <td className="p-4 whitespace-nowrap text-[15px] font-medium text-gray-900">
                        {user.role}
                      </td>
                      <td className="p-4 whitespace-nowrap text-[15px] font-normal text-gray-900">
                        <div className="flex items-center">
                          {user.status === "Active" ? (
                            <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>
                          ) : (
                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                          )}
                          {user.status}
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap space-x-2">
                        <button
                          type="button"
                          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-[15px] inline-flex items-center px-3 py-2 text-center"
                          onClick={() => editUser(user)}
                        >
                          Edit user
                        </button>
                        <button
                          type="button"
                          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-[15px] inline-flex items-center px-3 py-2 text-center"
                          onClick={() => confirmDeleteUser(user.id)}
                        >
                          Delete user
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginLeft: "400px" }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChangePage}
                size="large"
                sx={{
                  "& .Mui-selected": {
                    backgroundColor: "#50a050",
                    fontSize: "20px            ",
                  },
                  "& .MuiPaginationItem-root": {
                    fontSize: "15px",
                  },
                  "& .paginationButton": {
                    backgroundColor: "#50a100",
                  },
                }}
              />
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de edición de usuario */}
      {editMode && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            {/* Contenido del modal de edición (campos de edición y botones de guardar/cancelar) */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="p-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Edit User
                </h1>
                <div className="mt-5">
                  {/* Campos de edición */}
                  <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleInputChange}
                    className="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-cyan-600 focus:border-cyan-600"
                    placeholder="Nickname"
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block mt-2 p-2.5 border border-gray-300 rounded-lg focus:ring-cyan-600 focus:border-cyan-600"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="block mt-2 p-2.5 border border-gray-300 rounded-lg focus:ring-cyan-600 focus:border-cyan-600"
                    placeholder="Last Name"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="block mt-2 p-2.5 border border-gray-300 rounded-lg focus:ring-cyan-600 focus:border-cyan-600"
                    placeholder="Last Name"
                  />
                  <div>
                    <div>Role:</div>
                    <select
                      className="w-full rounded-lg border border-blue-200 p-4 pe-12 text-[12px] shadow-sm"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <div>Status:</div>
                    <select
                      className="w-full rounded-lg border border-blue-200 p-4 pe-12 text-[12px] shadow-sm"
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 mr-2 text-white bg-cyan-600 rounded-lg focus:ring-4 focus:ring-cyan-200"
                    onClick={saveUserChanges}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg focus:ring-4 focus:ring-gray-300"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowUsers;