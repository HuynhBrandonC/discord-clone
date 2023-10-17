import React, { useEffect, useState } from "react";
import { ServerModal } from "./Modal/ServerModal";
import { ServerIcon } from "./Server/ServerIcon";
import { doc, onSnapshot } from "firebase/firestore";
import { Link, useOutletContext } from "react-router-dom";
import { db } from "../firebase";

export const Sidebar = () => {
  const [server, setServer] = useState(false);
  const { user } = useOutletContext();
  const [serverList, setServerList] = useState([]);

  const serverIds = Object.keys(serverList ?? {});

  serverIds.sort();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
      const servers = doc.data()?.servers;
      setServerList(servers);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <>
      {server ? <ServerModal setServer={setServer} /> : null}
      <nav className="inline-block w-[72px] h-screen bg-[#1e1f22]">
        <Link
          to="@me/friends/all"
          className="flex items-center justify-center text-white bg-[#303338] active:bg-blue-500 m-3 h-[48px] w-[48px] rounded-full"
        >
          <svg
            className="homeIcon-r0w4 m-0 p-0"
            aria-hidden="true"
            role="img"
            width="32"
            height="24"
            viewBox="0 0 28 20"
          >
            <path
              fill="currentColor"
              d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z"
              data-darkreader-inline-fill=""
            ></path>
          </svg>
        </Link>
        <div className="border-b-2 border-gray-700 rounded mx-4"></div>
        {serverIds.map((serverId) => {
          const server = serverList[serverId];
          return (
            <ServerIcon
              key={serverId}
              icon={server.icon}
              name={server.name}
              id={serverId}
            />
          );
        })}
        <button
          onClick={() => setServer((prevServer) => !prevServer)}
          className="flex items-center justify-center h-[48px] w-[48px] bg-[#303338] active:bg-blue-500 m-3 rounded-full text-3xl text-green-600"
        >
          +
        </button>
      </nav>
    </>
  );
};
