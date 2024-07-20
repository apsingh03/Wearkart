import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "../../styles/Admin/Admin.css";
import { FaRegUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { FaSolarPanel } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { Squash as Hamburger } from "hamburger-react";
import { useSelector, useDispatch } from "react-redux";
// components
import VenDashboard from "../../components/Admin/VenDashboard";
import AddProduct from "../../components/Admin/Product/AddProduct";
import AllProducts from "../../components/Admin/Product/AllProducts";
import ParentFilter from "../../components/Admin/Filter/ParentFilter";
import ChildFilter from "../../components/Admin/Filter/ChildFilter";
import ParentMenu from "../../components/Admin/Menu/ParentMenu";
import ChildMenu from "../../components/Admin/Menu/ChildMenu";
import Sizes from "../../components/Admin/Sizes/Sizes";
import Category from "../../components/Admin/Category/Category";
import Color from "../../components/Admin/Color/Color";
import Fabric from "../../components/Admin/Fabric/Fabric";
import RecycleBin from "../../components/Admin/Product/RecycleBin";
import AllPlacedOrders from "../../components/Admin/Orders/AllPlacedOrders";

const AdminJunction = () => {
  const adminAuth = useSelector((state) => state.admin_auth.loggedData);

  const [sideNavIconToggle, setSideNavIconToggle] = useState({});
  const [isOpenHamBurger, setisOpenHamBurger] = useState(false);

  const [hamBurgerMenuToggle, sethamBurgerMenuToggle] = useState(true);

  const navigation = useNavigate();

  const refs = useRef({});

  // console.log("refs - ", refs);

  const handleToggle = (id) => {
    setSideNavIconToggle((prevToggles) => ({
      ...prevToggles,
      [id]: !prevToggles[id],
    }));

    if (refs.current[id]) {
      refs.current[id].classList.toggle("active");
      // refs.current[`${id}_icon`].classList.toggle("rotated");
    }
  };

  const sideNav = [
    {
      id: 1,
      category: "Product Filters",
      title: "Filters",
      subMenu: [
        { name: "Create Parent", url: "parentFilter" },
        { name: "Create Child", url: "childFilter" },
      ],
    },
    {
      id: 2,
      category: "Product Menu",
      title: "Menu ",
      subMenu: [
        { name: "Create Parent", url: "parentMenu" },
        { name: "Create Child", url: "childMenu" },
      ],
    },
    {
      id: 3,
      category: "Product other Details",
      title: "Product Info",
      subMenu: [
        { name: "Listed Products", url: "listedProducts" },
        { name: "Category", url: "category" },
        { name: "Color", url: "color" },
        { name: "Fabrics", url: "fabrics" },
        { name: "Create Product", url: "addProduct" },
        { name: "Recycle Bin", url: "recycleBinProduct" },
      ],
    },
    {
      id: 5,
      category: "Orders Info",
      title: "Orders",
      subMenu: [{ name: "Placed Orders", url: "placedOrders" }],
    },
    {
      id: 4,
      category: "Frontend ",
      title: "UI Elements",
      subMenu: [
        { name: "Banner Carousel", url: "" },
        { name: "Actress Carousel", url: "" },
      ],
    },
  ];

  return (
    <>
      <div className="admin">
        <header className="admin__header">
          <div className="admin__header__1st">
            <h6 className="admin__header__1st__brandName">
              {" "}
              <Link to="/admin/"> Brand Name</Link>
            </h6>

            <div
              className="admin__header__hamburgerIcon"
              onClick={() => sethamBurgerMenuToggle(!hamBurgerMenuToggle)}
            >
              <Hamburger
                toggled={isOpenHamBurger}
                toggle={setisOpenHamBurger}
              />
            </div>
          </div>

          <div className="admin__header__menu__container">
            <div className="admin__header__menu">
              <Link className="admin__header__menu__title">
                {" "}
                <IoNotifications />
              </Link>
              <div className="admin__header__menu__children">
                <Link className="admin__header__menu__children__title">
                  {" "}
                  Link 1{" "}
                </Link>
                <Link className="admin__header__menu__children__title">
                  {" "}
                  Link 2{" "}
                </Link>
                <Link className="admin__header__menu__children__title">
                  {" "}
                  Link 3{" "}
                </Link>
              </div>
            </div>
            <div className="admin__header__menu">
              <Link className="admin__header__menu__title">
                {" "}
                <FaRegUserCircle /> {adminAuth.email && adminAuth.email}
              </Link>
              <div className="admin__header__menu__children">
                <Link className="admin__header__menu__children__title">
                  {" "}
                  Link 1{" "}
                </Link>
                <Link className="admin__header__menu__children__title">
                  {" "}
                  Link 2{" "}
                </Link>
                <Link
                  className="admin__header__menu__children__title"
                  onClick={() => [
                    localStorage.removeItem("adminLoggedToken"),
                    window.location.replace("/"),
                  ]}
                >
                  {" "}
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="admin__belowSide">
          <div
            className={`admin__belowSide__leftSide  ${
              hamBurgerMenuToggle ? "hideIt" : "showIt"
            } `}
          >
            <div className="admin__belowSide__leftSide__wrapper">
              {/* CARD */}

              {sideNav.map((data, index) => {
                // console.log(data);
                return (
                  <div
                    className="admin__belowSide__leftSide__wrapper__card"
                    key={index}
                  >
                    <h6 className="admin__belowSide__leftSide__wrapper__card__title">
                      {data.category}{" "}
                    </h6>

                    <div
                      className="admin__belowSide__leftSide__wrapper__card__nav"
                      onClick={() => handleToggle(data.id)}
                    >
                      <div className="admin__belowSide__leftSide__wrapper__card__nav__1st">
                        <span>
                          <FaSolarPanel />
                        </span>
                        <p className="admin__belowSide__leftSide__wrapper__card__nav_title">
                          {data.title}
                        </p>
                      </div>
                      <div
                        className="admin__belowSide__leftSide__wrapper__card__nav__2nd"
                        // ref={(el) => (refs.current[`${data.id}_icon`] = el)}
                        // ref={(el) => {
                        //   if (sideNavIconToggle[data.id]) {
                        //     refs.current[`${data.id}_icon`] = el;
                        //   }
                        // }}
                      >
                        {sideNavIconToggle[data.id] ? (
                          <FaChevronDown />
                        ) : (
                          <FaChevronRight />
                        )}
                      </div>
                    </div>

                    <div
                      className={`admin__belowSide__leftSide__wrapper__card__child`}
                      ref={(el) => (refs.current[data.id] = el)}
                    >
                      {data.subMenu.map((subMenu, subIdx) => {
                        // console.log("subMenu - ", subMenu);
                        return (
                          <div key={subIdx}>
                            <Link to={`${subMenu.url ? subMenu.url : "#"}/`}>
                              {" "}
                              {subMenu.name}{" "}
                            </Link>{" "}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="admin__belowSide__rightSide">
            <Routes>
              <Route path="/" element={<VenDashboard />} />

              {/* Filter */}
              <Route path="/parentFilter" element={<ParentFilter />} />
              <Route path="/childFilter" element={<ChildFilter />} />

              {/* Menu */}
              <Route path="/parentMenu" element={<ParentMenu />} />
              <Route path="/childMenu" element={<ChildMenu />} />

              {/* Size */}
              <Route path="/sizes" element={<Sizes />} />

              {/* Products  */}
              <Route path="/category" element={<Category />} />
              <Route path="/color" element={<Color />} />
              <Route path="/fabrics" element={<Fabric />} />
              <Route path="/addProduct" element={<AddProduct />} />
              <Route path="/listedProducts" element={<AllProducts />} />
              <Route path="/recycleBinProduct" element={<RecycleBin />} />

              {/* Orders */}
              <Route path="/placedOrders" element={<AllPlacedOrders />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminJunction;
