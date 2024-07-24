import React, { useEffect, useState, useContext } from "react";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { RiSubtractFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { MdChevronRight } from "react-icons/md";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserCartAsync,
  getUserCartAsync,
  updateUserCartQtyAsync,
} from "../../Redux/UserSlices/Cart/UserCartRedux";
import {
  calculateProductDiscount,
  convertInInr,
} from "../../utils/productDiscountCalculate";
import { displayRazorpay } from "../../paymentGateway/PaymentGateway";

const Cart = ({ setcartIsHover }) => {
  const dispatch = useDispatch();

  const user_userCart = useSelector((state) => state.user_userCart.data);
  const clientIsLogged = useSelector(
    (state) => state.client_auth.loggedData.isUserLogged
  );

  const { setisLoadingTopProgress } = useContext(AppContext);
  let calculateTotalCartMrp = 0;
  let calculateTotalCartAfterDiscount = 0;

  async function fetchData() {
    setisLoadingTopProgress(30);

    if (clientIsLogged) {
      await dispatch(getUserCartAsync());
    }

    setisLoadingTopProgress(100);
  }

  async function handleRemoveBtn(cart_id, cartItem_id) {
    setisLoadingTopProgress(30);
    // console.log("delete func -  ", cart_id, cartItem_id);
    await dispatch(deleteUserCartAsync({ cart_id, cartItem_id }));

    setisLoadingTopProgress(100);
  }

  async function handleCartQty(
    cartItem_id,
    qtyMessage,
    userCartItemQty,
    productStockQty
  ) {
    setisLoadingTopProgress(30);

    // console.log(" userCartItemQty - ", userCartItemQty);
    // console.log(" productStockQty - ", productStockQty);

    if (qtyMessage === "Decrease" && userCartItemQty <= 1) {
      alert("You can't less it");
    } else if (
      qtyMessage === "Increase" &&
      userCartItemQty >= productStockQty
    ) {
      alert("You can't add more than stock qty");
    } else {
      await dispatch(updateUserCartQtyAsync({ cartItem_id, qtyMessage }));
    }

    setisLoadingTopProgress(100);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const userCartItems = user_userCart?.query?.[0]?.userCartUserCartItem || [];

  return (
    <div className="cart">
      <div className="cart__header">
        <div className="cart__header__top">
          <div className="">
            <span className="cart__header__top__icons">
              {" "}
              <LiaShoppingBagSolid />{" "}
            </span>
            <span>{userCartItems?.length} items</span>
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

      <div
        className={`cart__body ${
          userCartItems.length > 1 ? "scrollIt" : null
        } `}
      >
        {(function () {
          try {
            if (userCartItems.length > 0) {
              return (
                userCartItems &&
                userCartItems.map((cartItem, index) => {
                  // console.log("cartItem - ", cartItem);
                  // console.log("psize id - ", cartItem.PSize_id);

                  // console.log(
                  //   "cartItem - ",
                  //   cartItem.productUserCartItem.productSizesProduct
                  // );

                  const matchingSize =
                    cartItem.productUserCartItem.productSizesProduct.find(
                      (size) => size.PSize_id === cartItem.PSize_id
                    );

                  // console.log("matchingSize ", matchingSize);

                  if (matchingSize) {
                    calculateTotalCartMrp += matchingSize.mrp * cartItem?.qty;

                    calculateTotalCartAfterDiscount +=
                      (matchingSize.mrp *
                        cartItem?.qty *
                        matchingSize.discountPercent) /
                      100;

                    calculateProductDiscount(
                      matchingSize.mrp,
                      matchingSize.discountPercent
                    );
                  }

                  const matchingColor =
                    cartItem.productUserCartItem.productColorsProduct.find(
                      (color) => color.color_id === cartItem.color_id
                    );

                  return (
                    <div className="cart__body__card" key={index}>
                      <div>
                        <img
                          src={
                            cartItem.productUserCartItem.productImage &&
                            cartItem.productUserCartItem.productImage.url1
                          }
                          className="cart__body__card__image"
                          alt="Product"
                        />
                      </div>

                      <div className="cart__body__card__product">
                        <p className="cart__body__card__product__Title">
                          {cartItem.productUserCartItem &&
                            cartItem.productUserCartItem.name}
                          {cartItem.id}
                        </p>

                        <div className="d-flex flex-row justify-content-between">
                          <p
                            className="cart__body__card__product__Title"
                            style={{ fontSize: "12px" }}
                          >
                            <span style={{ fontWeight: "bold" }}> Size - </span>
                            {matchingSize &&
                              matchingSize.pSizeProductSizes.name}
                          </p>
                          <p
                            className="cart__body__card__product__Title"
                            style={{ fontSize: "12px" }}
                          >
                            <span style={{ fontWeight: "bold" }}>
                              {" "}
                              Color -{" "}
                            </span>
                            {matchingColor &&
                              matchingColor.productColorsColor.name}
                          </p>
                        </div>

                        <p className="cart__body__card__product__Price">
                          {matchingSize &&
                            calculateProductDiscount(
                              matchingSize.mrp,
                              matchingSize.discountPercent
                            )}
                        </p>

                        <div className="cart__body__card__product__btns">
                          <div className="cart__body__card__product__btns_qtyGrp">
                            <div
                              className="cart__body__card__product__btns_qtyGrp__icon"
                              onClick={() =>
                                handleCartQty(
                                  cartItem?.id,
                                  "Decrease",
                                  cartItem?.qty,
                                  matchingSize?.pSizeProductSizes?.qty
                                )
                              }
                            >
                              <RiSubtractFill />
                            </div>
                            <p className="cart__body__card__product__btns_qtyGrp__qty">
                              {cartItem?.qty}
                            </p>
                            <div
                              className="cart__body__card__product__btns_qtyGrp__icon"
                              onClick={() =>
                                handleCartQty(
                                  cartItem?.id,
                                  "Increase",
                                  cartItem?.qty,
                                  matchingSize?.pSizeProductSizes?.qty
                                )
                              }
                            >
                              <FaPlus />
                            </div>
                          </div>

                          <Link
                            className="cart__body__card__product__btns__removeBtn"
                            onClick={() =>
                              handleRemoveBtn(cartItem.cart_id, cartItem.id)
                            }
                          >
                            Remove
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              );
            } else {
              return <h6 className="text-center p-3">Cart is Empty</h6>;
            }
          } catch (error) {
            console.log("Error -", error.message);
          }
        })()}
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
              {convertInInr(calculateTotalCartMrp)}
            </p>
            <p className="cart__footer__summary__wrapper__cartTotal">
              {convertInInr(
                calculateTotalCartMrp - calculateTotalCartAfterDiscount
              )}
            </p>
          </div>
        </div>

        <div>
          <div
            className="cart__footer__checkoutBtn"
            onClick={() => {
              if (calculateTotalCartAfterDiscount > 1) {
                displayRazorpay();
              } else {
                alert("Cart have no Item");
              }
            }}
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
