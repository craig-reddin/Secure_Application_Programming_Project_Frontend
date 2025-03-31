import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* wrap app in authprovider to ensure it can be access throughout the DOM tree
    ensuring authentication throughout the application*/}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
