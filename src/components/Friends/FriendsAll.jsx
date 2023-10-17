import React, { useEffect, useState } from "react";
import { FriendWide } from "./FriendWide";
import { useOutletContext } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export const FriendsAll = () => {
  const [friendsList, setFriendsList] = useState(null);

  const { user } = useOutletContext();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
      setFriendsList(doc.data().friends.all);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const friendsEmail = Object.keys(friendsList ?? {});

  friendsEmail.sort();

  return (
    <>
      <div className="bg-[#303338] h-[calc(100vh-48px)] overflow-y-scroll">
        {friendsEmail.length !== 0 ? (
          <div>
            <h1 className="text-white">All Friends - {friendsEmail?.length}</h1>
            {friendsEmail.map((friendEmail, index) => {
              const friend = friendsList?.[friendEmail];
              return (
                <FriendWide
                  icon={friend.icon}
                  username={friend.username}
                  friendEmail={friendEmail.replace("#", ".")}
                  pending={false}
                  key={index}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-[#303338]] w-full h-[calc(100vh-48px)] flex items-center justify-center">
            <h1 className="text-gray-400 text-6xl text-center">
              You got no friends. Start adding some.
            </h1>
          </div>
        )}
      </div>
    </>
  );
};
