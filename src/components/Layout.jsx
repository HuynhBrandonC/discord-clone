import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const Layout = () => {
  const { createServer, login, logout, register, user } = useOutletContext();

  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <Outlet context={{ createServer, login, logout, register, user }} />
    </div>
  );
};
