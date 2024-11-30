// Componentes React
import React from "react";
import ReactDOM from "react-dom/client";

// Libs Components
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Páginas TrackFit
import Home from "./modules/pages/Home.tsx";
import Login from "./modules/pages/Login.tsx";
import Register from "./modules/pages/Register.tsx";
import Routine from "./modules/pages/Routine.tsx";
import Workout from "./modules/pages/Workout.tsx";
import NewRoutine from "./modules/pages/NewRoutine.tsx";
import History from "./modules/pages/History.tsx";

// Estilos TrackFit
import "./styles/index.scss";

// Estilos Terceiros
import "react-toastify/dist/ReactToastify.css";

// Contexto
import { MainProvider } from "./context/MainContext.js";

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/routine" element={<Routine />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/new-routine" element={<NewRoutine />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
};

// Wrapper do App com o MainProvider
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <ToastContainer />
    <MainProvider>
      <Main />
    </MainProvider>
  </React.Fragment>
);
