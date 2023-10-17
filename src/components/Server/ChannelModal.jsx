import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { HiOutlineHashtag } from "react-icons/hi";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";

export const ChannelModal = ({ setChannelModal, serverId }) => {
  const [channelName, setChannelName] = useState(null);

  const handleCreateChannel = async (e, name) => {
    e.preventDefault();

    const channelDoc = await getDoc(doc(db, "servers", serverId));
    const existingChannels = channelDoc.data().channels;
    const channelId = uuidv4();

    const newChannels = {
      ...existingChannels,
      [channelId]: {
        id: channelId,
        messages: [],
        name: name,
      },
    };

    await updateDoc(doc(db, "servers", serverId), {
      channels: newChannels,
    });

    setChannelModal(false);
  };

  return (
    <div className="w-screen h-screen absolute bg-black bg-opacity-75 z-10 top-0 left-0">
      <div className="absolute w-[460px] h-[240px] top-0 left-0 right-0 bottom-0 m-auto bg-[#303338] rounded ">
        <p className="text-white font-bold text-xl mb-4 p-4">Create Channel</p>
        <form
          onSubmit={(e) => handleCreateChannel(e, channelName)}
          className=""
        >
          <p className="px-4 text-[#c9cccf] text-xs font-bold">CHANNEL NAME</p>
          <div className="flex  items-center bg-[#1e1f22] rounded py-1.5 px-3 mb-12 mx-4">
            <HiOutlineHashtag className="text-xl text-[#dbdee1] mr-2" />
            <input
              type="text"
              required
              className="w-full bg-inherit placeholder:text-[#7c7f82] text-white focus-visible:outline-none"
              placeholder="new-channel"
              onChange={(e) => setChannelName(e.target.value)}
            />
          </div>
          <div className="bg-[#2a2d31] p-4 rounded-b flex justify-end">
            <button
              type="button"
              onClick={() => setChannelModal(false)}
              className="text-white mr-4"
            >
              Cancel
            </button>
            <button className="bg-[#5764f2] px-3 py-1.5 rounded text-sm  text-white">
              Create Channel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
