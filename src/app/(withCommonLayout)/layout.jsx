import React from "react";
import Navbar from "../../components/shared/Navbar";
import Footer from "@/components/shared/Footer";
const CommonLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
