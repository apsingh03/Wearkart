import React, { useContext, useEffect } from "react";
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
import ClientDashboard from "./pages/Client/ClientDashboard";

function App() {
  const {
    isActiveSideBarMenu,
    setisActiveSideBarMenu,
    cartIsHover,
    setcartIsHover,
  } = useContext(AppContext);

  const [scrollTop, setScrollTop] = useState(0);

  // console.log("scrollTop - ", scrollTop);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(document.scrollingElement.scrollTop);
    };

    // Set initial scroll position
    setScrollTop(document.scrollingElement.scrollTop);

    // Add event listener for scroll
    window.addEventListener("scroll", function () {
      setScrollTop(document.scrollingElement.scrollTop);
    });

    // if (scrollTop >= 70) {
    //   console.log("working");
    //   document.querySelector(".header").style.position = "fixed";
    //   document.querySelector(".header").style.top = 0;
    //   document.querySelector(".header").style.width = "100%";
    //   document.querySelector(".header").style.zIndex = 1;
    //   document.querySelector(".bannerCarousel").style.marginTop = "70px";
    // }

    // if (scrollTop <= 70) {
    //   document.querySelector(".header").style.position = "relative";
    //   document.querySelector(".header").style.top = 0;
    //   document.querySelector(".header").style.width = "100%";
    //   document.querySelector(".header").style.zIndex = 1;
    //   document.querySelector(".bannerCarousel").style.marginTop = "0";
    // }

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollTop]);

  // console.log("scrollTop - ", scrollTop);

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
        <Route path="/account" element={<ClientDashboard />} />

        {/* ADMIN Routes  */}

        <Route path="/admin/auth" element={<SignUpLoginPage />} />
        <Route path="/admin/*" element={<AdminJunction />} />
      </Routes>
    </>
  );
}

export default App;
