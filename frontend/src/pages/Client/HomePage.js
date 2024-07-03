import React from "react";
import Header from "../../components/Client/Header";
import BannerCarousel from "../../components/Client/BannerCarousel";
import ActressCarousel from "../../components/Client/ActressCarousel";
import { Link } from "react-router-dom";
// import { FaLocationDot } from "react-icons/fa6";
import ProductsCarousel from "../../components/Client/HomePage/ProductsCarousel";
import Footer from "../../components/Client/Footer";
import { SlLocationPin } from "react-icons/sl";

const HomePage = () => {
  const modelImages = [
    "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FbannerFile-1717565604673.png%3Fv%3D1717565609&w=1920&q=75",
    "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FbannerFile-1717565675192.png%3Fv%3D1717565679&w=1920&q=75",
    "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FbannerFile-1719386153935.png%3Fv%3D1719386158&w=1920&q=75",
    "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FbannerFile-1717565705248.png%3Fv%3D1717565709&w=1920&q=75",
    "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FbannerFile-1717565711365.png%3Fv%3D1717565715&w=1920&q=75",
    "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FbannerFile-1719385629866.png%3Fv%3D1719385633&w=1920&q=75",
    "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FbannerFile-1717565692946.png%3Fv%3D1717565697&w=1920&q=75",
    "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FbannerFile-1717565711365.png%3Fv%3D1717565715&w=1920&q=75",
    "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FbannerFile-1717565723156.png%3Fv%3D1717565727&w=1920&q=75",
  ];

  return (
    <>
      <Header />

      <section className="dressesCarouselAtlg ">
        <div className="dressesCarouselAtlg__wrapper">
          {modelImages &&
            modelImages.map((data, idx) => {
              return (
                <div className="dressesCarouselAtlg__wrapper__card" key={idx}>
                  <div className="dressesCarouselAtlg__wrapper__card__imgBox">
                    <img
                      alt="isadmfas"
                      src={`${data}`}
                      className="dressesCarouselAtlg__wrapper__card__imgBox__image"
                    />
                  </div>
                  <p className="dressesCarouselAtlg__wrapper__card__title">
                    Dresses{" "}
                  </p>
                </div>
              );
            })}
        </div>
      </section>

      <BannerCarousel />
      <div className="homePage">
        <ActressCarousel />

        <section className="homePage__1stBox ">
          <div className="col-12 row">
            {[
              {
                id: 1,
                url: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FbannerFile-1719385472333.jpg%3Fv%3D1719385475&w=1920&q=75",
                alt: "Promotional Banner 1",
              },
              {
                id: 2,
                url: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FbannerFile-1719385442923.jpg%3Fv%3D1719385446&w=1920&q=75",
                alt: "Promotional Banner 1",
              },
              {
                id: 3,
                url: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FbannerFile-1719386255068.jpg%3Fv%3D1719386259&w=1920&q=75",
                alt: "Promotional Banner 1",
              },
              {
                id: 4,
                url: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FbannerFile-1719385459644.jpg%3Fv%3D1719385463&w=1920&q=75",
                alt: "Promotional Banner 1",
              },
            ].map((data, index) => {
              return (
                <Link
                  className="col-6 col-sm-6 col-md-3 col-lg-3 mb-3 homePage__1stBox__card "
                  key={index}
                >
                  <img
                    src={`${data.url}`}
                    className="homePage__1stBox__card__image"
                    alt={`${data.alt}`}
                  />
                </Link>
              );
            })}
          </div>
        </section>

        <section className="homePage__3rdBox">
          <h4 className="homePage__3rdBox__title">Shop by Occasion</h4>

          <ProductsCarousel />

          <Link
            to="/collections"
            style={{
              border: "1px solid #000",
              padding: "10px 30px",
              backgroundColor: "transparent",
              marginTop: "20px",
              textDecoration: "none",
              color: "#000",
            }}
          >
            {" "}
            View All{" "}
          </Link>
        </section>

        <section className="homePage__2ndBox">
          <div className="col-12 row">
            <div className="col-12 col-md-7">
              <img
                src="https://images.unsplash.com/photo-1595665593673-bf1ad72905c0?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="homePage__2ndBox__leftSidecard__image"
                alt="Our Store "
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
