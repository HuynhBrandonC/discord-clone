import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { ServerChannel } from "./ServerChannel";
import { ChannelModal } from "./ChannelModal";

export const ServerChannels = () => {
  const [server, setServer] = useState(null);
  const [channelModal, setChannelModal] = useState(false);
  const { serverId } = useParams();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "servers", serverId), (doc) => {
      setServer(doc.data());
    });

    return () => {
      unsubscribe();
    };
  }, [serverId]);

  const channelIds = Object.keys(server?.channels ?? {});

  channelIds.sort();

  return (
    <>
      <section>
        <div className="flex items-center justify-between w-[240px] bg-[#2a2d31] text-white h-[48px] border-b border-black px-5 hover:bg-gray-500/75 cursor-pointer">
          <p>{server?.name}</p>
          <AiOutlineDown />
        </div>
        <div className="inline-block w-[240px] h-[calc(100vh-48px)] bg-[#2a2d31] p-3">
          <div className="mb-2 flex justify-between items-center">
            <p className="text-[#949BA4] text-sm font-bold">channels</p>
            <button
              onClick={() => setChannelModal(true)}
              className="text-[#949BA4] text-lg font-bold"
            >
              +
            </button>
          </div>
          {channelIds.map((channelId) => {
            const channel = server?.channels[channelId];
            return (
              <ServerChannel
                key={channelId}
                id={channelId}
                name={channel?.name}
              />
            );
          })}
        </div>
        {channelModal ? (
          <ChannelModal setChannelModal={setChannelModal} serverId={serverId} />
        ) : null}
      </section>
    </>
  );
};
