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
// components
import VenDashboard from "../../components/Admin/VenDashboard";
import AddProduct from "../../components/Admin/AddProduct";
import AllProducts from "../../components/Admin/AllProducts";

const AdminJunction = () => {
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
      category: "Products",
      title: "Product",
      subMenu: [
        { name: "Add Product", url: "addProduct" },
        { name: "All Listed Products", url: "listedProducts" },
        { name: "Recycle Bin", url: "" },
      ],
    },
    {
      id: 2,
      category: "Category",
      title: "Category ",
      subMenu: [
        { name: "Create Category", url: "" },
        { name: "Create SubCategory", url: "" },
        { name: "Sub Menu 2.3", url: "" },
        { name: "Sub Menu 2.4", url: "" },
      ],
    },
    {
      id: 3,
      category: "Order",
      title: "Placed Orders",
      subMenu: [{ name: "All Orders", url: "" }],
    },

    {
      id: 4,
      category: "Discount",
      title: "Coupons",
      subMenu: [
        { name: "Create Coupon", url: "" },
        { name: "All Coupons", url: "" },
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
                <FaRegUserCircle /> User{" "}
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
            <div className="">
              <Routes>
                <Route path="/" element={<VenDashboard />} />

                {/* Products  */}
                <Route path="/addProduct" element={<AddProduct />} />
                <Route path="/listedProducts" element={<AllProducts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminJunction;