import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Me } from "./pages/Me";
import { FriendsNav } from "./components/Friends/FriendsNav";
import { FriendsAll } from "./components/Friends/FriendsAll";
import { FriendsPending } from "./components/Friends/FriendsPending";
import Login from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Context } from "./context/Context";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Server } from "./pages/Server";
import { ServerChat } from "./components/Server/ServerChat";
import { FriendsAdd } from "./components/Friends/FriendsAdd";
import { FriendChatNav } from "./components/Friends/FriendChatNav";
import { FriendChat } from "./components/Friends/FriendChat";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Context />}>
          <Route path="/" element={<Home />} />
          <Route
            path="channels"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path=":serverId" element={<Server />}>
              <Route path=":channelId" element={<ServerChat />} />
            </Route>

            <Route path="@me" element={<Me />}>
              <Route path=":friendEmail" element={<FriendChatNav />}>
                <Route index element={<FriendChat />} />
              </Route>
              <Route path="friends" element={<FriendsNav />}>
                <Route path="all" element={<FriendsAll />} />
                <Route path="pending" element={<FriendsPending />} />
                <Route path="add" element={<FriendsAdd />} />
              </Route>
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
