import "tailwindcss/tailwind.css";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail } from "../../Redux/actions/user/user-actions";
import { BiMenuAltRight } from "react-icons/bi";

import {
  MdOutlineAdminPanelSettings,
  MdOutlineDashboard,
  MdPayment,
} from "react-icons/md";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { TbGps } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function NavbarAdmin({ user }) {
  const menus = [
    { name: "Home", link: "/", icon: MdOutlineDashboard },
    {
      name: "Profile",
      link: "/user/profile",
      icon: AiOutlineUser,
      margin: true,
    },
    {
      name: "Shopping history",
      link: "/user/shopping-history",
      icon: FiShoppingBag,
      margin: true,
    },
    {
      name: "Payment methods",
      link: "/user/payment",
      icon: MdPayment,
    },
    {
      name: "My Garden",
      link: "/user/favorites",
      icon: AiOutlineHeart,
      margin: true,
    },
    {
      name: "Shipping Address",
      link: "/user/shipping-address",
      icon: TbGps,
      margin: true,
    },
    {
      name: "Customer Support",
      link: "/user/customer-support",
      icon: RiCustomerService2Fill,
    },
  ];

  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(null);

  return (
    <section className="flex gap-6 py-4">
      <div
        className={`bg-[#315098] h-[83vh] md:h-[93vh] overflow:hidden ${
          open ? "w-76" : "w-20"
        } duration-500 text-gray-100 px-4 font-poppins`}
      >
        <div className="py-3 flex justify-end">
          <BiMenuAltRight
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              key={i}
              to={menu.link}
              className={`${
                menu?.margin && "mt-20"
              } group flex items-center text-md  gap-3.5 font-medium p-2 rounded-md ${
                selectedMenu === menu.name
                  ? "bg-[#85E1FC]"
                  : "hover:bg-[#8DCADC]"
              }`}
              onClick={(e) => {
                e.preventDefault(); // Evitar la redirección predeterminada
                setSelectedMenu(menu?.name);
              }}
            >
              <div>{React.createElement(menu?.icon, { size: "22" })}</div>
              <h2
                style={{
                  fontSize: "14px",
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-20 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
          <div className="bottom-0 left-0 right-0 mt-28 mb-16 bg-[#8CA8BE] p-2 text-center flex items-center justify-center">
            <div className="text-white">
              <MdOutlineAdminPanelSettings size={24} />
            </div>
            {open ? <p className="text-white text-2sm">Admin</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NavbarAdmin;
