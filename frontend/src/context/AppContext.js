import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isActiveSideBarMenu, setisActiveSideBarMenu] = useState(false);
  const [cartIsHover, setcartIsHover] = useState(false);
  return (
    <AppContext.Provider
      value={{
        isActiveSideBarMenu,
        setisActiveSideBarMenu,
        cartIsHover,
        setcartIsHover,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
