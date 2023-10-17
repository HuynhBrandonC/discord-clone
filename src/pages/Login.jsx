import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { auth } from "../firebase";

export default function Login() {
  const { login } = useOutletContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/channels/@me/friends/all");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="w-screen h-screen">
      <img
        className="absolute object-cover w-screen h-screen"
        src="https://images.alphacoders.com/129/1291249.png"
        alt="discord background"
      />
      <div className="absolute w-[480px] h-[440px] bg-zinc-800  m-auto left-0 right-0 top-0 bottom-0 rounded-lg text-center">
        <h1 className="text-white text-3xl font-bold mt-8">Welcome back!</h1>
        <p className="text-gray-500">We're so execited to see you again!</p>
        <p className="text-red-600 text-xl font-bold my-4 ">{error}</p>
        <div className="mx-10 my-4">
          <form onSubmit={handleLogin}>
            <p className="text-xs text-gray-400 text-start font-bold mb-2">
              EMAIL
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 rounded p-2 text-white focus-visible:outline-none mb-6"
              type="email"
            />
            <p className="text-xs text-gray-400 text-start font-bold mb-2">
              PASSWORD
            </p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 rounded p-2 text-white focus-visible:outline-none mb-2"
              type="password"
            />
            <button className="mt-4 bg-blue-500 rounded text-white w-full p-2">
              Log In
            </button>
            <p className="text-start text-gray-300 mt-3">
              Need an account?{" "}
              <Link className="text-blue-500" to="/register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
