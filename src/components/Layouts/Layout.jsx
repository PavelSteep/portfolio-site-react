import React from "react";
import Header from "./Header";
import Footer from "./Footer";
// import ThreeBackground from "./ThreeBackground";

function Layout({ children }) {
  return (
    <>
      {/* <ThreeBackground /> */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
