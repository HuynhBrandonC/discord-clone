import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";
import { ServerModalCreate } from "./ServerModalCreate";
import { ServerModalJoin } from "./ServerModalJoin";
import { useOutletContext } from "react-router-dom";

export const ServerModal = ({ setServer }) => {
  const [createServer, setCreateServer] = useState(false);
  const [joinServer, setJoinServer] = useState(false);

  return (
    <div className="w-screen h-screen absolute bg-black bg-opacity-75 z-10">
      {createServer || joinServer ? (
        createServer ? (
          <ServerModalCreate
            setCreateServer={setCreateServer}
            setServer={setServer}
          />
        ) : (
          <ServerModalJoin
            setServer={setServer}
            setJoinServer={setJoinServer}
          />
        )
      ) : (
        <div className="absolute m-auto bg-white w-[440px] max-h-[300px] top-0 left-0 right-0 bottom-0 rounded ">
          <div className=" w-full text-gray-800 text-2xl text-end pt-2 pr-2">
            <button onClick={() => setServer((prevServer) => !prevServer)}>
              <AiOutlineClose />
            </button>
          </div>
          <h1 className="text-center font-bold text-3xl px-3 mb-2">
            Create a server
          </h1>
          <p className="text-center px-6 text-gray-600">
            Your server is where you and your friends hang out. Make yours and
            start talking.
          </p>
          <div
            onClick={() => setCreateServer((prevServer) => !prevServer)}
            className="flex border p-5 mt-4 mx-4 items-center justify-between rounded-lg hover:bg-gray-200/50 cursor-pointer
              "
          >
            <p className="text-xl font-bold">Create my own</p>
            <BsChevronRight />
          </div>
          <div className="bg-gray-100 mt-6">
            <h1 className="inline-block text-center font-bold text-lg mt-4 w-full">
              Have an invite already?
            </h1>
            <div className="px-4">
              <button
                onClick={() => setJoinServer((prevServer) => !prevServer)}
                className="bg-gray-500 w-full py-2 rounded text-white mt-2 mb-4 hover:bg-gray-600"
              >
                Join a server
              </button>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
};
