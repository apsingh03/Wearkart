import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ProductsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

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

  const currentData = data.slice(currentIndex, currentIndex + itemsPerPage);
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
              {currentData.map((data, index) => {
                return (
                  <div
                    className="homePage__3rdBox__productsBox__card"
                    key={index}
                  >
                    <div className="homePage__3rdBox__wrapper__favIcon">
                      <FaRegHeart />{" "}
                    </div>
                    <img
                      src="https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FFSKNTP1255BLAC_1.jpg%3Fv%3D1708679469&w=1920&q=75"
                      className="homePage__3rdBox__productsBox__card__image"
                    />
                    <p className="homePage__3rdBox__productsBox__card__productTitle">
                      LivSoft Cotton T-Shirt - White and Black
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
              })}
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
