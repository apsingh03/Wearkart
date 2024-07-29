import React, { useEffect, useContext } from "react";
import Header from "../../components/Client/Header";
import BannerCarousel from "../../components/Client/BannerCarousel";
import ActressCarousel from "../../components/Client/ActressCarousel";
import { Link } from "react-router-dom";
// import { FaLocationDot } from "react-icons/fa6";
import ProductsCarousel from "../../components/Client/HomePage/ProductsCarousel";
import Footer from "../../components/Client/Footer";
import { SlLocationPin } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/AppContext";
import {
  clientGetActressCarouselAsync,
  clientGetBannerCarouselAsync,
  clientGetCategoryWiseProductAsync,
  clientGetFourBannerImagesAsync,
  clientGetTestimonialAsync,
} from "../../Redux/ClientSlices/clientProductSlice";
import Testimonial from "../../components/Client/Testimonial";
import DressesCarouselAtLg from "../../components/Client/HomePage/DressesCarouselAtLg";

const HomePage = () => {
  const dispatch = useDispatch();
  const { setisLoadingTopProgress } = useContext(AppContext);
  const categoryWiseProductsRedux = useSelector(
    (state) => state.client_product?.categoryWiseProducts?.query
  );
  const bannerCarouselRedux = useSelector(
    (state) => state.client_product?.bannerCarousel?.query
  );
  const actressCarouselRedux = useSelector(
    (state) => state.client_product?.actressCarousel?.query
  );
  const fourBannerImagesRedux = useSelector(
    (state) => state.client_product?.fourBannerImages?.query
  );
  const testimonialRedux = useSelector(
    (state) => state.client_product?.testimonial?.query
  );

  // console.log("bannerCarouselRedux - ", bannerCarouselRedux);

  // console.log("actressCarouselRedux - ", actressCarouselRedux);

  // console.log("fourBannerImagesRedux - ", fourBannerImagesRedux);

  // console.log("testimonialRedux - ", testimonialRedux);

  async function fetchData() {
    setisLoadingTopProgress(30);

    await dispatch(clientGetBannerCarouselAsync());
    await dispatch(clientGetActressCarouselAsync());
    await dispatch(clientGetFourBannerImagesAsync());
    await dispatch(clientGetCategoryWiseProductAsync());
    await dispatch(clientGetTestimonialAsync());

    setisLoadingTopProgress(100);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (function () {
    try {
      return (
        <>
          <Header />

          <section className="dressesCarouselAtlg ">
            <DressesCarouselAtLg
              actressCarouselRedux={
                actressCarouselRedux && actressCarouselRedux
              }
            />
          </section>

          <BannerCarousel
            bannerCarouselRedux={bannerCarouselRedux && bannerCarouselRedux}
          />
          <div className="homePage">

            <ActressCarousel
              actressCarouselRedux={
                actressCarouselRedux && actressCarouselRedux
              }
            />

             <section className="homePage__1stBox ">
              <div className="col-12 row">
                {(function () {
                  try {
                    return (
                      fourBannerImagesRedux &&
                      fourBannerImagesRedux.map((banner, idx) => {
                        return (
                          <Link
                            className="col-6 col-sm-6 col-md-3 col-lg-3 mb-3 homePage__1stBox__card "
                            key={idx}
                            to={`${banner?.routeLink}`}
                          >
                            <img
                              src={`${banner?.imageSrc}`}
                              alt={`${banner?.imageAlt}`}
                              className="homePage__1stBox__card__image"
                            />
                          </Link>
                        );
                      })
                    );
                  } catch (error) {
                    console.log("Error - ", error.message);
                  }
                })()}
              </div>
            </section> 

            <section className="homePage__3rdBox">
              <h4 className="homePage__3rdBox__title">Shop by Occasion</h4>

              <ProductsCarousel
                categoryWiseProductsRedux={
                  categoryWiseProductsRedux && categoryWiseProductsRedux
                }
              />
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

            <section className="testimonial">
              <Testimonial testimonialRedux={testimonialRedux} />
            </section>
          </div>

          <Footer />
        </>
      );
    } catch (error) {
      console.log("Error - ", error.message);
    }
  })();
};

export default HomePage;
