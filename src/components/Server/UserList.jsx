import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { ServerMember } from "./ServerMember";

export const UserList = () => {
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
      <section className=" bg-[#2B2D31] w-[232px] flex flex-col overflow-y-scroll h-[calc(100vh-48px)]">
        <div className=" p-4">
          <p className="text-[#949BA4]"> Members </p>
          {server?.members &&
            server?.members.map((member, index) => {
              return <ServerMember key={index} member={member} />;
            })}
        </div>
      </section>
    </>
  );
};
