import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
import React, { useState } from 'react';

export const Layout = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleSignInClick = () => {
    setShowSignInModal(true);
  };

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
