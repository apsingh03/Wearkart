import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbScreenShare } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import { AppContext, AppProvider } from "../../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { getParentMenuAsync } from "../../Redux/AdminSlices/Menu/parentMenuSlice";

const Header = () => {
  const dispatch = useDispatch();
  const clientIsLogged = useSelector(
    (state) => state.client_auth.loggedData.isUserLogged
  );

  const adminIsLogged = useSelector(
    (state) => state.admin_auth.loggedData.isUserLogged
  );

  const admin_parentMenuRedux = useSelector(
    (state) => state.admin_parentMenu.data
  );

  const {
    isActiveSideBarMenu,
    setisActiveSideBarMenu,
    cartIsHover,
    setcartIsHover,
    isLoadingTopProgress,
    setisLoadingTopProgress,
  } = useContext(AppContext);

  function onClickToggleCart() {
    if (cartIsHover) {
      setcartIsHover(false);
      document.body.style.overflowY = "auto";
    } else {
      setcartIsHover(true);
      document.body.style.overflowY = cartIsHover ? "auto" : "hidden";
    }
  }

  async function fetchData() {
    setisLoadingTopProgress(30);

    const actionResultParent = await dispatch(getParentMenuAsync());

    if (actionResultParent.payload.msg === "success") {
      setisLoadingTopProgress(100);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <header>
        <div className="promotionContainer">
          <h6 className="promotionContainer__title">Flat 50% Off</h6>
        </div>

        <div className="header">
          <div className="header__searchHamburgerIcon">
            <div
              className="header__hamburger  d-xl-none"
              style={{ cursor: "pointer" }}
              onClick={() => setisActiveSideBarMenu(true)}
            >
              <span>
                {" "}
                <GiHamburgerMenu />{" "}
              </span>
            </div>

            <div
              className="header__searchIcon "
              style={{ cursor: "pointer" }}
              onClick={() => setisActiveSideBarMenu(true)}
            >
              <span>
                {" "}
                <IoSearch />{" "}
              </span>
            </div>
          </div>

          <div className="header__1stContainer">
            <Link to="/" className="header__1stContainer__logo">
              {" "}
              WebApp{" "}
            </Link>
          </div>

          <div className="header__2ndContainer">
            {(function () {
              try {
                return (
                  admin_parentMenuRedux.query &&
                  admin_parentMenuRedux.query.map((menuData, menuIdx) => {
                    return (
                      <div className="header__2ndContainer__menu" key={menuIdx}>
                        <Link className="header__2ndContainer__menu__title">
                          {" "}
                          {menuData.name && menuData.name}{" "}
                        </Link>
                        <div className="header__2ndContainer__menu__children">
                          {menuData.menuChildData &&
                            menuData.menuChildData.map((subMenu, subIdx) => {
                              return (
                                <Link className="header__2ndContainer__menu__children__title">
                                  {subMenu.name && subMenu.name}
                                </Link>
                              );
                            })}
                        </div>
                      </div>
                    );
                  })
                );
              } catch (error) {
                console.log("Error Header - ", error.message);
              }
            })()}
          </div>

          <div className="header__3rdContainer">
            <div className="header__3rdContainer__inputWrapper">
              <span className="header__3rdContainer__icons">
                <IoSearch />
              </span>
              <input
                type="text"
                className="header__3rdContainer__input"
                placeholder="Search"
                id="SearchBox"
              />
            </div>
          </div>

          <div className="header__4thContainer">
            {adminIsLogged ? (
              <Link
                className="header__4thContainer__userIcon"
                title="Admin Panel"
                to="/admin/"
              >
                <TbScreenShare />
              </Link>
            ) : (
              <Link
                className="header__4thContainer__userIcon"
                title="Admin Auth"
                to="/admin/auth"
              >
                <MdOutlineAdminPanelSettings />
              </Link>
            )}

            {clientIsLogged ? (
              <Link
                className="header__4thContainer__userIcon"
                title="Favorites"
                to="/account"
              >
                <FaRegHeart />
              </Link>
            ) : (
              <Link className="header__4thContainer__userIcon" to="/signin">
                <FaRegHeart />
              </Link>
            )}

            {clientIsLogged ? (
              <Link
                className="header__4thContainer__userIcon"
                title="User"
                to="/account"
              >
                <FaRegUser />
              </Link>
            ) : (
              <Link
                className="header__4thContainer__userIcon"
                title="Sign In"
                to="/signin"
              >
                <FaRegUser />
              </Link>
            )}

            <div
              className="header__4thContainer__cartIcon"
              title="Cart"
              onClick={() => onClickToggleCart()}
            >
              <LiaShoppingBagSolid />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
