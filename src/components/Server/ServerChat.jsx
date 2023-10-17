import React, { useEffect, useState } from "react";
import { UserList } from "./UserList";
import { Message } from "../Message";
import { AiFillPlusCircle } from "react-icons/ai";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useOutletContext, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const ServerChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { user } = useOutletContext();
  const [channelName, setChannelName] = useState("");

  const { serverId, channelId } = useParams();

  const handleSendMessage = async (e, message) => {
    e.preventDefault();

    if (!message) {
      console.log(" no message");
      return;
    }

    const channelDoc = await getDoc(doc(db, "servers", serverId));

    const { username, icon } = (
      await getDoc(doc(db, "users", `${user.email}`))
    ).data();

    const today = new Date();
    const formattedDate =
      today.toLocaleDateString("en-US") +
      " at " +
      today.toLocaleTimeString("en-US");

    if (imageFile) {
      const fileRef = ref(storage, `${imageFile.name}`);

      try {
        try {
          await uploadBytes(fileRef, imageFile);
        } catch (err) {
          console.log(err);
        }

        try {
          const image = await getDownloadURL(fileRef);
          await updateDoc(doc(db, "servers", serverId), {
            channels: {
              ...channelDoc.data().channels,
              [channelId]: {
                ...channelDoc.data().channels[channelId],
                messages: [
                  ...channelDoc.data().channels[channelId].messages,
                  {
                    text: message,
                    sender: username,
                    timeSent: formattedDate,
                    icon,
                    image,
                  },
                ],
              },
            },
          });
        } catch (err) {
          console.log(err);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      await updateDoc(doc(db, "servers", serverId), {
        channels: {
          ...channelDoc.data().channels,
          [channelId]: {
            ...channelDoc.data().channels[channelId],
            messages: [
              ...channelDoc.data().channels[channelId].messages,
              {
                text: message,
                sender: username,
                timeSent: formattedDate,
                icon,
                image: null,
              },
            ],
          },
        },
      });
    }

    e.target.reset();
    setSelectedImage(null);
    setImageFile(null);
  };

  useEffect(() => {
    const getChannelName = async () => {
      const channelDoc = await getDoc(doc(db, "servers", serverId));
      const channelData = channelDoc.data();

      setChannelName(channelData.channels[channelId].name);
    };

    getChannelName();
  }, [channelId]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "servers", serverId), (doc) => {
      setMessages(doc.data().channels[channelId].messages);
    });

    return () => {
      unsubscribe();
    };
  }, [channelId]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(e.target.files[0]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <div className="flex ">
        <section className=" bg-[#303338] h-[calc(100vh-48px)] w-full  flex flex-col relative overflow-y-scroll ">
          <div className="w-full mt-auto">
            <ol className="">
              {messages.map((message, index) => {
                return (
                  <li key={index}>
                    <Message
                      sender={message.sender}
                      timeSent={message.timeSent}
                      icon={message.icon}
                      key={index}
                      image={message.image}
                    >
                      {message.text}
                    </Message>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="p-4">
            <div className="bg-[#373a3f]">
              {selectedImage ? (
                <img
                  className="w-[100px] h-[100px] mb-3 p-4"
                  src={selectedImage}
                  alt=""
                />
              ) : null}
              <div className="flex items-center box-border rounded p-2">
                <form
                  onSubmit={(e) => handleSendMessage(e, message)}
                  className="flex items-center ml-3"
                >
                  <label className="mr-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <AiFillPlusCircle className="text-[#b5bac0] text-xl" />
                  </label>
                  <input
                    className=" bg-inherit placeholder:text-[#6c6f78] text-white focus-visible:outline-none "
                    placeholder={`Message #${channelName}`}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </div>
        </section>
        <UserList />
      </div>
    </div>
  );
};
