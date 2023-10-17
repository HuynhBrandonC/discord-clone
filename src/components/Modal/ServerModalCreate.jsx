import React, { useState } from "react";
import { AiOutlineCamera, AiOutlineClose } from "react-icons/ai";
import { useOutletContext } from "react-router-dom";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";

export const ServerModalCreate = ({ setCreateServer, setServer }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [serverName, setServerName] = useState("");
  const { createServer } = useOutletContext();
  const [serverIcon, setServerIcon] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const { user } = useOutletContext();

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

  const handleCreateServer = async (e) => {
    e.preventDefault();
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

          await createServer(serverName, image, {
            username: userData.username,
            icon: userData.icon,
            email: user.email,
          });
        } catch (err) {
          console.log(err);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    setCreateServer(false);
    setServer(false);
  };

  return (
    <div className="absolute m-auto bg-white w-[440px] max-h-[420px] top-0 left-0 right-0 bottom-0 rounded">
      <div className=" w-full text-gray-800 text-2xl text-end pt-2 pr-2">
        <button onClick={() => setCreateServer(false)}>
          <AiOutlineClose />
        </button>
      </div>
      <h1 className="text-center font-bold text-3xl px-3 mb-2">
        Customize a server
      </h1>
      <p className="text-center px-6 text-gray-600">
        Give your new server a personality with a name and an icon. You can
        always change it later.
      </p>
      <form onSubmit={(e) => handleCreateServer(e)}>
        <div className=" flex justify-center my-4">
          {selectedImage ? (
            <label className="flex  rounded-full  border-gray-800  items-center justify-center h-[80px] w-[80px] cursor-pointer">
              <input
                required
                id="image-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div>
                <img
                  className="rounded-full h-[80px] w-[80px] object-cover"
                  src={selectedImage}
                  alt="Uploaded"
                />
              </div>
            </label>
          ) : (
            <label className="flex border-2 rounded-full border-dashed border-gray-800  items-center justify-center h-[80px] w-[80px] cursor-pointer">
              <input
                required
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div>
                <div className="flex justify-center items-center rounded-full h-[80px] w-[80px] object-cover ">
                  <div className=" flex-col items-center">
                    <AiOutlineCamera className="text-black text-3xl w-full" />
                    <p>Upload</p>
                  </div>
                </div>
              </div>
            </label>
          )}
        </div>
        <div className="px-5">
          <p className="font-bold text-gray-600 mb-2">SERVER NAME</p>
          <input
            required
            type="text"
            placeholder="server"
            className="bg-gray-200 w-full rounded px-4 py-2 placeholder:text-gray-600/75  focus-visible:outline-none "
            onChange={(e) => setServerName(e.target.value)}
          />
          <p className="mt-2 text-xs text-gray-400">
            By creating a server, you agree to Discord's Community Guidelines
          </p>
        </div>
        <div className="flex h-[68px] mt-3 px-4 bg-gray-200 rounded-b justify-between items-center">
          <button
            type="button"
            className="text-sm"
            onClick={() => setCreateServer(false)}
          >
            Back
          </button>
          <button className="text-sm bg-blue-500 px-7 h-10 text-white rounded">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
