import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useOutletContext, useParams } from "react-router-dom";
import { db, storage } from "../../firebase";
import { Message } from "../Message";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const FriendChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { user } = useOutletContext();

  const { friendEmail } = useParams();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", user.email), (doc) => {
      console.log(doc.data());
      setMessages(
        doc.data().friends.all[friendEmail.replace(".", "#")].messages
      );
    });

    return () => {
      unsubscribe();
    };
  }, [friendEmail]);

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

  const handleSendMessage = async (e, message) => {
    e.preventDefault();

    if (!message) {
      console.log(" no message");
      return;
    }

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

          const userDoc = await getDoc(doc(db, "users", user.email));
          const userData = userDoc.data();
          const friendDoc = await getDoc(doc(db, "users", friendEmail));
          const friendData = friendDoc.data();
          console.log(userData, friendData);

          await updateDoc(doc(db, "users", user.email), {
            ...userData,
            friends: {
              ...userData.friends,
              all: {
                [friendEmail.replace(".", "#")]: {
                  ...userData.friends.all[friendEmail.replace(".", "#")],
                  messages: [
                    ...userData.friends.all[friendEmail.replace(".", "#")]
                      .messages,
                    {
                      text: message,
                      sender: userData.username,
                      timeSent: formattedDate,
                      icon: userData.icon,
                      image,
                    },
                  ],
                },
              },
            },
          });

          await updateDoc(doc(db, "users", friendEmail), {
            ...friendData,
            friends: {
              ...friendData.friends,
              all: {
                [user.email.replace(".", "#")]: {
                  ...friendData.friends.all[user.email.replace(".", "#")],
                  messages: [
                    ...friendData.friends.all[user.email.replace(".", "#")]
                      .messages,
                    {
                      text: message,
                      sender: userData.username,
                      timeSent: formattedDate,
                      icon: userData.icon,
                      image,
                    },
                  ],
                },
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
      const userDoc = await getDoc(doc(db, "users", user.email));
      const userData = userDoc.data();
      const friendDoc = await getDoc(doc(db, "users", friendEmail));
      const friendData = friendDoc.data();

      await updateDoc(doc(db, "users", user.email), {
        ...userData,
        friends: {
          ...userData.friends,
          all: {
            [friendEmail.replace(".", "#")]: {
              ...userData.friends.all[friendEmail.replace(".", "#")],
              messages: [
                ...userData.friends.all[friendEmail.replace(".", "#")].messages,
                {
                  text: message,
                  sender: userData.username,
                  timeSent: formattedDate,
                  icon: userData.icon,
                  image: null,
                },
              ],
            },
          },
        },
      });

      await updateDoc(doc(db, "users", friendEmail), {
        ...friendData,
        friends: {
          ...friendData.friends,
          all: {
            [user.email.replace(".", "#")]: {
              ...friendData.friends.all[user.email.replace(".", "#")],
              messages: [
                ...friendData.friends.all[user.email.replace(".", "#")]
                  .messages,
                {
                  text: message,
                  sender: userData.username,
                  timeSent: formattedDate,
                  icon: userData.icon,
                  image: null,
                },
              ],
            },
          },
        },
      });
    }

    e.target.reset();
    setSelectedImage(null);
    setImageFile(null);
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
                    placeholder="Message #general"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
