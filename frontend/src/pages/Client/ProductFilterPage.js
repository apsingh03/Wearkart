import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Client/Header";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import SideBarAllFilters from "../../components/Client/ProductsFilterPage/SideBarAllFilters";
import { useDispatch, useSelector } from "react-redux";
import { getChildFilterAsync } from "../../Redux/AdminSlices/Filter/childFilterSlice";
import { getParentFilterAsync } from "../../Redux/AdminSlices/Filter/parentFilterSlice";
import { AppContext } from "../../context/AppContext";
import { getProductSizeAsync } from "../../Redux/AdminSlices/Sizes/SizesSlice";
import {
  clientAllListedProductsAsync,
  clientGetProductFiltersAsync,
  clientGetSizesFiltersAsync,
} from "../../Redux/ClientSlices/clientProductSlice";
import {
  calculateProductDiscount,
  convertInInr,
} from "../../utils/productDiscountCalculate";

const ProductFilterPage = () => {
  const client_allProductsRedux = useSelector(
    (state) => state.client_product.allProducts
  );

  const client_productFiltersRedux = useSelector(
    (state) => state.client_product.productFilters
  );

  const client_sizesFiltersRedux = useSelector(
    (state) => state.client_product.sizesFilters
  );

  // console.log("clientProductFiltersRedux - ", clientProductFiltersRedux);
  const { setisLoadingTopProgress } = useContext(AppContext);

  // console.log("adminParentFilterRedux - ", adminParentFilterRedux.query);
  const dispatch = useDispatch();
  const [isFilterChildRadiosVisible, setIsFilterChildRadiosVisible] = useState(
    {}
  );

  // console.log("isFilterChildRadiosVisible - ", isFilterChildRadiosVisible);
  const handleFilterToggle = (id) => {
    setIsFilterChildRadiosVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  async function fetchFilter() {
    setisLoadingTopProgress(30);

    await dispatch(clientGetProductFiltersAsync());

    await dispatch(clientGetSizesFiltersAsync());

    await dispatch(clientAllListedProductsAsync());

    setisLoadingTopProgress(100);
  }

  useEffect(() => {
    fetchFilter();
  }, []);

  return (
    <>
      <Header />

      <div className="pFilterPage">
        <div className="row">
          <div className="col-12  col-md-3 d-none d-md-block">
            <div className="pFilterPage__left">
              <div className="">
                <h6 className="pFilterPage__left__title">Filter</h6>
              </div>

              <div className="pFilterPage__left__filtersBox">
                {(function () {
                  try {
                    return (
                      client_productFiltersRedux.query &&
                      client_productFiltersRedux.query.map((data, index) => {
                        return (
                          <div
                            className="pFilterPage__left__filtersBox__card"
                            key={index}
                          >
                            <div
                              className="pFilterPage__left__filtersBox__card__wrapper"
                              onClick={() => handleFilterToggle(index)}
                            >
                              <div className="pFilterPage__left__filtersBox__card__title">
                                <p> {data.name && data.name} </p>
                              </div>
                              <div className="pFilterPage__left__filtersBox__card__icon">
                                {" "}
                                {isFilterChildRadiosVisible[index] ? (
                                  <IoIosArrowUp />
                                ) : (
                                  <IoIosArrowDown />
                                )}{" "}
                              </div>
                            </div>

                            <div
                              className={`pFilterPage__left__filtersBox__card__childRadios ${
                                isFilterChildRadiosVisible[index]
                                  ? "visible"
                                  : "hidden"
                              } `}
                            >
                              {data.filterChildData &&
                                data.filterChildData.map((subData, subIdx) => {
                                  return (
                                    <div
                                      className="pFilterPage__left__filtersBox__card__childRadios__card"
                                      key={subIdx}
                                    >
                                      {" "}
                                      <input
                                        type="checkbox"
                                        name="categoryCloth"
                                        id={`${subData.name}${subData.id}`}
                                        className="pFilterPage__left__filtersBox__card__childRadios__card__checkBox"
                                      />{" "}
                                      <label
                                        htmlFor={`${subData.name}${subData.id}`}
                                        className="pFilterPage__left__filtersBox__card__childRadios__card__label"
                                      >
                                        {subData.name} (5)
                                      </label>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        );
                      })
                    );
                  } catch (error) {
                    console.log("Filter Error - ", error);
                  }
                })()}

                <div className="pFilterPage__left__filtersBox__card">
                  <div
                    className="pFilterPage__left__filtersBox__card__wrapper"
                    onClick={() => handleFilterToggle("sizes")}
                  >
                    <div className="pFilterPage__left__filtersBox__card__title">
                      <p> Sizes </p>
                    </div>
                    <div className="pFilterPage__left__filtersBox__card__icon">
                      {" "}
                      {isFilterChildRadiosVisible["sizes"] ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}{" "}
                    </div>
                  </div>

                  <div
                    className={`pFilterPage__left__filtersBox__card__sizes   ${
                      isFilterChildRadiosVisible["sizes"] ? "visible" : "hidden"
                    } `}
                  >
                    {(function () {
                      try {
                        return (
                          client_sizesFiltersRedux.query &&
                          client_sizesFiltersRedux.query.map((size, idx) => {
                            return (
                              <Link
                                className="pFilterPage__left__filtersBox__card__sizes__card"
                                key={idx}
                              >
                                {size.name && size.name} (000)
                              </Link>
                            );
                          })
                        );
                      } catch (error) {
                        console.log("Error - ", error.message);
                      }
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 d-block d-md-none">
            <SideBarAllFilters />
          </div>

          <div className="col-12 col-md-9">
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
                      id="openselecr"
                      name="sdfasdfs"
                    >
                      <option>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pFilterPage__right__body">
                {/* <p> {client_allProductsRedux.query  } </p> */}
                <div className=" row ">
                  {(function () {
                    try {
                      return (
                        client_allProductsRedux.query &&
                        client_allProductsRedux.query.map((product, index) => {
                          const sortedProductSizes = [
                            ...(product.productSizesProduct || []),
                          ].sort((a, b) => a.mrp - b.mrp);

                          if (
                            product.isPublished === true &&
                            product.isRecycleBin === false
                          ) {
                            return (
                              <div
                                className="col-6 col-lg-4 col-xl-3 mb-2 p-1"
                                // style={{ paddingLeft : "0px" }}
                                key={index}
                              >
                                <div className="pFilterPage__right__body__card">
                                  <div
                                    className="pFilterPage__right__body__card__favIcon"
                                    onClick={() => alert("Click on Fav Icon")}
                                  >
                                    <FaRegHeart />{" "}
                                  </div>
                                  <Link
                                    to={`/product/${
                                      product.productCategory &&
                                      product.productCategory.name
                                    }/${product.id}/${product.name}`}
                                  >
                                    <img
                                      // src="https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FDR896ACBL_1.jpg%3Fv%3D1689061795&w=1920&q=75"
                                      src={
                                        product.productImage &&
                                        product.productImage.url1
                                      }
                                      className="pFilterPage__right__body__card__image"
                                      alt="dress"
                                    />
                                    <p className="pFilterPage__right__body__card__productTitle">
                                      {product.name &&
                                        product.name.substring(0, 30) + "..."}
                                    </p>
                                  </Link>

                                  <div className="pFilterPage__right__body__card__prices">
                                    <p>
                                      {calculateProductDiscount(
                                        sortedProductSizes.length > 0
                                          ? sortedProductSizes[0].mrp
                                          : 0,
                                        sortedProductSizes.length > 0
                                          ? sortedProductSizes[0]
                                              .discountPercent
                                          : 0
                                      )}
                                    </p>
                                    <p
                                      style={{ textDecoration: "line-through" }}
                                    >
                                      {convertInInr(
                                        sortedProductSizes.length > 0
                                          ? sortedProductSizes[0].mrp
                                          : 0
                                      )}
                                    </p>
                                    <p style={{ color: "#A10E2C" }}>
                                      {sortedProductSizes.length > 0
                                        ? sortedProductSizes[0].discountPercent
                                        : 0}
                                      % Off
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })
                      );
                    } catch (error) {
                      console.log("Error - ", error.message);
                    }
                  })()}
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
