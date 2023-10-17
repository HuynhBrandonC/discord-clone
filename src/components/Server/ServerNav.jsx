import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { HiOutlineHashtag } from "react-icons/hi";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";

export const ServerNav = () => {
  const [server, setServer] = useState({});

  const { serverId, channelId } = useParams();

  useEffect(() => {
    const getServer = async () => {
      const serverDoc = await getDoc(doc(db, "servers", serverId));
      const serverData = serverDoc.data();
      setServer(serverData);
    };

    getServer();
  }, []);

  return (
    <>
      <section className="w-full">
        <nav className="flex items-center h-[48px]  justify-between bg-[#303338] border-b border-black">
          <div className="flex items-center">
            <div className="flex items-center mx-3   pr-3">
              <HiOutlineHashtag className="text-gray-400 mr-3 text-2xl" />
              <h1 className="text-white text-bold text-xl">
                {server.channels?.[channelId]?.name}
              </h1>
            </div>
          </div>
          <div className="flex items-center">
            <button>
              <FaUserFriends className="text-gray-300 mr-6 text-2xl" />
            </button>
          </div>
        </nav>
      </section>
    </>
  );
};
