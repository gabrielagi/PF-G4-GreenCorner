import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  updateCategory,
  deleteCategory,
  orderCategory,
  postCategory,
} from "../../../../Redux/actions/product/action";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import { setCurrentPage } from "../../../../Redux/actions/product/action";
// import { MdSettingsBackupRestore } from "react-icons/md";

const Category = () => {
  const allCategories = useSelector((state) => state.categories);
  const [nameOrder, setNameOrder] = useState("name");
  //   const [roleOrder, setRoleOrder] = useState("admin");
  //   const [statusOrder, setStatusOrder] = useState("status");
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const usersPerPage = 10;

  const dispatch = useDispatch();

  const handleChangePage = (event, value) => {
    dispatch(setCurrentPage(value)); // Actualiza la página actual en el estado de Redux
  };

  const [editMode, setEditMode] = useState(false);
  const [editModeNew, setEditModeNew] = useState(false);

  const [formData, setFormData] = useState(null);
  const [createFormData, setCreateFormData] = useState({ name: "" });

  const [selectedUserId, setSelectedUserId] = useState(null); // Nuevo estado para rastrear el usuario seleccionado

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Funciones para Modal de Crear una categoria
  const createCategory = (newCategory) => {
    // Abre el modal de edición y establece selectedUserId y formData en los datos del usuario seleccionado
    setEditModeNew(true);
    console.log("Contenido category: ", newCategory);
    setFormData(newCategory);
    console.log("Contenido Form Data: ", formData);
  };

  const handleCreateInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCreateFormData({ ...createFormData, [name]: value });
  };

  const saveCategoryCreateChanges = () => {
    // Verifica si hay un usuario seleccionado

    const newCategoryData = {
      name: formData.name,
    };

    dispatch(postCategory(newCategoryData))
      .then(() => {
        // Cierra el modal de edición y recarga los usuarios si es necesario
        setEditModeNew(false);
        setSelectedUserId(null); // Restablece selectedUserId
        dispatch(getAllCategories());
      })
      .catch((error) => {
        console.error("Error al guardar cambios:", error.message);
      });
  };

  const closeCreateModal = () => {
    setCreateFormData({ name: "" }); // Restablecer el estado del formulario
    setEditModeNew(false); // Cerrar el modal de creación
  };

  // Funciones para Modal de Actualizar una categoria

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
        name: formData.name,
      };
      console.log("contenido upDateUserData ", updatedUserData);

      dispatch(updateCategory(selectedUserId, updatedUserData))
        .then(() => {
          // Cierra el modal de edición y recarga los usuarios si es necesario
          setEditMode(false);
          setSelectedUserId(null); // Restablece selectedUserId
          dispatch(getAllCategories());
        })
        .catch((error) => {
          console.error("Error al guardar cambios:", error.message);
        });
    }
  };

  function handleOrder(e) {
    const selectedValue = e ? e.target.value : e;
    console.log(selectedValue);

    if (selectedValue === "asc" || selectedValue === "desc") {
      setNameOrder(selectedValue);
      dispatch(orderCategory(selectedValue));
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
        dispatch(deleteCategory(id))
          .then(() => {
            dispatch(getAllCategories());
          })
          .catch((error) => {
            console.error("Error al eliminar el producto: ", error);
          });
      }
    });
  };

  console.log(allCategories);

  // Pagination settings
  const totalUsers = allCategories.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const displayedUsers = allCategories.slice(startIndex, endIndex);
  console.log(displayedUsers);

  return (
    <>
      {/* Contenido del componente (encabezados, tabla, etc.) */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 pt-10">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <h1 className="text-xl sm:text-5xl font-semibold text-gray-900">
              Categories
            </h1>
          </div>
          <div className="sm:flex">
            <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
              {/* Searchbar */}
              <form className="lg:pr-3" action="#" method="GET">
                <label htmlFor="users-search" className="sr-only">
                  Search
                </label>
                <div className="mt-1 relative lg:w-64 xl:w-96">
                  <input
                    type="text"
                    name="email"
                    id="users-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-[10px] rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="Search for category"
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
              </form>
            </div>
            {/* Boton para crear una nueva categoria */}
            <button
              type="button"
              className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-[13px] inline-flex items-center px-3 py-2 text-center"
              onClick={() => createCategory({ name: "" })}
            >
              New category
            </button>
          </div>
        </div>
        <div className="flex space-x-1">
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
        </div>
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
                  {/* ... Encabezados de tabla ... */}
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Mapear los usuarios aquí */}
                  {/* Ejemplo de cómo mapear los usuarios */}
                  {displayedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-100">
                      <td className="p-4 w-4">
                        {/* Checkbox para seleccionar el usuario */}
                        <div className="flex items-center">
                          <input
                            id={`checkbox-${user.id}`}
                            aria-describedby="checkbox-1"
                            type="checkbox"
                            className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                          />
                          <label
                            htmlFor={`checkbox-${user.id}`}
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      {/* ... Otros campos de la fila ... */}
                      <td className="p-4 whitespace-nowrap text-[13px] font-medium text-gray-900">
                        {user.name}
                      </td>

                      <td className="p-4 whitespace-nowrap space-x-2">
                        <button
                          type="button"
                          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-[13px] inline-flex items-center px-3 py-2 text-center"
                          onClick={() => editUser(user)}
                        >
                          Edit category
                        </button>
                        <button
                          type="button"
                          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-[13px] inline-flex items-center px-3 py-2 text-center"
                          onClick={() => confirmDeleteUser(user.id)}
                        >
                          Delete category
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handleChangePage}
                  size="large"
                  sx={{
                    "& .Mui-selected": {
                      backgroundColor: "#50a050",
                      fontSize: "20px",
                    },
                    "& .MuiPaginationItem-root": {
                      fontSize: "15px",
                    },
                    "& .paginationButton": {
                      backgroundColor: "#50a100",
                    },
                  }}
                />
              </table>
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
                  Edit Category
                </h1>
                <div className="mt-5">
                  {/* Campos de edición */}
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-cyan-600 focus:border-cyan-600"
                    placeholder="Name category"
                  />
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
      {/* Modal de creacion de una categoria */}
      {editModeNew && (
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
            {/* Contenido del modal de creacion (campos de edición y botones de guardar/cancelar) */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="p-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Create a new Category
                </h1>
                <div className="mt-5">
                  {/* Campos de edición */}
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-cyan-600 focus:border-cyan-600"
                    placeholder="Name category"
                  />
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 mr-2 text-white bg-cyan-600 rounded-lg focus:ring-4 focus:ring-cyan-200"
                    onClick={() => saveCategoryCreateChanges()}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg focus:ring-4 focus:ring-gray-300"
                    onClick={() => closeCreateModal()}
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

export default Category;
