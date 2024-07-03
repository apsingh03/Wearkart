import React from "react";

// import modelImages from "../utils/imagesArrays"

const ActressCarousel = () => {
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
      <section className="actressCarousel">
        {modelImages &&
          modelImages.map((data, idx) => {
            return (
              <div className="actressCarousel__card" key={idx}>
                <div className="actressCarousel__card__imgBox">
                  <img
                    alt="isadmfas"
                    src={`${data}`}
                    className="actressCarousel__card__imgBox__image"
                  />
                </div>
                <p className="actressCarousel__card__title">Dresses </p>
              </div>
            );
          })}
      </section>
    </>
  );
};

export default ActressCarousel;
