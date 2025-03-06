import "react-toastify/dist/ReactToastify.css";
import EmailVerify from "./Pages/EmailVerify";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import React from "react";
import ResetPassword from "./Pages/ResetPassword";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <ToastContainer />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/email-verify" element={<EmailVerify />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      

      </Routes>
    </>
  )
}

export default App