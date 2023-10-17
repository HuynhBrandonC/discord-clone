import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { storage } from "../firebase";

export const Register = () => {
  const { register } = useOutletContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
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
            await register(email, username, password, image);
          } catch (err) {
            console.log(err);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  }

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
    <div className="w-screen h-screen">
      <img
        className="absolute object-cover w-screen h-screen"
        src="https://images.alphacoders.com/129/1291249.png"
        alt="discord background"
      />
      <div className="absolute w-[480px] h-[540px] bg-zinc-800  m-auto left-0 right-0 top-0 bottom-0 rounded-lg text-center">
        <h1 className="text-white text-3xl font-bold mt-8">
          Create an account
        </h1>
        <p className="text-red-500 text-xl my-3 font-bold">{error}</p>
        <div className="mx-10 my-4">
          <form onSubmit={handleRegister}>
            <p className="text-xs text-gray-400 text-start font-bold mb-2">
              EMAIL
            </p>
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 rounded p-2 text-white focus-visible:outline-none mb-6"
              type="email"
            />
            <p className="text-xs text-gray-400 text-start font-bold mb-2">
              USER NAME
            </p>
            <input
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-slate-950 rounded p-2 text-white focus-visible:outline-none mb-6"
              type="text"
            />
            <p className="text-xs text-gray-400 text-start font-bold mb-2">
              PASSWORD
            </p>
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 rounded p-2 text-white focus-visible:outline-none mb-2"
              type="password"
            />
            <p className="text-xs text-gray-400 text-start font-bold mb-2">
              Avatar
            </p>
            {selectedImage ? (
              <label className="flex  rounded-full  border-black  items-center justify-center h-[80px] w-[80px] cursor-pointer">
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
              <label className="flex border-2 rounded-full  border-black  items-center justify-center h-[80px] w-[80px] cursor-pointer">
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
            <button className="mt-4 bg-blue-500 rounded text-white w-full p-2">
              Continue
            </button>
            <p className="text-start mt-4">
              <Link className="text-blue-500" to="/login">
                Already have an account?
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
