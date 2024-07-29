import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const BannerCarousel = ({ bannerCarouselRedux }) => {
  const [imageCurrentIndex, setimageCurrentIndex] = useState(0);

  function prevOnClick(dynamicBannerImagesLength) {
    if (imageCurrentIndex <= 0) {
      setimageCurrentIndex(dynamicBannerImagesLength - 1);
    } else {
      setimageCurrentIndex((prev) => prev - 1);
    }
  }

  function nextOnClick(dynamicBannerImagesLength) {
    if (imageCurrentIndex === dynamicBannerImagesLength - 1) {
      setimageCurrentIndex(0);
    } else {
      setimageCurrentIndex((prev) => prev + 1);
    }
  }

  // console.log("bannerImages - ", bannerImages);

  useEffect(() => {
    let interval;
    if (bannerCarouselRedux && bannerCarouselRedux) {
      bannerCarouselRedux &&
        bannerCarouselRedux.forEach((carouselParent) => {
          const dynamicBannerImages =
            carouselParent.bannerCarouselBannerCarouselImages;

          if (carouselParent.animation) {
            const dynamicBannerImagesLength = dynamicBannerImages.length;

            interval = setInterval(() => {
              setimageCurrentIndex(
                (prev) => (prev + 1) % dynamicBannerImagesLength
              );
            }, carouselParent?.timer);
          }
        });
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [bannerCarouselRedux && bannerCarouselRedux]);

  return (
    <div className="bannerCarousel">
      {(function () {
        try {
          return (
            bannerCarouselRedux &&
            bannerCarouselRedux.map((carouselParent, parentIdx) => {
              const dynamicBannerImages =
                carouselParent.bannerCarouselBannerCarouselImages &&
                carouselParent.bannerCarouselBannerCarouselImages;

              const dynamicBannerImagesLength = dynamicBannerImages.length;

              return (
                <div key={parentIdx}>
                  <div
                    className="bannerCarousel_imgBox"
                    style={{ height: `${carouselParent?.height}` }}
                  >
                    <div className="bannerCarousel__btns">
                      <button
                        className="bannerCarousel__btns__prev"
                        onClick={() => prevOnClick(dynamicBannerImagesLength)}
                      >
                        <IoIosArrowBack />
                      </button>
                      <button
                        className="bannerCarousel__btns__next"
                        onClick={() => nextOnClick(dynamicBannerImagesLength)}
                      >
                        <IoIosArrowForward />
                      </button>
                    </div>

                    <img
                      src={`${dynamicBannerImages[imageCurrentIndex]?.imageSrc}`}
                      alt={`${dynamicBannerImages[imageCurrentIndex]?.imageAlt}`}
                      className="bannerCarousel_imgBox__image"
                      style={{
                        height: `${carouselParent?.height}`,
                        width: `${carouselParent?.width}`,
                        objectFit: `${carouselParent?.objectFit}`,
                      }}
                    />
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
  );
};

export default BannerCarousel;
