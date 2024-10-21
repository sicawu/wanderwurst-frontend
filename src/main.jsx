import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProviderWrapper } from "./context/auth.context"; // Adjust the path to your AuthContext
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <React.StrictMode>
      <BrowserRouter>
        <AuthProviderWrapper>
          <App />
        </AuthProviderWrapper>
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
