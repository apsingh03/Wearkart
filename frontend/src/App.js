import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Client/HomePage";
import Typography from "./components/Client/Typography";
import Cart from "./components/Client/Cart";
import { useState } from "react";
import ProductFilterPage from "./pages/Client/ProductFilterPage";
import ProductDetail from "./pages/Client/ProductDetail";
import LogInPage from "./pages/Client/LogInPage";
import SignUpPage from "./pages/Client/SignUpPage";
import SignUpLoginPage from "./pages/Admin/SignUpLoginPage";
import AdminJunction from "./pages/Admin/AdminJunction";
import SideBarMenu from "./components/Client/SideBarMenu";
import { AppContext } from "./context/AppContext";

function App() {
  const {
    isActiveSideBarMenu,
    setisActiveSideBarMenu,
    cartIsHover,
    setcartIsHover,
  } = useContext(AppContext);

  // const [isActiveSideBarMenu, setisActiveSideBarMenu] = useState(false);

  return (
    <>
      {cartIsHover ? <Cart setcartIsHover={setcartIsHover} /> : null}
      {isActiveSideBarMenu ? (
        <SideBarMenu setisActiveSideBarMenu={setisActiveSideBarMenu} />
      ) : null}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/typography" element={<Typography />} />
        <Route path="/collections" element={<ProductFilterPage />} />
        <Route path="/product" element={<ProductDetail />} />
        <Route path="/signin" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* ADMIN Routes */}

        <Route path="/admin/auth" element={<SignUpLoginPage />} />
        <Route path="/admin/*" element={<AdminJunction />} />
      </Routes>
    </>
  );
}

export default App;
