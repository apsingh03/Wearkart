import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isActiveSideBarMenu, setisActiveSideBarMenu] = useState(false);
  const [cartIsHover, setcartIsHover] = useState(false);
  const [isLoadingTopProgress, setisLoadingTopProgress] = useState(0);
  return (
    <AppContext.Provider
      value={{
        isActiveSideBarMenu,
        setisActiveSideBarMenu,
        cartIsHover,
        setcartIsHover,
        isLoadingTopProgress,
        setisLoadingTopProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
