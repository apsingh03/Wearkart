import React from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaRegUser, FaShoppingCart } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
const Header = () => {
  return (
    <>
      <header>
        <div className="promotionContainer">
          <h6 className="promotionContainer__title">Flat 50% Off</h6>
        </div>

        <div className="header">
          <div className="header__1stContainer">
            <Link to="/" className="header__1stContainer__logo">
              {" "}
              WebApp{" "}
            </Link>
          </div>

          <div className="header__2ndContainer">
            <div className="header__2ndContainer__menu">
              <Link className="header__2ndContainer__menu__title"> Shop </Link>
              <div className="header__2ndContainer__menu__children">
                <Link className="header__2ndContainer__menu__children__title">
                  {" "}
                  Link 1{" "}
                </Link>
                <Link className="header__2ndContainer__menu__children__title">
                  {" "}
                  Link 2{" "}
                </Link>
                <Link className="header__2ndContainer__menu__children__title">
                  {" "}
                  Link 3{" "}
                </Link>
              </div>
            </div>

            <div className="header__2ndContainer__menu">
              <Link className="header__2ndContainer__menu__title"> Mens </Link>
              <div className="header__2ndContainer__menu__children">
                <Link className="header__2ndContainer__menu__children__title">
                  {" "}
                  Cap{" "}
                </Link>
                <Link className="header__2ndContainer__menu__children__title">
                  {" "}
                  Hat{" "}
                </Link>
                <Link className="header__2ndContainer__menu__children__title">
                  {" "}
                  Shoes{" "}
                </Link>
              </div>
            </div>

            <div className="header__2ndContainer__menu">
              <Link className="header__2ndContainer__menu__title">
                {" "}
                Womens{" "}
              </Link>
              <div className="header__2ndContainer__menu__children">
                <Link className="header__2ndContainer__menu__children__title">
                  {" "}
                  Trowsers{" "}
                </Link>
                <Link className="header__2ndContainer__menu__children__title">
                  {" "}
                  Tshirts{" "}
                </Link>
                <Link className="header__2ndContainer__menu__children__title">
                  {" "}
                  Pants{" "}
                </Link>
              </div>
            </div>
          </div>

          <div className="header__3rdContainer">
            <div className="header__3rdContainer__inputWrapper">
              <span className="header__3rdContainer__icons">
                <IoIosSearch />
              </span>
              <input
                type="text"
                className="header__3rdContainer__input"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="header__4thContainer">
            <div className="header__4thContainer__icons">
              <FaRegHeart />
            </div>
            <div className="header__4thContainer__icons">
              <FaRegUser />
            </div>
            <div className="header__4thContainer__icons">
              <FaShoppingCart />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
