import React, { useState } from "react";
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

function NavbarUser({ selectedMenu, setSelectedMenu }) {
  const menus = [
    // { name: "Home", link: "/", icon: MdOutlineDashboard },
    {
      name: "Profile",
      icon: AiOutlineUser,
      // margin: true,
    },
    {
      name: "Shopping history",
      icon: FiShoppingBag,
      margin: true,
    },
    // {
    //   name: "Payment methods",
    //   icon: MdPayment,
    // },
    {
      name: "My Garden",
      icon: AiOutlineHeart,
      // margin: true,
      link:'/about-us',
    },
    // {
    //   name: "Shipping Address",
    //   icon: TbGps,
    //   margin: true,
    // },
    // {
    //   name: "Customer Support",
    //   link: "/contact-us",
    //   icon: RiCustomerService2Fill,
    // },
  ];

  const [open, setOpen] = useState(true);

  return (
    <section className="flex gap-6 mt-3 mb-0`">
      <div
        className={`bg-[#4f944f] h-[83vh] md:h-[91vh] overflow:hidden ${
          open ? "w-76" : "w-20"
        } duration-500 text-gray-100 px-4 font-poppins  mb-0`}
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
                  ? "bg-[#87bd6f]"
                  : "hover:bg-[#87bd6f]"
              }`}
              onClick={(e) => {
                e.preventDefault();
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
          <div className="bottom-0 left-0 right-0 mt-28 mb-16 bg-[#96B23C] p-2 text-center flex items-center justify-center">
            <div className="text-white"></div>
            {open ? (
              <p className="text-white ml-2" style={{ fontSize: "14px" }}>
                User Account
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NavbarUser;
