import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Client/Header";
// import { Link } from "react-router-dom";

import { FaRegHeart, FaWhatsapp } from "react-icons/fa";
import { LiaUsersSolid } from "react-icons/lia";
import { LiaShippingFastSolid } from "react-icons/lia";
import { LuCalendarDays } from "react-icons/lu";
import { AiOutlineGlobal } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { clientGetSingleProductAsync } from "../../Redux/ClientSlices/clientProductSlice";
import { AppContext } from "../../context/AppContext";
import {
  calculateProductDiscount,
  convertInInr,
} from "../../utils/productDiscountCalculate";

import { useLocation } from "react-router-dom";

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const clientSingleProductRedux = useSelector(
    (state) => state.client_product.singleProduct
  );

  const { setisLoadingTopProgress } = useContext(AppContext);

  const [isSubMenuToggle, setisSubMenuToggle] = useState({});

  const [scrollTop, setScrollTop] = useState(0);

  let location = useLocation();

  // console.log("clientSingleProductRedux - ", clientSingleProductRedux);

  async function fetchFilter() {
    setisLoadingTopProgress(30);

    // await dispatch(getParentFilterAsync());
    // await dispatch(getProductSizeAsync());
    const productIdFromUrl = location.pathname.split("/")[3];
    await dispatch(
      clientGetSingleProductAsync({
        id: productIdFromUrl,
      })
    );

    setisLoadingTopProgress(100);
  }

  useEffect(() => {
    fetchFilter();
    const handleScroll = () => {
      setScrollTop(document.scrollingElement.scrollTop);
    };

    // Set initial scroll position
    setScrollTop(document.scrollingElement.scrollTop);

    // Add event listener for scroll
    window.addEventListener("scroll", function () {
      setScrollTop(document.scrollingElement.scrollTop);
    });

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // console.log("scrollTop - ", scrollTop);

  const handleToggle = (id) => {
    setisSubMenuToggle((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const productImages = [
    {
      id: 1,
      url: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FDR896ACBL_1.jpg%3Fv%3D1689061795&w=1920&q=75",
      alt: "",
    },
    {
      id: 2,
      url: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FDR896ACBL_2.jpg%3Fv%3D1689061795&w=1920&q=75",
      alt: "",
    },
    {
      id: 3,
      url: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FWhatsAppImage2023-06-11at12.44.41PM_1_copy_1.jpg%3Fv%3D1689061795&w=1920&q=75",
      alt: "",
    },
    {
      id: 4,
      url: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FDR896ACBL_3.jpg%3Fv%3D1689061795&w=1920&q=75",
      alt: "",
    },
  ];

  return (
    <>
      <Header />

      <section className="productDetail">
        <div className="col-12 row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-5 ">
            <div className="productDetail__left">
              <div className="productDetail__left_imageGrid">
                {productImages.map((data, index) => {
                  return (
                    <div
                      className="productDetail__left_imageGrid__card"
                      key={index}
                    >
                      <img
                        src={data.url}
                        alt="Actress"
                        className="productDetail__left_imageGrid__card__image"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="productDetail__left__image">
                <img src={productImages[0].url} alt="Actress" />
                {/* {productImages.map((data, index) => {
                  return (
                    <img
                      key={index}
                      src={data.url}
                      alt="Actress"
                      // className="productDetail__left_imageGrid__card__image"
                    />
                  );
                })} */}
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-7 ">
            <div className="productDetail__right">
              {(function () {
                try {
                  return (
                    clientSingleProductRedux.query &&
                    [clientSingleProductRedux.query].map((product, idx) => {
                      const sortedProductSizes = [
                        ...(product.productSizesProduct || []),
                      ].sort((a, b) => a.mrp - b.mrp);
                      return (
                        <div key={idx}>
                          <div className="productDetail__right__1st">
                            <h6 className="productDetail__right__1st__productTitle">
                              {product.name && product.name}
                            </h6>
                          </div>

                          <div className="productDetail__right__2nd">
                            <div className="productDetail__right__2nd__discountBox">
                              <p className="productDetail__right__2nd__discountBox__price">
                                {calculateProductDiscount(
                                  sortedProductSizes[0].mrp,
                                  sortedProductSizes[0].discountPercent
                                )}
                              </p>
                              <p className="productDetail__right__2nd__discountBox__mrp">
                                MRP{"   "}
                                <span>
                                  {convertInInr(sortedProductSizes[0].mrp)}
                                </span>
                              </p>
                              <p className="productDetail__right__2nd__discountBox__percentOff">
                                {sortedProductSizes[0].discountPercent} % OFF
                              </p>
                            </div>

                            <div className="productDetail__right__2nd__icons">
                              <span>
                                {" "}
                                <FaRegHeart />{" "}
                              </span>
                              <span>
                                {" "}
                                <FaWhatsapp />{" "}
                              </span>
                            </div>
                          </div>

                          <div className="productDetail__right__3rd">
                            <div>
                              <p>Inclusive of all taxes</p>
                            </div>
                            <div>
                              {" "}
                              <p>SKU: {product.id} </p>{" "}
                            </div>
                          </div>

                          <div className="productDetail__right__4th">
                            <div className="productDetail__right__4th_wrapper">
                              {["", "", ""].map((data, idx) => {
                                return (
                                  <div
                                    key={idx}
                                    style={{
                                      backgroundColor: "#EEEEEE",
                                      padding: "10px",
                                    }}
                                  >
                                    <div className="productDetail__right__4th__card">
                                      <div className="productDetail__right__4th__card__left">
                                        <p className="productDetail__right__4th__card__left__1st">
                                          Get 10% OFF
                                        </p>
                                        <p className="productDetail__right__4th__card__left__2nd">
                                          Buy 2 items and get extra 10% Off
                                        </p>
                                        <p className="productDetail__right__4th__card__left__3rd">
                                          *Offer to be applied on checkout
                                        </p>
                                      </div>

                                      <div className="productDetail__right__4th__card__right">
                                        <p className="productDetail__right__4th__card__right__1st">
                                          Copy Code
                                        </p>
                                        <p className="productDetail__right__4th__card__right__2nd">
                                          BUY2
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="productDetail__right__5thSizes">
                            <div className="d-flex flex-row justify-content-between">
                              <p>Size</p>
                              <p>Sizes Chart</p>
                            </div>

                            <div className="productDetail__right__5thSizes__allSizes">
                              {product.productSizesProduct &&
                                [...product.productSizesProduct]
                                  .sort((a, b) => a.mrp - b.mrp)
                                  .map((sizes, sizeIdx) => {
                                    return (
                                      <div
                                        className="productDetail__right__5thSizes__card"
                                        key={sizeIdx}
                                      >
                                        <div>
                                          <p title="Size Code">
                                            {sizes.pSizeProductSizes &&
                                              sizes.pSizeProductSizes.name}
                                          </p>

                                          <p
                                            style={{ marginTop: "-10px" }}
                                            title="Product Quantity"
                                          >
                                            {" "}
                                            Qty -
                                            {sizes.pSizeProductSizes &&
                                              sizes.pSizeProductSizes.qty}{" "}
                                          </p>

                                          <p
                                            style={{
                                              marginTop: "-10px",
                                              fontSize: "10px",
                                            }}
                                          >
                                            Mrp -{" "}
                                            <span
                                              style={{
                                                textDecoration: "line-through",
                                              }}
                                            >
                                              {convertInInr(
                                                sizes.pSizeProductSizes &&
                                                  sizes.mrp
                                              )}
                                            </span>
                                          </p>
                                          <p
                                            style={{
                                              marginTop: "-10px",
                                              fontSize: "10px",
                                              color: "red",
                                            }}
                                          >
                                            {sizes.pSizeProductSizes &&
                                              sizes.discountPercent}{" "}
                                            % Off
                                          </p>

                                          <p
                                            style={{
                                              marginTop: "-10px",
                                              fontSize: "18px",
                                              color: "green",
                                            }}
                                          >
                                            {" "}
                                            {calculateProductDiscount(
                                              sizes.pSizeProductSizes &&
                                                sizes.mrp,
                                              sizes.pSizeProductSizes &&
                                                sizes.discountPercent
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  })}
                            </div>
                          </div>

                          <div className="productDetail__right__6thcheckoutBtns">
                            <div className="productDetail__right__6thcheckoutBtns__cartBtn">
                              <span>add to cart</span>
                            </div>

                            <div className="productDetail__right__6thcheckoutBtns__buyNowBtn">
                              <span>buy now</span>
                            </div>
                          </div>

                          <div className="productDetail__right__7thIcons">
                            <div className="productDetail__right__7thIcons__card">
                              <div>
                                <LiaUsersSolid />
                              </div>
                              <div>
                                <p className="productDetail__right__7thIcons__card__title">
                                  1 Mn + Happy <br /> Customers
                                </p>
                              </div>
                            </div>

                            <div className="productDetail__right__7thIcons__card">
                              <div>
                                <LiaShippingFastSolid />
                              </div>
                              <div>
                                <p className="productDetail__right__7thIcons__card__title">
                                  Free Shipping on <br /> Prepaid{" "}
                                </p>
                              </div>
                            </div>

                            <div className="productDetail__right__7thIcons__card">
                              <div>
                                <LuCalendarDays />
                              </div>
                              <div>
                                <p className="productDetail__right__7thIcons__card__title">
                                  7 day Easy <br /> Returns
                                </p>
                              </div>
                            </div>

                            <div className="productDetail__right__7thIcons__card">
                              <div>
                                <AiOutlineGlobal />
                              </div>
                              <div>
                                <p className="productDetail__right__7thIcons__card__title">
                                  Global Delivery <br /> Available
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="productDetail__right__8thInfo">
                            {[
                              {
                                id: 1,
                                name: "Description",
                                childData:
                                  product.description && product.description,
                              },
                              {
                                id: 2,
                                name: "Size and Fit",
                                childData:
                                  product.sizeAndFit && product.sizeAndFit,
                              },
                              {
                                id: 3,
                                name: "Fabric and Care",
                                childData:
                                  product.fabricAndCare &&
                                  product.fabricAndCare,
                              },
                              {
                                id: 4,
                                name: "Shipping and Delivery",
                                childData:
                                  "<ul> <li>This is Shipping and Delivery 1 </li>  <li>This is Shipping and Delivery 2 </li> </ul>  ",
                              },
                              {
                                id: 5,
                                name: "More Information",
                                childData:
                                  "<ul> <li>This is More Information 1 </li>  <li>This is More Information 2 </li> </ul>  ",
                              },
                            ].map((data, idx) => {
                              return (
                                <div
                                  className="productDetail__right__8thInfo__card"
                                  key={idx}
                                  onClick={() => handleToggle(data.id)}
                                >
                                  <div className="productDetail__right__8thInfo__card__parent ">
                                    <div>
                                      <span className="productDetail__right__8thInfo__card__parent__catName">
                                        {data.name}
                                      </span>
                                    </div>

                                    <div>
                                      <span>
                                        {isSubMenuToggle[data.id] ? (
                                          <IoIosArrowUp />
                                        ) : (
                                          <IoIosArrowDown />
                                        )}
                                      </span>
                                    </div>
                                  </div>

                                  <div
                                    className={`productDetail__right__8thInfo__child  ${
                                      isSubMenuToggle[data.id]
                                        ? "subMenuActive"
                                        : "subMenuNotActive"
                                    } `}
                                  >
                                    <div className="productDetail__right__8thInfo__child__card">
                                      {" "}
                                      {parse(data.childData)}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
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
      </section>
    </>
  );
};

export default ProductDetailPage;
