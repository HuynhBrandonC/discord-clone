import React from "react";
import { AiOutlineMore } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import {
  FieldPath,
  deleteField,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useOutletContext } from "react-router-dom";

export const FriendWide = ({ pending, username, icon, friendEmail }) => {
  const { user } = useOutletContext();

  const handleAccept = async () => {
    const userDoc = await getDoc(doc(db, "users", user.email));
    const userData = userDoc.data();
    const friendDoc = await getDoc(doc(db, "users", friendEmail));
    const friendData = friendDoc.data();

    await updateDoc(doc(db, "users", user.email), {
      ...userData,
      friends: {
        ...userData.friends,
        all: {
          ...userData.friends.all,
          [`${friendEmail.replace(".", "#")}`]: {
            icon: friendData.icon,
            username: friendData.username,
            messages: [],
          },
        },
      },
    });

    await updateDoc(doc(db, "users", friendEmail), {
      ...friendData,
      friends: {
        ...friendData.friends,
        all: {
          ...friendData.friends.all,
          [`${user.email.replace(".", "#")}`]: {
            icon: userData.icon,
            username: userData.username,
            messages: [],
          },
        },
      },
    });

    await updateDoc(doc(db, "users", user.email), {
      [`friends.pending.${friendEmail.replace(".", "#")}`]: deleteField(),
    });
  };

  return (
    <>
      <div className="flex items-center justify-between border-t border-gray-700/75 m-2 px-4 rounded hover:bg-gray-500/25 cursor-pointer">
        <div className="flex items-center m-2">
          <img
            className="w-[32px] h-[32px] rounded-full mr-2"
            src={`${
              icon ??
              "https://cdn.discordapp.com/avatars/765710888874278933/19215881179d232ac4bf8b3969653a97.webp?size=160"
            }`}
            alt=""
          />
          <div className="m-0 p-0 leading-5 ">
            <h1 className="text-white">{username}</h1>
            <h1 className="text-[#b5bac1]">Offline</h1>
          </div>
        </div>
        <div className="flex">
          {pending ? (
            <>
              <button className="bg-[#2B2D31] p-2 rounded-full mr-3">
                <GiCheckMark
                  onClick={handleAccept}
                  className="text-gray-200 "
                />
              </button>
              <button className="bg-[#2B2D31] p-2 rounded-full">
                <RxCross1 className="text-gray-200" />
              </button>
            </>
          ) : (
            <>
              <button className="bg-[#2B2D31] p-2 rounded-full mr-3">
                <BsFillChatDotsFill className="text-gray-200 " />
              </button>
              <button className="bg-[#2B2D31] p-2 rounded-full">
                <AiOutlineMore className="text-gray-200" />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
