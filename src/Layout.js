import React from "react";
import './assets/styles/styles.css';  // Import the CSS file here

const layoutStyles = {
  wrapper: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
    backgroundColor: "var(--background-color)",
    color: "var(--text-color)",
  },
};

const Layout = ({ children }) => {
  return <div style={layoutStyles.wrapper}>{children}</div>;
};

export default Layout;