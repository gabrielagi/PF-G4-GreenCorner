import "tailwindcss/tailwind.css";
import React from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { MdOutlineDashboard, MdPayment } from "react-icons/md";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { TbGps } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

function NavbarUser() {
  const menus = [
    { name: "Home", link: "/", icon: MdOutlineDashboard },
    {
      name: "Profile",
      link: "/user/profile",
      icon: AiOutlineUser,
    },
    {
      name: "Shopping history",
      link: "/user/shopping-history",
      icon: FiShoppingBag,
    },
    { name: "My Garden", link: "/user/favorites", icon: AiOutlineHeart },
    {
      name: "Payment methods",
      link: "/user/payment",
      icon: MdPayment,
    },
    {
      name: "Shipping Address",
      link: "/user/shipping-address",
      icon: TbGps,
    },
    {
      name: "Customer Support",
      link: "/user/customer-support",
      icon: RiCustomerService2Fill,
    },
  ];
  return (
    <section className="flex gap-6">
      <div className="bg-[#1d252d] min-h-screen w-72 text-gray-100 px-4">
        <div className="py-3 flex justify-end">
          <BiMenuAltRight size={26} className="cursor-pointer" />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2>{menu?.name}</h2>
            </Link>
          ))}
        </div>
      </div>
      <div></div>
    </section>
  );
}

export default NavbarUser;
