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
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import {
  createUserCartAsync,
  getUserCartAsync,
} from "../../Redux/UserSlices/Cart/UserCartRedux";

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const clientSingleProductRedux = useSelector(
    (state) => state.client_product.singleProduct
  );

  const clientIsLogged = useSelector(
    (state) => state.client_auth.loggedData.isUserLogged
  );

  const user_userCart = useSelector((state) => state.user_userCart.data);

  // console.log("clientIsLogged - ", clientIsLogged);

  const { setisLoadingTopProgress } = useContext(AppContext);
  const [isSubMenuToggle, setisSubMenuToggle] = useState({});
  const [selectSizeCodeId, setselectSizeCodeId] = useState();
  const [selectColorCodeId, setselectColorCodeId] = useState();
  const [scrollTop, setScrollTop] = useState(0);

  let location = useLocation();

  // console.log("clientSingleProductRedux - ", clientSingleProductRedux);

  async function fetchData() {
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

  async function addProductInCart(id) {
    setisLoadingTopProgress(30);

    if (clientIsLogged === false) {
      toast.error("You Need to Login First");
    } else {
      if (selectColorCodeId === undefined) {
        toast.warning("Please Select Color");
      } else if (selectSizeCodeId === undefined) {
        toast.warning("Please Select Size");
      } else {
        const cartActionResult = await dispatch(
          createUserCartAsync({
            productId: id,
            color_id: selectColorCodeId,
            PSize_id: selectSizeCodeId,
          })
        );

        if (cartActionResult.payload?.msg === "success") {
          // toast.success("Item Added in Cart");
        }

        if (cartActionResult.payload?.msg === "Item Already Exist") {
          toast.warning(cartActionResult.payload.msg);
        }
      }
    }
    setisLoadingTopProgress(100);
  }

  useEffect(() => {
    fetchData();
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

  return (
    <>
      <Header />

      <section className="productDetail">
        <div className="col-12 row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-5 ">
            <div className="productDetail__left">
              <div className="productDetail__left_imageGrid">
                {(function () {
                  try {
                    const productImages = [
                      clientSingleProductRedux?.query?.productImage?.url1,
                      clientSingleProductRedux?.query?.productImage?.url2,
                      clientSingleProductRedux?.query?.productImage?.url3,
                      clientSingleProductRedux?.query?.productImage?.url4,
                      clientSingleProductRedux?.query?.productImage?.url5,
                    ].filter((url) => url); // Filter out any undefined URLs

                    return (
                      <>
                        <div className="d-flex flex-column gap-1">
                          {productImages.map((data, index) => {
                            return (
                              <div
                                className="productDetail__left_imageGrid__card"
                                key={index}
                              >
                                <img
                                  src={data}
                                  alt="Actress"
                                  className="productDetail__left_imageGrid__card__image"
                                />
                              </div>
                            );
                          })}
                        </div>

                        <div className="productDetail__left__image">
                          <img src={productImages[0]} alt="Actress" />
                        </div>
                      </>
                    );
                  } catch (error) {
                    console.log("Error - ", error.message);
                  }
                })()}
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
                                  sortedProductSizes[0]?.mrp,
                                  sortedProductSizes[0]?.discountPercent
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

                          <div className="productDetail__right__allColors">
                            <div className="d-flex flex-row gap-2">
                              <p>Selected {" - "}</p>
                              <p>
                                {(function () {
                                  {
                                    const selectedColor = [
                                      ...product.productColorsProduct,
                                    ].find(
                                      (color) =>
                                        color.productColorsColor.id ===
                                        selectColorCodeId
                                    );
                                    return (
                                      <span style={{ fontWeight: "bold" }}>
                                        {
                                          selectedColor?.productColorsColor
                                            ?.name
                                        }
                                      </span>
                                    );
                                  }
                                })()}
                              </p>
                            </div>

                            <div className="productDetail__right__allColors__wrapper">
                              {product.productColorsProduct &&
                                [...product.productColorsProduct]
                                  .sort((a, b) => a.id - b.id)
                                  .map((color, sizeIdx) => {
                                    return (
                                      <div
                                        className={`productDetail__right__allColors__wrapper__card ${
                                          selectColorCodeId ===
                                          color.productColorsColor.id
                                            ? "selected"
                                            : null
                                        } `}
                                        key={sizeIdx}
                                        onClick={() =>
                                          setselectColorCodeId(color.color_id)
                                        }
                                        style={{
                                          backgroundColor: `${
                                            color.productColorsColor &&
                                            color.productColorsColor.name
                                          }`,
                                        }}
                                        title={
                                          color.productColorsColor &&
                                          color.productColorsColor.name
                                        }
                                      ></div>
                                    );
                                  })}
                            </div>
                          </div>

                          <div className="productDetail__right__5thSizes">
                            <div className="d-flex flex-row gap-2">
                              <p>Selected Size - </p>
                              <p>
                                {(function () {
                                  {
                                    const selectedSize = [
                                      ...product.productSizesProduct,
                                    ].find(
                                      (size) =>
                                        size.pSizeProductSizes.id ===
                                        selectSizeCodeId
                                    );

                                    return (
                                      <span style={{ fontWeight: "bold" }}>
                                        {/* id -{" "}
                                        {selectedSize?.pSizeProductSizes?.id}{" "}
                                        {" , "}  */}

                                        {selectedSize?.pSizeProductSizes?.name}
                                      </span>
                                    );
                                  }
                                })()}
                              </p>
                            </div>

                            <div className="productDetail__right__5thSizes__allSizes">
                              {product.productSizesProduct &&
                                [...product.productSizesProduct]
                                  .sort((a, b) => a.mrp - b.mrp)
                                  .map((sizes, sizeIdx) => {
                                    // console.log("sizes - ", sizes);
                                    return (
                                      <div
                                        className={`productDetail__right__5thSizes__card ${
                                          selectSizeCodeId ===
                                          sizes.pSizeProductSizes.id
                                            ? "selected"
                                            : null
                                        } `}
                                        key={sizeIdx}
                                        onClick={() =>
                                          setselectSizeCodeId(sizes.PSize_id)
                                        }
                                      >
                                        <div>
                                          <p title="Size Code">
                                            {sizes?.pSizeProductSizes?.name}
                                            {/* {sizes?.PSize_id} */}
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
                            {(function () {
                              const userCartItems =
                                user_userCart?.query?.[0]
                                  ?.userCartUserCartItem || [];

                              const alreadyInCart = userCartItems.some(
                                (data) => {
                                  return data.product_id === product?.id;
                                }
                              );

                              try {
                                return alreadyInCart ? (
                                  <div className="productDetail__right__6thcheckoutBtns__cartBtn">
                                    <span>Item Already In Cart</span>
                                  </div>
                                ) : (
                                  <div
                                    onClick={() =>
                                      addProductInCart(product?.id)
                                    }
                                    className="productDetail__right__6thcheckoutBtns__cartBtn"
                                  >
                                    <span>add to cart</span>
                                  </div>
                                );
                              } catch (error) {
                                console.log("Error - ", error.message);
                              }
                            })()}

                            <div
                              className="productDetail__right__6thcheckoutBtns__buyNowBtn"
                              // onClick={() => displayRazorpay()}
                            >
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
