import React, { useEffect, useState } from "react";
import Header from "../../components/Client/Header";
import { Link } from "react-router-dom";

import { FaRegHeart, FaWhatsapp } from "react-icons/fa";
import { LiaUsersSolid } from "react-icons/lia";
import { LiaShippingFastSolid } from "react-icons/lia";
import { LuCalendarDays } from "react-icons/lu";
import { AiOutlineGlobal } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import parse from "html-react-parser";
const ProductDetail = () => {
  const [isSubMenuToggle, setisSubMenuToggle] = useState({});

  const [scrollTop, setScrollTop] = useState(0);

  // console.log("scrollTop - ", scrollTop);

  useEffect(() => {
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

  console.log("scrollTop - ", scrollTop);

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
              <div className="productDetail__right__1st">
                <h6 className="productDetail__right__1st__productTitle">
                  Box Pleat Ombre Dress - Green and Blue
                </h6>
              </div>

              <div className="productDetail__right__2nd">
                <div className="productDetail__right__2nd__discountBox">
                  <p className="productDetail__right__2nd__discountBox__price">
                    {" "}
                    &#8377; 1725{" "}
                  </p>
                  <p className="productDetail__right__2nd__discountBox__mrp">
                    {" "}
                    MRP &#8377; <span>1725</span>
                  </p>
                  <p className="productDetail__right__2nd__discountBox__percentOff">
                    40% OFF
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
                  <p>SKU: DR3534534</p>{" "}
                </div>
              </div>

              <div className="productDetail__right__4th">
                <div className="productDetail__right__4th_wrapper">
                  {["", "", ""].map((data, idx) => {
                    return (
                      <div
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
                  <div className="productDetail__right__5thSizes__card">
                    <p>XS</p>
                  </div>

                  <div className="productDetail__right__5thSizes__card">
                    <p>S</p>
                  </div>

                  <div className="productDetail__right__5thSizes__card">
                    <p>M</p>
                  </div>

                  <div className="productDetail__right__5thSizes__card">
                    <p>L</p>
                  </div>

                  <div className="productDetail__right__5thSizes__card">
                    <p>XL</p>
                  </div>

                  <div className="productDetail__right__5thSizes__card">
                    <p>XXL</p>
                  </div>
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
                      " <p>This green and blue sleeveless ombre dress has a high-neck and box pleat detail. Made from Polyester Moss Lycra, it is soft and comfortable to wear. </p> <ul> <li>This is Description 1 </li>  <li>This is Description 2 </li> </ul>  ",
                  },
                  {
                    id: 2,
                    name: "Size and Fit",
                    childData:
                      "<ul> <li>This is Size and Fit 1 </li>  <li>This is Size and Fit 2 </li> </ul>  ",
                  },
                  {
                    id: 3,
                    name: "Fabric and Care",
                    childData:
                      "<ul> <li>This is Fabric and Care 1 </li>  <li>This is Fabric and Care 2 </li> </ul>  ",
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
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
