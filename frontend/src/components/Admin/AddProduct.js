import React, { useState, useEffect } from "react";

// productDiscount
const AddProduct = () => {
  useEffect(() => {}, []);

  return (
    <>
      <h4 className="text-center mb-3">Add Product</h4>
      <div id="adminRightSideWrapper">
        <div className="tabAddProduct">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                {" "}
                Product Details{" "}
              </button>
              <button
                className="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Tax & Shipping & Inventory
              </button>
              <button
                className="nav-link"
                id="nav-contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-contact"
                type="button"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                Images
              </button>
              <span></span>

              {/* <button className="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-disabled" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false" disabled>Disabled</button> */}
            </div>
          </nav>

          <form method="POST">
            <div className="tab-content" id="nav-tabContent">
              {/* 1st Tab */}
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
                tabIndex="0"
              >
                <h1>1st</h1>
              </div>

              {/* 2nd tab */}
              <div
                className="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
                tabIndex="0"
              >
                <p className="mt-4 ">
                  <b> Tax Info </b>
                </p>
              </div>

              {/* 3rd tab */}
              <div
                className="tab-pane fade"
                id="nav-contact"
                role="tabpanel"
                aria-labelledby="nav-contact-tab"
                tabIndex="0"
              >
                <p className="mt-4">
                  <b> Images </b>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
