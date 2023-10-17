import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useOutletContext } from "react-router-dom";
import { db } from "../../firebase";

export const ServerModalJoin = ({ setJoinServer, setServer }) => {
  const [serverId, setServerId] = useState();
  const [error, setError] = useState("");

  const { user } = useOutletContext();

  const handleJoinServer = async (e) => {
    e.preventDefault();

    const serverDoc = await getDoc(doc(db, "servers", serverId));

    if (serverDoc.exists()) {
      const userDoc = await getDoc(doc(db, "users", `${user.email}`));
      const userData = userDoc.data();
      if (userData.servers?.serverId) {
        setError("You are already in this server");
      } else {
        setError("");
        const serverData = serverDoc.data();

        await updateDoc(doc(db, "users", `${user.email}`), {
          ...userData,
          servers: {
            ...userData.servers,
            [serverId]: {
              icon: serverData.icon,
              id: serverId,
              name: serverData.name,
            },
          },
        });
      }
    } else {
      setError("Server doesn't exist");
    }

    e.target.reset();
    setJoinServer(false);
    setServer(false);
  };

  return (
    <div className="absolute m-auto bg-white w-[440px] max-h-[300px] top-0 left-0 right-0 bottom-0 rounded ">
      <div className=" w-full text-gray-800 text-2xl text-end pt-2 pr-2">
        <button onClick={() => setJoinServer((prevServer) => !prevServer)}>
          <AiOutlineClose />
        </button>
      </div>
      <h1 className="text-center font-bold text-3xl px-3 mb-2">
        Join a server
      </h1>
      <p className="text-center text-sm px-6 text-gray-600">
        Enter an invite below to join an existing server
      </p>
      {error ? <p> {error} </p> : null}
      <form onSubmit={(e) => handleJoinServer(e)}>
        <div className="px-4 mt-4">
          <p className="text-sm font-bold ">Server ID</p>
          <input
            className="bg-gray-200 w-full rounded px-4 py-2 placeholder:text-gray-600/75 focus-visible:outline-none mt-2"
            type="text"
            placeholder="5ecb4a57-5d9a-485d-9404-05658d2f4704"
            onChange={(e) => setServerId(e.target.value)}
          />
        </div>
        <div className="flex h-[68px] mt-12 px-4 bg-gray-200 rounded-b justify-between items-center">
          <button
            className="text-sm"
            type="button"
            onClick={() => setJoinServer((prevServer) => !prevServer)}
          >
            Back
          </button>
          <button className="text-sm bg-blue-500 px-7 h-10 text-white rounded">
            Join Server
          </button>
        </div>
      </form>
    </div>
  );
};
