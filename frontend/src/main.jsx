import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";  // Corrected path
import "../index.css";    // Assuming this is in the root
const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
