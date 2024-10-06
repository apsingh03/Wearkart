import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="col-12 row">
        <div className="col-6 col-md-3 order-3 order-md-1 ">
          <div className="footer__1st">
            <div>
              <h6 className="footer__1st__title">Shop</h6>
            </div>
            <div className="footer__1st__links">
              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Tops & Shirts
                </Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">Dresses</Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">Tees</Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">Trousers</Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">Livin</Link>{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3  order-2 order-md-2 ">
          <div className="footer__1st">
            <div>
              <h6 className="footer__1st__title">About</h6>
            </div>
            <div className="footer__1st__links">
              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Why We Exist
                </Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Decoding the Best Fit
                </Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  LivIn - The Limitless Pants
                </Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  FS Life - A House of Brands
                </Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Store Locator
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3  order-4 order-md-3  ">
          <div className="footer__1st">
            <div>
              <h6 className="footer__1st__title">Help</h6>
            </div>
            <div className="footer__1st__links">
              <p>
                {" "}
                <Link className="footer__1st__links__title">FAQs</Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Privacy Policy
                </Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Shipping Policy
                </Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Return & Exchange Policy
                </Link>{" "}
              </p>

              <p>
                {" "}
                <Link className="footer__1st__links__title">
                  Terms & Conditions
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3  order-1 order-md-4 ">
          <div className="footer__4th">
            <div>
              <h6 className="footer__4th__logo">WearKart</h6>
            </div>
            <div>
              <p className="footer__4th__copyright">
                {" "}
                © 2024 WearKart All Rights Reserved
              </p>

              <p className="footer__4th__contactUs">CONTACT US</p>

              <p className="footer__4th__phone">Ph No: XXXXXXXXX</p>

              <p className="footer__4th__address">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
                error vero non repudiandae sint fugiat quas illo
              </p>

              <p className="footer__4th__timing">
                Timings: XX to XX, Mon to Sat
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
