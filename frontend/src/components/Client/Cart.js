import React, { useState } from "react";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { RiSubtractFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { MdChevronRight } from "react-icons/md";
const Cart = ({ setcartIsHover }) => {
  const [cartQty, setcartQty] = useState(1);

  function decreaseCartQty() {
    if (cartQty >= 1) {
      setcartQty(cartQty - 1);
    } else {
      alert("can't decrease");
    }
  }

  function increaseCartQty() {
    if (cartQty >= 10) {
      alert("can't Increase ");
    } else {
      setcartQty(cartQty + 1);
    }
  }

  return (
    <div className="cart">
      <div className="cart__header">
        <div className="cart__header__top">
          <div className="">
            <span className="cart__header__top__icons">
              {" "}
              <LiaShoppingBagSolid />{" "}
            </span>
            <span>1 items</span>
          </div>
          <div
            onClick={() => [
              setcartIsHover(false),
              (document.body.style.overflowY = "auto"),
            ]}
          >
            <span className="cart__header__top__closeIcon">
              {" "}
              <RxCross2 />{" "}
            </span>
          </div>
        </div>

        <div className="cart__header__offers">
          <p>Free India Shipping | Easy 7 Day Returns | Free Pickup</p>
        </div>
      </div>
      <div className="cart__body">
        {[""].map((data, index) => {
          return (
            <div className="cart__body__card" key={index}>
              <div>
                <img
                  src="https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FFSKNTP1255BLAC_1.jpg%3Fv%3D1708679469&w=1920&q=75"
                  className="cart__body__card__image"
                  alt="Product "
                />
              </div>

              <div className="cart__body__card__product">
                <p className="cart__body__card__product__Title">
                  {" "}
                  Round Neck Rib Knit Top Black and White{" "}
                </p>
                <p className="cart__body__card__product__Price">
                  {" "}
                  &#8377; 7,170{" "}
                </p>

                <div className="cart__body__card__product__btns">
                  <div className="cart__body__card__product__btns_qtyGrp">
                    <div
                      className="cart__body__card__product__btns_qtyGrp__icon"
                      onClick={() => decreaseCartQty()}
                    >
                      {" "}
                      <RiSubtractFill />{" "}
                    </div>
                    <p className="cart__body__card__product__btns_qtyGrp__qty">
                      {cartQty}
                    </p>
                    <div
                      className="cart__body__card__product__btns_qtyGrp__icon"
                      onClick={() => increaseCartQty()}
                    >
                      {" "}
                      <FaPlus />{" "}
                    </div>
                  </div>

                  <Link className="cart__body__card__product__btns__removeBtn">
                    Remove
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="cart__footer">
        <div className="cart__footer__summary">
          <div>
            <p>Total</p>
          </div>
          <div className="cart__footer__summary__wrapper">
            <p className="cart__footer__summary__wrapper__couponCode">
              SUMMER 20 is applied
            </p>
            <p className="cart__footer__summary__wrapper__discountPrice">
              &#8377; 7,170
            </p>
            <p className="cart__footer__summary__wrapper__cartTotal">
              &#8377; 7,170
            </p>
          </div>
        </div>

        <div>
          <div
            className="cart__footer__checkoutBtn"
            onClick={() => alert("Indian Order")}
          >
            <span>
              {" "}
              <img
                className="cart__footer__checkoutBtn__flag"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwiVvtWaAShEETOjaVPVkdZHXl-Y_iSQfX_g&s"
                alt="indian Flag"
              />{" "}
            </span>
            <span className="cart__footer__checkoutBtn__text">checkout</span>
            <span className="cart__footer__checkoutBtn__rightIcon">
              {" "}
              <MdChevronRight />{" "}
            </span>
          </div>

          <div
            className="cart__footer__checkoutBtn"
            onClick={() => alert("International Order")}
          >
            <span>
              {" "}
              <img
                className="cart__footer__checkoutBtn__flag"
                src="https://cdn-icons-png.flaticon.com/512/2072/2072130.png"
                alt="World Globe Icon"
              />{" "}
            </span>
            <span className="cart__footer__checkoutBtn__text">
              for international orders
            </span>
            <span className="cart__footer__checkoutBtn__rightIcon">
              {" "}
              <MdChevronRight />{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
