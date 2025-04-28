import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@fontsource/rajdhani/400.css"; // Regular
import "@fontsource/rajdhani/500.css"; // Medium
import "@fontsource/rajdhani/700.css"; // Bold
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
