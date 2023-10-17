import React from "react";
import { ServerChannels } from "../components/Server/ServerChannels";
import { ServerNav } from "../components/Server/ServerNav";
import { Outlet, useOutletContext } from "react-router-dom";

export const Server = () => {
  const { createServer, login, logout, register, user } = useOutletContext();

  return (
    <>
      <ServerChannels />
      <div className="w-full">
        <ServerNav />
        <Outlet context={{ createServer, login, logout, register, user }} />
      </div>
    </>
  );
};
