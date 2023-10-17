import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase";
import { useOutletContext } from "react-router-dom";

export const FriendsAdd = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { user } = useOutletContext();

  const handleFriendRequest = async (e) => {
    e.preventDefault();

    const friendDoc = await getDoc(doc(db, "users", email));

    if (friendDoc.exists()) {
      const friendData = friendDoc.data();
      if (friendData.friends.pending?.[`${user.email.replace(".", "#")}`]) {
        setError("You already have a friend request sent to this person");
      } else {
        setError("");

        const userDoc = await getDoc(doc(db, "users", user.email));
        const userData = userDoc.data();

        await updateDoc(doc(db, "users", email), {
          ...friendData,
          friends: {
            ...friendData.friends,
            pending: {
              ...friendData.friends.pending,
              [`${user.email.replace(".", "#")}`]: {
                icon: userData.icon,
                username: userData.username,
              },
            },
          },
        });
      }
    } else {
      setError("User doesn't exist");
    }

    e.target.reset();
  };

  return (
    <div className="bg-[#303338] h-[calc(100vh-48px)] p-6">
      <p className="text-white font-bold">ADD FRIEND</p>
      <p className="text-[#999ea4] text-sm mb-6 mt-2">
        You can add friends with their email
      </p>
      <p className=" text-red-600 font-bold mb-3">{error}</p>
      <form onSubmit={(e) => handleFriendRequest(e)}>
        <div className="bg-[#1e1f22] flex items-center justify-between py-2 px-4">
          <input
            type="text"
            className="bg-inherit py-1 text-white placeholder:text-[#86898c] focus-visible:outline-none"
            placeholder="test@test.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-[#5764f2] py-1 px-3 text-white rounded">
            Send Friend Request
          </button>
        </div>
      </form>
    </div>
  );
};
