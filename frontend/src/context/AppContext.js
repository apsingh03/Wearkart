import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isActiveSideBarMenu, setisActiveSideBarMenu] = useState(false);
  const [cartIsHover, setcartIsHover] = useState(false);
  const [isLoadingTopProgress, setisLoadingTopProgress] = useState(0);
  const [isFilterSideBarVisible, setIsFilterSideBarVisible] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isActiveSideBarMenu,
        setisActiveSideBarMenu,
        cartIsHover,
        setcartIsHover,
        isLoadingTopProgress,
        setisLoadingTopProgress,
        isFilterSideBarVisible,
        setIsFilterSideBarVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
