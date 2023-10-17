import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { HiOutlineHashtag } from "react-icons/hi";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { db } from "../../firebase";

export const FriendChatNav = () => {
  const [friend, setFriend] = useState({});
  const { friendEmail } = useParams();
  const { user } = useOutletContext();

  useEffect(() => {
    const getFriend = async () => {
      const friendDoc = await getDoc(doc(db, "users", friendEmail));
      const friendData = await friendDoc.data();
      setFriend(friendData);
    };

    getFriend();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <section className="w-full">
        <nav className="flex items-center h-[48px]  justify-between bg-[#303338] border-b border-black">
          <div className="flex items-center">
            <div className="flex items-center mx-3   pr-3">
              <img
                src={friend?.icon}
                className="text-gray-400 mr-3 text-2xl w-[24px] h-[24px] rounded-full"
              />
              <h1 className=" text-bold text-[#F2F3F5]">{friend?.username}</h1>
            </div>
          </div>
        </nav>
      </section>
      <Outlet context={{ user }} />
    </div>
  );
};
