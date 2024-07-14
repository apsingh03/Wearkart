import React, { useEffect, useState, useContext } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AppContext } from "../../../context/AppContext";
import { clientGetCategoryWiseProductAsync } from "../../../Redux/ClientSlices/clientProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  calculateProductDiscount,
  convertInInr,
} from "../../../utils/productDiscountCalculate";

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

  // const categoryData = [
  //   {
  //     id: 5,
  //     name: "Blazers",
  //     admin_id: 1,
  //     createdAt: "2024-07-10T12:24:12.000Z",
  //     updatedAt: null,
  //     productCategory: [
  //       {
  //         id: 1,
  //         name: "T-shirts",
  //         description: "description",
  //         sizeAndFit: "sizeAndFit",
  //         fabricAndCare: "fabricAndCare",
  //         isRecycleBin: false,
  //         isFavorite: false,
  //         isPublished: true,
  //         admin_id: 1,
  //         createdAt: null,
  //         updatedAt: null,
  //         productImages_id: 1,
  //         category_id: 5,
  //         productImage: {
  //           id: 1,
  //           url1: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FDR896ACBL_2.jpg%3Fv%3D1689061795&w=1200&q=75",
  //           url2: "url 2",
  //           url3: "url 3",
  //           url4: "url 4",
  //           url5: "url 5",
  //           admin_id: 1,
  //           product_id: 1,
  //         },
  //       },
  //       {
  //         id: 2,
  //         name: "Two -shirts ",
  //         description: "description",
  //         sizeAndFit: "sizeAndFit",
  //         fabricAndCare: "fabricAndCare",
  //         isRecycleBin: false,
  //         isFavorite: true,
  //         isPublished: true,
  //         admin_id: 1,
  //         createdAt: null,
  //         updatedAt: null,
  //         productImages_id: 2,
  //         category_id: 5,
  //         productImage: {
  //           id: 2,
  //           url1: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2F3_c10ecf54-1853-446c-8a12-16bd3d7e1700.png%3Fv%3D1690454351&w=1920&q=75",
  //           url2: "url 2",
  //           url3: "url 2",
  //           url4: "url 2",
  //           url5: "url 2",
  //           admin_id: 1,
  //           product_id: 2,
  //         },
  //       },
  //       {
  //         id: 3,
  //         name: "Three -shirts ",
  //         description: "description",
  //         sizeAndFit: "sizeAndFit",
  //         fabricAndCare: "fabricAndCare",
  //         isRecycleBin: false,
  //         isFavorite: false,
  //         isPublished: false,
  //         admin_id: 1,
  //         createdAt: null,
  //         updatedAt: null,
  //         productImages_id: 3,
  //         category_id: 5,
  //         productImage: {
  //           id: 3,
  //           url1: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FSK097BEGE_2.jpg%3Fv%3D1712125284&w=1200&q=75",
  //           url2: "url 3",
  //           url3: "url 3",
  //           url4: "url 3",
  //           url5: "url 3",
  //           admin_id: 1,
  //           product_id: 3,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     id: 12,
  //     name: "Shorts",
  //     admin_id: 1,
  //     createdAt: "2024-07-10T12:25:01.000Z",
  //     updatedAt: null,
  //     productCategory: [
  //       {
  //         id: 4,
  //         name: "SAMSUNG Galaxy F13 (Sunrise Copper, 64 GB)  (4 GB RAM)",
  //         description:
  //           "<p><strong>fa</strong></p><p><strong>fasfasfsfasdfa<u>sfasdfadsfsadfsadf</u></strong></p><p><strong><u>asdfasdfasdf</u></strong></p><p><strong>asdfasfadsfa</strong></p>",
  //         sizeAndFit:
  //           "<p><strong><u>Fabirc and ca</u>re <s>Details</s>&nbsp;</strong></p>",
  //         fabricAndCare:
  //           "<p><strong><u>Fabirc and ca</u>re <s>Details</s>&nbsp;</strong></p>",
  //         isRecycleBin: false,
  //         isFavorite: false,
  //         isPublished: true,
  //         admin_id: 1,
  //         createdAt: "2024-07-11T17:20:04.000Z",
  //         updatedAt: null,
  //         productImages_id: 1,
  //         category_id: 12,
  //         productImage: {
  //           id: 1,
  //           url1: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FDR896ACBL_2.jpg%3Fv%3D1689061795&w=1200&q=75",
  //           url2: "url 2",
  //           url3: "url 3",
  //           url4: "url 4",
  //           url5: "url 5",
  //           admin_id: 1,
  //           product_id: 1,
  //         },
  //       },
  //       {
  //         id: 5,
  //         name: "Placket Detail Waistcoat - Grey",
  //         description:
  //           '<p><span style="color: rgb(41, 40, 43); font-family: SourceSansLight; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">- Comfort fit</span><br style="box-sizing: inherit; padding: 0px; margin: 0px; font-family: SourceSansLight; color: rgb(41, 40, 43); font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span style="color: rgb(41, 40, 43); font-family: SourceSansLight; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">- V-neck</span><br style="box-sizing: inherit; padding: 0px; margin: 0px; font-family: SourceSansLight; color: rgb(41, 40, 43); font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span style="color: rgb(41, 40, 43); font-family: SourceSansLight; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">- Extended placket detail</span><br style="box-sizing: inherit; padding: 0px; margin: 0px; font-family: SourceSansLight; color: rgb(41, 40, 43); font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span style="color: rgb(41, 40, 43); font-family: SourceSansLight; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">- Sleeveless</span><br style="box-sizing: inherit; padding: 0px; margin: 0px; font-family: SourceSansLight; color: rgb(41, 40, 43); font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span style="color: rgb(41, 40, 43); font-family: SourceSansLight; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">- Has A lining</span><br style="box-sizing: inherit; padding: 0px; margin: 0px; font-family: SourceSansLight; color: rgb(41, 40, 43); font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span style="color: rgb(41, 40, 43); font-family: SourceSansLight; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">- Non-transparent</span></p>',
  //         sizeAndFit:
  //           '<p><span style="color: rgb(41, 40, 43); font-family: SourceSansLight; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">Fabric &amp; Care</span></p>',
  //         fabricAndCare:
  //           '<p><span style="color: rgb(41, 40, 43); font-family: SourceSansLight; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">Fabric &amp; Care</span></p>',
  //         isRecycleBin: false,
  //         isFavorite: true,
  //         isPublished: false,
  //         admin_id: 1,
  //         createdAt: "2024-07-11T17:47:18.000Z",
  //         updatedAt: null,
  //         productImages_id: 2,
  //         category_id: 12,
  //         productImage: {
  //           id: 2,
  //           url1: "https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2F3_c10ecf54-1853-446c-8a12-16bd3d7e1700.png%3Fv%3D1690454351&w=1920&q=75",
  //           url2: "url 2",
  //           url3: "url 2",
  //           url4: "url 2",
  //           url5: "url 2",
  //           admin_id: 1,
  //           product_id: 2,
  //         },
  //       },
  //     ],
  //   },
  // ];

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

  // ------------------------------------------------------------------------------------
  //
  // ------------------------------------------------------------------------------------

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  // const prevOnClick = () => {
  //   if (currentCategoryIndex > 0) {
  //     setCurrentCategoryIndex(currentCategoryIndex - 1);
  //   }
  // };

  // const nextOnClick = () => {
  //   if (currentCategoryIndex < categoryData.length - 1) {
  //     setCurrentCategoryIndex(currentCategoryIndex + 1);
  //   }
  // };

  // const currentCategory = categoryData[currentCategoryIndex];

  return (
    <>
      <div className="homePage__3rdBox__productsBox">
        {(function () {
          try {
            return (
              <>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  {categoryWiseProductsRedux.query &&
                    categoryWiseProductsRedux.query.map((category, index) =>
                      (function () {
                        if (category.isFavorite === true) {
                          return (
                            <li
                              className="nav-item"
                              role="presentation"
                              key={index}
                            >
                              <button
                                className={`nav-link ${
                                  index === currentCategoryIndex ? "active" : ""
                                }`}
                                id={`tab-${category.id}`}
                                data-bs-toggle="tab"
                                data-bs-target={`#tab-pane-${category.id}`}
                                type="button"
                                role="tab"
                                aria-controls={`tab-pane-${category.id}`}
                                aria-selected={
                                  index === currentCategoryIndex
                                    ? "true"
                                    : "false"
                                }
                                onClick={() => setCurrentCategoryIndex(index)}
                              >
                                {category.name && category.name}
                              </button>
                            </li>
                          );
                        }
                      })()
                    )}
                </ul>

                <div className="tab-content" id="myTabContent">
                  {categoryWiseProductsRedux.query &&
                    categoryWiseProductsRedux.query.map((category, index) =>
                      (function () {
                        if (category.isFavorite === true) {
                          return (
                            <div
                              key={index}
                              className={`tab-pane fade ${
                                index === currentCategoryIndex
                                  ? "show active"
                                  : ""
                              }`}
                              id={`tab-pane-${category.id}`}
                              role="tabpanel"
                              aria-labelledby={`tab-${category.id}`}
                              tabIndex="0"
                            >
                              <div className="homePage__3rdBox__wrapper">
                                <div className="homePage__3rdBox__wrapper__btns">
                                  <button
                                    className="homePage__3rdBox__wrapper__btns__prev"
                                    onClick={prevOnClick}
                                  >
                                    <IoIosArrowBack />
                                  </button>
                                  <button
                                    className="homePage__3rdBox__wrapper__btns__next"
                                    onClick={nextOnClick}
                                  >
                                    <IoIosArrowForward />
                                  </button>
                                </div>

                                {category.productCategory &&
                                  category.productCategory.map(
                                    (product, prodIndex) =>
                                      (function () {
                                        // console.log("product - ", product);
                                        if (
                                          product.isFavorite === true &&
                                          product.isPublished === true &&
                                          product.isRecycleBin === false
                                        ) {
                                          const sortedProductSizes = [
                                            ...(product.productSizesProduct ||
                                              []),
                                          ].sort((a, b) => a.mrp - b.mrp);

                                          return (
                                            <div
                                              className="homePage__3rdBox__productsBox__card"
                                              key={prodIndex}
                                            >
                                              <div className="homePage__3rdBox__wrapper__favIcon">
                                                <FaRegHeart />{" "}
                                              </div>
                                              <Link
                                                to={`/product/${
                                                  product.productCategory &&
                                                  product.productCategory.name
                                                }/${product.id}/${
                                                  product.name
                                                }`}
                                              >
                                                <img
                                                  src={
                                                    product.productImage.url1
                                                  }
                                                  className="homePage__3rdBox__productsBox__card__image"
                                                  alt="Product"
                                                />
                                              </Link>
                                              <p className="homePage__3rdBox__productsBox__card__productTitle">
                                                {product.id} {" - "}{" "}
                                                {product.name}
                                              </p>
                                              <div className="homePage__3rdBox__productsBox__card__prices">
                                                <p>
                                                  {calculateProductDiscount(
                                                    sortedProductSizes.length >
                                                      0
                                                      ? sortedProductSizes[0]
                                                          .mrp
                                                      : 0,
                                                    sortedProductSizes.length >
                                                      0
                                                      ? sortedProductSizes[0]
                                                          .discountPercent
                                                      : 0
                                                  )}
                                                </p>
                                                <p
                                                  style={{
                                                    textDecoration:
                                                      "line-through",
                                                  }}
                                                >
                                                  {convertInInr(
                                                    sortedProductSizes.length >
                                                      0
                                                      ? sortedProductSizes[0]
                                                          .mrp
                                                      : 0
                                                  )}
                                                </p>
                                                <p style={{ color: "#A10E2C" }}>
                                                  {sortedProductSizes.length > 0
                                                    ? sortedProductSizes[0]
                                                        .discountPercent
                                                    : 0}
                                                  % Off
                                                </p>
                                              </div>
                                            </div>
                                          );
                                        }
                                      })()
                                  )}
                              </div>
                            </div>
                          );
                        }
                      })()
                    )}
                </div>
              </>
            );
          } catch (error) {
            console.log("Error - ", error.message);
          }
        })()}
      </div>
    </>
  );
};

export default ProductsCarousel;
