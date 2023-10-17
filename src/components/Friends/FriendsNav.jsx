import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { BsFillChatDotsFill } from "react-icons/bs";

export const FriendsNav = () => {
  const { createServer, login, logout, register, user } = useOutletContext();

  return (
    <>
      <div className="w-full">
        <nav className="flex items-center h-[48px]  justify-between bg-[#303338] border-b border-black">
          <section className="flex items-center">
            <div className="flex items-center mx-3 border-r-2 border-gray-600  pr-3">
              <FaUserFriends className="text-gray-400 mr-3 text-2xl" />
              <h1 className="text-white text-bold text-xl">Friends</h1>
            </div>
            <Link
              className="text-gray-300 hover:bg-gray-200/20 px-2 rounded mr-2"
              to="all"
            >
              All
            </Link>
            <Link
              className="text-gray-300 hover:bg-gray-200/20 px-2 rounded mr-2"
              to="pending"
            >
              Pending
            </Link>
            <Link
              className="text-white bg-green-700  px-2 rounded mr-2"
              to="add"
            >
              Add Friend
            </Link>
          </section>
          <div>
            <button>
              <BsFillChatDotsFill className="text-gray-300 mr-3" />
            </button>
          </div>
        </nav>
        <Outlet context={{ createServer, login, logout, register, user }} />
      </div>
    </>
  );
};
