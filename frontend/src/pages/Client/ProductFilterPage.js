import React, { useState } from "react";

import Header from "../../components/Client/Header";
import Footer from "../../components/Client/Footer";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
const ProductFilterPage = () => {
  const [isFilterChildRadiosVisible, setIsFilterChildRadiosVisible] =
    useState(false);
  return (
    <>
      <Header />

      <div className="pFilterPage">
        <div className="col-12 row">
          <div className="col-12 col-lg-3">
            <div className="pFilterPage__left">
              <div className="">
                <h6 className="pFilterPage__left__title">Filter</h6>
              </div>

              <div className="pFilterPage__left__filtersBox">
                {["", "", ""].map((data, index) => {
                  return (
                    <div
                      className="pFilterPage__left__filtersBox__card"
                      key={index}
                    >
                      <div
                        className="pFilterPage__left__filtersBox__card__wrapper"
                        onClick={() =>
                          setIsFilterChildRadiosVisible(
                            !isFilterChildRadiosVisible
                          )
                        }
                      >
                        <div className="pFilterPage__left__filtersBox__card__title">
                          <p>Category</p>
                        </div>
                        <div className="pFilterPage__left__filtersBox__card__icon">
                          {" "}
                          {isFilterChildRadiosVisible ? (
                            <IoIosArrowUp />
                          ) : (
                            <IoIosArrowDown />
                          )}{" "}
                        </div>
                      </div>

                      <div
                        className={`pFilterPage__left__filtersBox__card__childRadios ${
                          isFilterChildRadiosVisible ? "visible" : "hidden"
                        } `}
                      >
                        <div className="pFilterPage__left__filtersBox__card__childRadios__card">
                          {" "}
                          <input
                            type="checkbox"
                            name="categoryCloth"
                            id="categoryCloth"
                            className="pFilterPage__left__filtersBox__card__childRadios__card__checkBox"
                          />{" "}
                          <label
                            htmlFor="categoryCloth"
                            className="pFilterPage__left__filtersBox__card__childRadios__card__label"
                          >
                            Cloths (5)
                          </label>
                        </div>

                        <div className="pFilterPage__left__filtersBox__card__childRadios__card">
                          {" "}
                          <input
                            type="checkbox"
                            name="categoryMens"
                            id="categoryMens"
                            className="pFilterPage__left__filtersBox__card__childRadios__card__checkBox"
                          />{" "}
                          <label
                            htmlFor="categoryMens"
                            className="pFilterPage__left__filtersBox__card__childRadios__card__label"
                          >
                            Mens (5)
                          </label>
                        </div>

                        <div className="pFilterPage__left__filtersBox__card__childRadios__card">
                          {" "}
                          <input
                            type="checkbox"
                            name="categorytshirt"
                            id="categorytshirt"
                            className="pFilterPage__left__filtersBox__card__childRadios__card__checkBox"
                          />{" "}
                          <label
                            htmlFor="categorytshirt"
                            className="pFilterPage__left__filtersBox__card__childRadios__card__label"
                          >
                            T - Shirt (5)
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-9">
            <div className="pFilterPage__right">
              <div className="pFilterPage__right__header">
                <div className="pFilterPage__right__header__1st">
                  <h6>Casuals</h6>
                </div>
                <div className="pFilterPage__right__header__2nd">
                  <div>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#131212",
                      }}
                    >
                      499 Products
                    </p>
                  </div>
                  <div>
                    <select
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pFilterPage__right__body">
                <div className="col-12 row ">
                  {["", "", "", "", "", ""].map((data, index) => {
                    return (
                      <div
                        className="col-6 col-lg-4 col-xl-3 mb-2 p-1"
                        // style={{ paddingLeft : "0px" }}
                        key={index}
                      >
                        <div className="pFilterPage__right__body__card">
                          <Link to="#">
                            <div
                              className="pFilterPage__right__body__card__favIcon"
                              onClick={() => alert("Click on Fav Icon")}
                            >
                              <FaRegHeart />{" "}
                            </div>
                            <img
                              src="https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FDR896ACBL_1.jpg%3Fv%3D1689061795&w=1920&q=75"
                              className="pFilterPage__right__body__card__image"
                              alt="dress"
                            />
                            <p className="pFilterPage__right__body__card__productTitle">
                              LivSoft Cotton T-Shirt - White and Black
                            </p>
                            <div className="pFilterPage__right__body__card__prices">
                              <p> &#8377; 1,160 </p>
                              <p style={{ textDecoration: "line-through" }}>
                                &#8377; 1,160
                              </p>
                              <p style={{ color: "#A10E2C" }}>17% Off</p>
                            </div>
                          </Link>
                        </div>
                      </div>

                      // <div className="col-12 col-md-3 mb-2" key={index}>
                      //   <div className="pFilterPage__right__body__card">
                      //     <Link to="#">
                      //       <div
                      //         className="pFilterPage__right__body__card__favIcon"
                      //         onClick={() => alert("Click on Fav Icon")}
                      //       >
                      //         <FaRegHeart />{" "}
                      //       </div>
                      //       <img
                      //         src="https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FDR896ACBL_1.jpg%3Fv%3D1689061795&w=1920&q=75"
                      //         className="pFilterPage__right__body__card__image"
                      //         alt="dress"
                      //       />
                      //       <p className="pFilterPage__right__body__card__productTitle">
                      //         LivSoft Cotton T-Shirt - White and Black
                      //       </p>
                      //       <div className="pFilterPage__right__body__card__prices">
                      //         <p> &#8377; 1,160 </p>
                      //         <p style={{ textDecoration: "line-through" }}>
                      //           &#8377; 1,160
                      //         </p>
                      //         <p style={{ color: "#A10E2C" }}>17% Off</p>
                      //       </div>
                      //     </Link>
                      //   </div>
                      // </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilterPage;
