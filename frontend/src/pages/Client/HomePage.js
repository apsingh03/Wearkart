import React from "react";
import Header from "../../components/Client/Header";
import BannerCarousel from "../../components/Client/BannerCarousel";
import ActressCarousel from "../../components/Client/ActressCarousel";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import ProductsCarousel from "../../components/Client/HomePage/ProductsCarousel";
import Footer from "../../components/Client/Footer";
import { SlLocationPin } from "react-icons/sl";
import Cart from "../../components/Client/Cart";
const HomePage = ({ cartIsHover, setcartIsHover }) => {
  return (
    <>
      <Header cartIsHover={cartIsHover} setcartIsHover={setcartIsHover} />

      {/* <Cart /> */}

      <BannerCarousel />
      <div className="homePage">
        {/* <ActressCarousel /> */}

        <section className="homePage__1stBox ">
          <div className="col-12 row">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="homePage__1stBox__card">
                <Link to="#">
                  <img
                    src="https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FbannerFile-1719386255068.jpg%3Fv%3D1719386259&w=1920&q=75"
                    className="homePage__1stBox__card__image"
                  />
                </Link>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="homePage__1stBox__card">
                <Link to="#">
                  <img
                    src="https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FbannerFile-1719385442923.jpg%3Fv%3D1719385446&w=1920&q=75"
                    className="homePage__1stBox__card__image"
                  />
                </Link>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="homePage__1stBox__card">
                <Link to="#">
                  {" "}
                  <img
                    src="https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FbannerFile-1719385459644.jpg%3Fv%3D1719385463&w=1920&q=75"
                    className="homePage__1stBox__card__image"
                  />{" "}
                </Link>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="homePage__1stBox__card">
                <Link to="#">
                  <img
                    src="https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FbannerFile-1719385472333.jpg%3Fv%3D1719385475&w=1920&q=75"
                    className="homePage__1stBox__card__image"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="homePage__3rdBox">
          <h4 className="homePage__3rdBox__title">Shop by Occasion</h4>

          <ProductsCarousel />

          <button
            style={{
              border: "1px solid #000",
              padding: "10px 30px",
              backgroundColor: "transparent",
              marginTop: "20px",
            }}
          >
            {" "}
            View All{" "}
          </button>
        </section>

        <section className="homePage__2ndBox">
          <div className="col-12 row">
            <div className="col-12 col-md-7">
              <img
                src="https://images.unsplash.com/photo-1595665593673-bf1ad72905c0?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="homePage__2ndBox__leftSidecard__image"
                alt="Our Store Image"
              />
              {/* <div className="homePage__2ndBox__leftSidecard"></div> */}
            </div>

            <div className="col-12 col-md-5">
              <div className="homePage__2ndBox__rightSideCard">
                <div>
                  <h3 className="homePage__2ndBox__rightSideCard__1stTitle">
                    Our stores are now open in
                  </h3>
                </div>

                <div className="homePage__2ndBox__rightSideCard__icon">
                  <SlLocationPin />
                </div>
                <div>
                  <h3 className="homePage__2ndBox__rightSideCard__2ndTitle">
                    Banglore , Delhi NCR
                  </h3>
                </div>

                <div>
                  <Link className="homePage__2ndBox__rightSideCard__locateBtn ">
                    Locate Store
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
