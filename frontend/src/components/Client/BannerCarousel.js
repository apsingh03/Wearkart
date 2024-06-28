import React, { useState } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const BannerCarousel = () => {
  const [imageCurrentIndex, setimageCurrentIndex] = useState(3);
  //   console.log("imageCurrentIndex - ", imageCurrentIndex);

  const bannerImages = [
    "https://img.freepik.com/free-vector/gradient-sale-background_23-2148860977.jpg?t=st=1719484408~exp=1719488008~hmac=1c23202f83f5fbc9b89690fc966a9b3ce1870b587ca307d878fa63f436949500&w=826",
    "https://img.freepik.com/free-vector/abstract-fashion-monsoon-sale-banner-offer-discount-business-background-free-vector_1340-22464.jpg?t=st=1719484410~exp=1719488010~hmac=620c8237854ba8b2124b9a7a3a545358c0358173b7792da055e0ffa64fa60d59&w=1060",
    "https://img.freepik.com/premium-vector/modern-sale-banner-template_105164-147.jpg?w=1060",
    "https://img.freepik.com/premium-vector/summer-sale-banner_7993-3736.jpg?w=996",
    "https://img.freepik.com/free-vector/black-friday-sale-web-banner_1409-957.jpg?w=1060&t=st=1719484362~exp=1719484962~hmac=b4c6f090ff7ca6d12cf5121ce3533e70a773029a1ce210006060876f615a1db4",
    "https://marketplace.canva.com/EAFBe-_WG8k/1/0/1600w/canva-gold-minimalist-fashion-stylist-service-medium-banner-9yTc9dnW3fE.jpg",
    "https://www.picmaker.com/templates/_next/image?url=https%3A%2F%2Fstatic.picmaker.com%2Fscene-prebuilts%2Fthumbnails%2FYCA-0022.png&w=3840&q=75",
  ];

  function prevOnClick() {
    if (imageCurrentIndex <= 0) {
      setimageCurrentIndex(bannerImages.length - 1);
    } else {
      setimageCurrentIndex((prev) => prev - 1);
    }
  }

  function nextOnClick() {
    // console.log("prevOnClick");

    if (imageCurrentIndex === bannerImages.length - 1) {
      setimageCurrentIndex(0);
    } else {
      setimageCurrentIndex((prev) => prev + 1);
    }
  }

  return (
    <div className="bannerCarousel">
      <div className="bannerCarousel__btns">
        <button
          className="bannerCarousel__btns__prev"
          onClick={() => prevOnClick()}
        >
          <IoIosArrowBack />
        </button>
        <button
          className="bannerCarousel__btns__next"
          onClick={() => nextOnClick()}
        >
          <IoIosArrowForward />
        </button>
      </div>

      <div className="bannerCarousel_imgBox">
        <img
          src={`${bannerImages[imageCurrentIndex]}`}
          alt={`Banner Image Slide Index - ${imageCurrentIndex}`}
          className="bannerCarousel_imgBox__image"
        />
      </div>
    </div>
  );
};

export default BannerCarousel;
