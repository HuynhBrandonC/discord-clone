import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { db } from "../../firebase";

export const ServerIcon = ({ icon, name, id }) => {
  const [channelId, setChannelId] = useState();

  useEffect(() => {
    getDoc(doc(db, "servers", id)).then((doc) => {
      const channels = Object.values(doc.data().channels);
      const firstChannel = channels[0];
      setChannelId(firstChannel.id);
    });
  }, []);

  return (
    <NavLink
      to={`${id}/${channelId}`}
      className="flex group relative h-[48px] w-[48px] m-3 rounded-full"
    >
      {({ isActive }) => (
        <>
          <img
            src={icon}
            alt="Server Icon"
            className={`${
              isActive ? " rounded-xl" : "rounded-full"
            } object-cover transition-all ease-in-out duration-300 w-[48px] h-[48px]`}
          />
          <div className=" hidden bg-slate-950 w-[120px] absolute left-16 bottom-4 py-1.5 px-4 rounded  group-hover:block">
            <p className="text-white ">{name}</p>
          </div>
        </>
      )}
    </NavLink>
  );
};
