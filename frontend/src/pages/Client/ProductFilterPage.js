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

const ProductFilterPage = () => {
  const adminParentFilterRedux = useSelector(
    (state) => state.admin_parentFilter.data
  );

  const adminChildFilterRedux = useSelector(
    (state) => state.admin_childFilter.data
  );

  const { isLoadingTopProgress, setisLoadingTopProgress } =
    useContext(AppContext);

  // console.log("adminParentFilterRedux - ", adminParentFilterRedux.query);
  const dispatch = useDispatch();
  const [isFilterChildRadiosVisible, setIsFilterChildRadiosVisible] = useState(
    {}
  );
  const handleFilterToggle = (id) => {
    setIsFilterChildRadiosVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const filterData = [
    {
      id: 1,
      catName: "Category",
      subCatName: [
        {
          id: 1.1,
          name: "Dresses",
        },
        {
          id: 1.2,
          name: "Jackets",
        },
        {
          id: 1.3,
          name: "Jeans",
        },
        {
          id: 1.4,
          name: "LivIn Pants",
        },
        {
          id: 1.5,
          name: "Shirts",
        },
      ],
    },
    {
      id: 2,
      catName: "Color",
      subCatName: [
        {
          id: 2.1,
          name: "Green",
        },
        {
          id: 2.2,
          name: "Black",
        },
        {
          id: 2.3,
          name: "Yellow",
        },
        {
          id: 2.4,
          name: "Orange",
        },
      ],
    },
    {
      id: 3,
      catName: "Fabric",
      subCatName: [
        {
          id: 3.1,
          name: "Chiffon",
        },
        {
          id: 3.2,
          name: "Cotton",
        },
        {
          id: 3.3,
          name: "Woolean",
        },
        {
          id: 3.4,
          name: "Nylon",
        },
        {
          id: 3.5,
          name: "Polyster",
        },
      ],
    },
    {
      id: 4,
      catName: "Category 4",
      subCatName: [
        {
          id: 4.1,
          name: "Dresses",
        },
        {
          id: 4.2,
          name: "Jackets",
        },
        {
          id: 4.3,
          name: "Jeans",
        },
        {
          id: 4.4,
          name: "LivIn Pants",
        },
        {
          id: 4.5,
          name: "Shirts",
        },
      ],
    },
    {
      id: 5,
      catName: "Category 5",
      subCatName: [
        {
          id: 5.1,
          name: "Dresses",
        },
        {
          id: 5.2,
          name: "Jackets",
        },
        {
          id: 5.3,
          name: "Jeans",
        },
        {
          id: 5.4,
          name: "LivIn Pants",
        },
        {
          id: 5.5,
          name: "Shirts",
        },
      ],
    },
  ];

  async function fetchFilter() {
    setisLoadingTopProgress(30);

    const actionResultParent = await dispatch(getParentFilterAsync());

    if (actionResultParent.payload.msg === "success") {
      setisLoadingTopProgress(100);
    }
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
                      adminParentFilterRedux.query &&
                      adminParentFilterRedux.query.map((data, index) => {
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
                              {data.childData &&
                                data.childData.map((subData, subIdx) => {
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
                <div className=" row ">
                  {(function () {
                    try {
                      return ["", "", "", "", "", ""].map((data, index) => {
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
                              <Link to="/product">
                                <img
                                  src="https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FDR896ACBL_1.jpg%3Fv%3D1689061795&w=1920&q=75"
                                  className="pFilterPage__right__body__card__image"
                                  alt="dress"
                                />
                                <p className="pFilterPage__right__body__card__productTitle">
                                  LivSoft Cotton T-Shirt - White and Black
                                </p>
                              </Link>

                              <div className="pFilterPage__right__body__card__prices">
                                <p> &#8377; 1,160 </p>
                                <p style={{ textDecoration: "line-through" }}>
                                  &#8377; 1,160
                                </p>
                                <p style={{ color: "#A10E2C" }}>17% Off</p>
                              </div>
                            </div>
                          </div>
                        );
                      });
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
