import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./modules/pages/Home.tsx";
import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
