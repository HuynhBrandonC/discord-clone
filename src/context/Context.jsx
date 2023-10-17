import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const Context = () => {
  const [user, setUser] = useState({});

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (email, username, password, icon) => {
    createUserWithEmailAndPassword(auth, email, password);

    setDoc(doc(db, "users", email), {
      username,
      icon,
      servers: {},
      friends: { all: {}, pending: {} },
      DMS: {},
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const logout = () => {
    return signOut(auth);
  };

  const userRef = doc(db, "users", `${user?.email}`);

  const createServer = async (name, icon, userInfo) => {
    const serverId = uuidv4();
    const channelId = uuidv4();

    await setDoc(doc(db, "servers", serverId), {
      id: serverId,
      name,
      icon,
      members: [userInfo],
      channels: {
        [channelId]: { id: channelId, messages: [], name: "general" },
      },
    });

    const userData = (await getDoc(userRef)).data();

    await updateDoc(userRef, {
      ...userData,
      servers: {
        ...userData.servers,
        [serverId]: {
          id: serverId,
          name,
          icon,
        },
      },
    });
  };

  return (
    <>
      <Outlet context={{ login, register, user, logout, createServer }} />
    </>
  );
};
