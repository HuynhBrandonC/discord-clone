import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

export const FriendDM = ({ friendEmail }) => {
  const [friend, setFriend] = useState();

  useEffect(() => {
    const getFriend = async () => {
      const friendDoc = await getDoc(doc(db, "users", friendEmail));
      const friendData = await friendDoc.data();
      setFriend(friendData);
    };

    getFriend();
  }, []);

  return (
    <Link
      to={friendEmail}
      className="mx-3 mb-1 py-1.5 px-3 hover:bg-[#34373c] cursor-pointer flex items-center rounded"
    >
      <img
        src={friend?.icon}
        alt="Friend's Profile Picture"
        className="w-[32px] h-[32px] rounded-full mr-3"
      />
      <p className="text-[#889098]">{friend?.username}</p>
    </Link>
  );
};
