import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Load Google Identity Services script globally
const googleScript = document.createElement("script");
googleScript.src = "https://accounts.google.com/gsi/client";
googleScript.async = true;
googleScript.defer = true;
document.head.appendChild(googleScript);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
