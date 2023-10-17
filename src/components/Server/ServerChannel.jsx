import React from "react";
import { HiOutlineHashtag } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export const ServerChannel = ({ name, id }) => {
  return (
    <>
      <NavLink
        to={id}
        className="flex items-center  rounded cursor-pointer hover:bg-gray-500/25 px-2 py-1"
        style={({ isActive }) => {
          return {
            backgroundColor: isActive ? "#3f4248" : "",
          };
        }}
      >
        <HiOutlineHashtag className="text-[#949BA4] mr-2 " />
        <p className="text-[#949BA4]">{name}</p>
      </NavLink>
    </>
  );
};
