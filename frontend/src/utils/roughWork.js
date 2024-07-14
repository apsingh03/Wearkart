import React, { useEffect, useState, useContext } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AppContext } from "../../../context/AppContext";
import { clientGetCategoryWiseProductAsync } from "../../../Redux/ClientSlices/clientProductSlice";
import { useDispatch, useSelector } from "react-redux";
const ProductsCarousel = () => {
  const dispatch = useDispatch();

  const categoryWiseProductsRedux = useSelector(
    (state) => state.client_product.categoryWiseProducts
  );

  // console.log("client_productRedux - ", categoryWiseProductsRedux);

  const { setisLoadingTopProgress } = useContext(AppContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setitemsPerPage] = useState(4);

  const [isScreenAtMd, setIsScreenAtMd] = useState(window.innerWidth < 768);

  const [isScreenAtSm, setIsScreenAtSm] = useState(window.innerWidth < 576);

  async function fetchData() {
    setisLoadingTopProgress(30);
    await dispatch(clientGetCategoryWiseProductAsync());
    setisLoadingTopProgress(100);
  }

  useEffect(() => {
    fetchData();
    if (isScreenAtMd) {
      setitemsPerPage(3);
    } else {
      setitemsPerPage(4);
    }

    if (isScreenAtSm) {
      setitemsPerPage(2);
    }

    const handleResize = () => {
      setIsScreenAtMd(window.innerWidth < 768);
      setIsScreenAtSm(window.innerWidth < 576);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isScreenAtMd, isScreenAtSm]);

  const data = ["", "", "", "", "", "", "", "", "", "", ""]; // Replace with your actual data
  // console.log("currentIndex - ", currentIndex);
  const nextOnClick = () => {
    if (currentIndex + itemsPerPage < data.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prevOnClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const productImages = [
    {
      id: 1,
      url: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FDR896ACBL_2.jpg%3Fv%3D1689061795&w=1200&q=75",
      name: "Linen Front Overlap Panel Skort - Beige",
      price: "",
    },
    {
      id: 2,
      url: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2F3_c10ecf54-1853-446c-8a12-16bd3d7e1700.png%3Fv%3D1690454351&w=1920&q=75",
      name: "Linen Front Overlap Panel Skort - Sap Green",
      price: "",
    },
    {
      id: 3,
      url: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FSK097BEGE_2.jpg%3Fv%3D1712125284&w=1200&q=75",
      name: "Cotton Stretchable Pencil Skirt - Red",
      price: "",
    },
    {
      id: 4,
      url: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FFSSK122BEGE_2.jpg%3Fv%3D1710421368&w=1200&q=75",
      name: "Abstract Print Satin Skort - Fuchsia",
      price: "",
    },
    {
      id: 5,
      url: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FFSSK121REDD_2.jpg%3Fv%3D1708158596&w=1200&q=75",
      name: "Pleated Flared Midi Skirt - Purple",
      price: "",
    },
    {
      id: 6,
      url: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Fproducts%2FSK037PRPL_M2.jpg%3Fv%3D1668417736&w=1200&q=75",
      name: "Linen Front Overlap Panel Skort - Black",
      price: "",
    },
    {
      id: 7,
      url: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Fproducts%2FPleated_20Flared_20Floral_20Midi_20Skirt_20-_20Black_L2.jpg%3Fv%3D1615469688&w=1200&q=75",
      name: "Linen Front Overlap Panel Skort - Olive",
      price: "",
    },
    {
      id: 8,
      url: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FFSSK124BLAC_2.jpg%3Fv%3D1710422250&w=1200&q=75",
      name: "Geometric Print A-Line Skirt - Black And Off White",
      price: "",
    },
    {
      id: 9,
      url: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FFSSK146BLWH_2.jpg%3Fv%3D1718367394&w=1200&q=75",
      name: "Elasticated Striped A Line Skirt - White and Black",
      price: "",
    },
    {
      id: 10,
      url: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FSK063PINK_2.jpg%3Fv%3D1715337269&w=1200&q=75",
      name: "Stretchable Pencil Skirt - Black",
      price: "",
    },
  ];

  const currentData = productImages.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );
  // console.log("currentData  - ", currentData);

  return (
    <>
      <div className="homePage__3rdBox__productsBox">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
            >
              Casuals
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile-tab-pane"
              type="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected="false"
            >
              Formals
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact-tab-pane"
              type="button"
              role="tab"
              aria-controls="contact-tab-pane"
              aria-selected="false"
            >
              Evening Wear
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
            tabIndex="0"
          >
            <div className="homePage__3rdBox__wrapper ">
              <div className="homePage__3rdBox__wrapper__btns">
                <button
                  className="homePage__3rdBox__wrapper__btns__prev"
                  onClick={() => prevOnClick()}
                >
                  <IoIosArrowBack />
                </button>
                <button
                  className="homePage__3rdBox__wrapper__btns__next"
                  onClick={() => nextOnClick()}
                >
                  <IoIosArrowForward />
                </button>
              </div>

              {(function () {
                try {
                  return currentData.map((data, index) => {
                    return (
                      <div
                        className="homePage__3rdBox__productsBox__card"
                        key={index}
                      >
                        <div className="homePage__3rdBox__wrapper__favIcon">
                          <FaRegHeart />{" "}
                        </div>
                        <img
                          src={data.url}
                          className="homePage__3rdBox__productsBox__card__image"
                          alt="dress code "
                        />
                        <p className="homePage__3rdBox__productsBox__card__productTitle">
                          {data.id} {data.name}
                        </p>
                        <div className="homePage__3rdBox__productsBox__card__prices">
                          <p> &#8377; 1,160 </p>
                          <p style={{ textDecoration: "line-through" }}>
                            &#8377; 1,160
                          </p>
                          <p style={{ color: "#A10E2C" }}>17% Off</p>
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
          <div
            className="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabIndex="0"
          >
            B
          </div>
          <div
            className="tab-pane fade"
            id="contact-tab-pane"
            role="tabpanel"
            aria-labelledby="contact-tab"
            tabIndex="0"
          >
            C
          </div>
          <div
            className="tab-pane fade"
            id="disabled-tab-pane"
            role="tabpanel"
            aria-labelledby="disabled-tab"
            tabIndex="0"
          >
            D
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsCarousel;
