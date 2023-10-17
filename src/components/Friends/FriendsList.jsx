import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { UserBar } from "../UserBar";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { FriendDM } from "./FriendDM";

export const FriendsList = () => {
  const [friendsList, setFriendsList] = useState();
  const { user } = useOutletContext();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
      setFriendsList(doc.data()?.friends?.all);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const friendsEmail = Object.keys(friendsList ?? {});

  friendsEmail.sort();

  return (
    <>
      <div className="flex-col items-between">
        <div className="">
          <div className="flex items-center justify-center w-[240px] bg-[#2a2d31] text-white h-[48px] border-b border-black">
            <input
              className="bg-[#1e1f22] w-[220px] h-[28px] text-white rounded text-sm text-center"
              type="text"
              placeholder="Find or start a conversation"
            />
          </div>
          <div className=" w-[240px] h-[calc(100vh-100px)] bg-[#2a2d31] overflow-y-scroll flex flex-col">
            <Link
              className="flex items-center w-[224px] h-[42px] p-3 m-2 text-gray-400 rounded hover:bg-gray-500/30 "
              to="friends/all"
            >
              <FaUserFriends className=" text-2xl mr-3" />
              <h1 className="text-lg">Friends</h1>
            </Link>
            <div className="flex items-center justify-between mx-4 text-gray-400">
              <p className="text-xs font-bold">DIRECT MESSAGES</p>
              <button className="text-2xl">+</button>
            </div>
            {friendsEmail.map((friendEmail, index) => {
              return (
                <FriendDM
                  friendEmail={friendEmail.replace("#", ".")}
                  key={index}
                />
              );
            })}
          </div>
        </div>

        <UserBar />
      </div>
    </>
  );
};
