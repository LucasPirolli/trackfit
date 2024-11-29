import React, { createContext, useState, useContext, ReactNode } from "react";
import { MainContextProps } from "../types/types";

const MainContext = createContext<MainContextProps | null>(null);

interface MainProviderProps {
  children: ReactNode;
}

export const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  const [idUser, setIdUser] = useState<string>("");

  return (
    <MainContext.Provider
      value={{
        idUser,
        setIdUser,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMain = (): any => useContext(MainContext);
