import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { db } from "../firebase";

export const UserBar = () => {
  const { logout, user } = useOutletContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [icon, setIcon] = useState();

  useEffect(() => {
    const setUser = async () => {
      const userDoc = (await getDoc(doc(db, "users", `${user.email}`))).data();
      setUsername(userDoc?.username);
      setIcon(userDoc?.icon);
    };

    setUser();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="text-white h-[52px] bg-[#1e1f22] flex items-center justify-between p-4">
      <div className="flex items-start hover:bg-gray-600/50 p-1.5 rounded cursor-pointer">
        <img
          className=" h-[32px] w-[32px] rounded-full mr-2"
          src={icon}
          alt="Profile Picture"
        />
        <p>{username}</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
