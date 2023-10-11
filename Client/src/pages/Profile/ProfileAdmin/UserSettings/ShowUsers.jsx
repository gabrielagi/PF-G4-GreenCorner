import React from "react";
import users from "./users.json";
import { useDispatch,  useSelector } from "react-redux";
import { getAllUsers } from "../../../../Redux/actions/user/user-actions"
import { useEffect } from "react";


const ShowUsers = () => {

  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  
  console.log(allUsers);
  

  return (
    <>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 pt-10">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <h1 className="text-xl sm:text-5xl font-semibold text-gray-900">
              All users
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
                    placeholder="Search for users"
                  />
                </div>
              </form>
            </div>
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
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="table-fixed min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    {/* checkbox de select all */}
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all"
                          aria-describedby="checkbox-1"
                          type="checkbox"
                          className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                        />
                        <label htmlFor="checkbox-all" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </th>
                    {/* Name */}
                    <th
                      scope="col"
                      className="p-4 text-left text-[10px] font-medium text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    {/* Position */}
                    <th
                      scope="col"
                      className="p-4 text-left text-[10px] font-medium text-gray-500 uppercase"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-[10px] font-medium text-gray-500 uppercase"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-[10px] font-medium text-gray-500 uppercase"
                    >
                      Status
                    </th>
                    <th scope="col" className="p-4"></th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Mapear los usuarios aquí */}
                  {/* Ejemplo de cómo mapear los usuarios */}
                  {allUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-100">
                      <td className="p-4 w-4">
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
                      {/* Imagen de avatar */}
                      <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.picture}
                          alt={`${user.name} avatar`}
                        />
                        <div className="font-normal text-gray-500">
                          <div className="text-[15px] font-semibold text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm font-normal text-gray-500">
                            {user.nickname}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {user.email}
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {user.role}
                      </td>
                      {/* Status */}
                      <td className="p-4 whitespace-nowrap text-[13px] font-normal text-gray-900">
                        <div className="flex items-center">
                          {user.status === "Active" ? (
                            <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>
                          ) : (
                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                          )}
                          {user.status}
                        </div>
                      </td>
                      {/* Button edit user and delete */}
                      <td className="p-4 whitespace-nowrap space-x-2">
                        <button
                          type="button"
                          data-modal-toggle="user-modal"
                          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-[13px] inline-flex items-center px-3 py-2 text-center"
                        >
                          <svg
                            className="mr-2 h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                            <path
                              fillRule="evenodd"
                              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Edit user
                        </button>
                        <button
                          type="button"
                          data-modal-toggle="delete-user-modal"
                          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-[13px] inline-flex items-center px-3 py-2 text-center"
                        >
                          <svg
                            className="mr-2 h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Delete user
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* Fin del mapeo de usuarios */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowUsers;
