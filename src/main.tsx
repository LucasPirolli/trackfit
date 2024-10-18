// Componentes React
import React from "react";
import ReactDOM from "react-dom/client";

// Libs Components
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Páginas TrackFit
import Home from "./modules/pages/Home.tsx";
import Login from "./modules/pages/Login.tsx";
import Register from "./modules/pages/Register.tsx";
import Routine from "./modules/pages/Routine.tsx";

// Estilos TrackFit
import "./styles/index.scss";

const Main = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/routine" element={<Routine />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
