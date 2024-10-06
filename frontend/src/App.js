import React, { useContext, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AppContext } from "./context/AppContext";
import LoadingBar from "react-top-loading-bar";
import ProjectCaseStudy from "./pages/Client/ProjectCaseStudy/ProjectCaseStudy";
import SideBarDebounceSearch from "./components/Client/SideBarDebounceSearch";
import Cart from "./components/Client/Cart";
import SideBarMenu from "./components/Client/SideBarMenu";
import SideFilter from "./components/Client/ProductsFilterPage/SideFilter";

// Lazy load components
const ProductFilterPage = lazy(() =>
  import("./pages/Client/ProductFilterPage")
);
const HomePage = lazy(() => import("./pages/Client/HomePage"));
const Typography = lazy(() => import("./components/Client/Typography"));
// const Cart = lazy(() => import("./components/Client/Cart"));
const ProductDetailPage = lazy(() =>
  import("./pages/Client/ProductDetailPage")
);
const LogInPage = lazy(() => import("./pages/Client/LogInPage"));
const SignUpPage = lazy(() => import("./pages/Client/SignUpPage"));
const SignUpLoginPage = lazy(() => import("./pages/Admin/SignUpLoginPage"));
const AdminJunction = lazy(() => import("./pages/Admin/AdminJunction"));
// const SideBarMenu = lazy(() => import("./components/Client/SideBarMenu"));
const ClientDashboard = lazy(() => import("./pages/Client/ClientDashboard"));
const ClientProtectedRoutes = lazy(() =>
  import("./components/Client/ClientProtectedRoutes")
);
const AdminProtectedRoutes = lazy(() =>
  import("./components/Admin/AdminProtectedRoutes")
);
const SideBarAllFilters = lazy(() =>
  import("./components/Client/ProductsFilterPage/SideBarAllFilters")
);
// const SideFilter = lazy(() =>
//   import("./components/Client/ProductsFilterPage/SideFilter")
// );
const WishList = lazy(() => import("./components/Client/WishList"));
// const SideBarDebounceSearch = lazy(() =>
//   import("./components/Client/SideBarDebounceSearch")
// );

function App() {
  const {
    isActiveSideBarMenu,
    setisActiveSideBarMenu,
    cartIsHover,
    setcartIsHover,
    isLoadingTopProgress,
    setisLoadingTopProgress,
    isFilterSideBarVisible,
    setIsFilterSideBarVisible,
    isActiveSideBarDebounce,
    setisActiveSideBarDebounce,
  } = useContext(AppContext);

  const [scrollTop, setScrollTop] = useState(10);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(document.scrollingElement.scrollTop);
    };

    setScrollTop(document.scrollingElement.scrollTop);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollTop]);

  useEffect(() => {
    if (
      isActiveSideBarMenu ||
      cartIsHover ||
      isFilterSideBarVisible ||
      isActiveSideBarDebounce
    ) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [
    isActiveSideBarMenu,
    cartIsHover,
    isFilterSideBarVisible,
    isActiveSideBarDebounce,
  ]);

  return (
    <>
      <LoadingBar
        color="red"
        height={3}
        progress={isLoadingTopProgress}
        shadow={true}
        onLoaderFinished={() => setisLoadingTopProgress(0)}
      />

      {cartIsHover ? <Cart setcartIsHover={setcartIsHover} /> : null}
      {isActiveSideBarMenu ? (
        <SideBarMenu setisActiveSideBarMenu={setisActiveSideBarMenu} />
      ) : null}

      {isFilterSideBarVisible && (
        <SideFilter setIsFilterSideBarVisible={setIsFilterSideBarVisible} />
      )}

      {isActiveSideBarDebounce && (
        <SideBarDebounceSearch
          setisActiveSideBarDebounce={setisActiveSideBarDebounce}
        />
      )}

      <Suspense
        fallback={
          <div
            className="spinner-border spinner-border-sm text-center"
            role="status"
          ></div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/typography" element={<Typography />} />
          <Route path="/collections/*" element={<ProductFilterPage />} />
          <Route path="/product/*" element={<ProductDetailPage />} />
          <Route path="/signin" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* CLIENT PROTECTED ROUTES */}
          <Route
            path="/account"
            element={<ClientProtectedRoutes element={<ClientDashboard />} />}
          />
          <Route path="/projectCaseStudy" element={<ProjectCaseStudy />} />
          <Route
            path="/wishlist"
            element={<ClientProtectedRoutes element={<WishList />} />}
          />

          {/* ADMIN Routes  */}
          <Route path="/admin/auth" element={<SignUpLoginPage />} />
          <Route
            path="/admin/*"
            element={<AdminProtectedRoutes element={<AdminJunction />} />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
