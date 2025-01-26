
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import './assets/styles/styles.css';  // Import the global CSS file
import App from "./App";
import { RoleProvider } from "./RoleContext"; // Import the RoleProvider
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import Layout from './Layout'; // Import the Layout component

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter> {/* Wrap the app with BrowserRouter for routing */}
      <RoleProvider>  {/* Wrap the app in RoleProvider for context management */}
        <Layout> {/* Wrap the app in Layout to apply global styles */}
          <App />  {/* Your main App component */}
        </Layout>
      </RoleProvider>
    </BrowserRouter>
  </StrictMode>
);