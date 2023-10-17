import React from "react";
import { FriendsList } from "../components/Friends/FriendsList";
import { Outlet, useOutletContext } from "react-router-dom";

export const Me = () => {
  const { createServer, login, logout, register, user } = useOutletContext();

  return (
    <>
      <FriendsList />
      <Outlet context={{ createServer, login, logout, register, user }} />
    </>
  );
};
