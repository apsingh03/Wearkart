import axios from "axios";
import React from "react";
import { BsFillImageFill, BsFillStarFill, BsStar } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const AllProducts = (props) => {
  const navigation = useNavigate();

  useEffect(() => {
    // console.log("--UseEffect---");
  }, [navigation]);

  return (
    <>
      <h4 className="text-center mb-3">All Products</h4>
      <div id="adminRightSideWrapper">
        <div id="allproduct">
          <span data-cy="isLoading">
            {/* {isLoading ? (
            <ReactLoading
              type="spinningBubbles"
              color="#2874f0"
              height={50}
              width={50}
            />
          ) : (
            ""
          )} */}
          </span>

          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">
                    <BsFillImageFill />
                  </th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Price</th>
                  <th scope="col">Categories</th>
                  <th scope="col">
                    <BsFillStarFill />
                  </th>
                  <th scope="col"> Date </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td scope="row">
                    <div className="productImage">
                      <img style={{ width: "50px", height: "50px" }} />
                    </div>
                  </td>

                  <td>
                    <p className="productName"> Product Name</p>

                    <div className="belowProductName">
                      <span style={{ color: "#999" }}>
                        Id -<span style={{ color: "#999" }}> {"|"} </span>
                      </span>
                      <span>
                        <Link title="Product View">View</Link>
                        <span style={{ color: "#999" }}> {"|"} </span>
                      </span>
                      <span>
                        <Link title="Edit Product">Edit</Link>
                        <span style={{ color: "#999" }}> {"|"} </span>
                      </span>
                      <span>
                        <Link
                          title="Trash"
                          href="#"
                          style={{ color: "#b32d2e" }}
                        >
                          Trash
                        </Link>
                        <span style={{ color: "#999" }}> {"|"} </span>
                      </span>
                      <span>
                        <Link title="Duplicate It" href="#">
                          Duplicate
                        </Link>
                      </span>
                    </div>
                  </td>
                  {/* (e) => deleteTheProduct(e, props.vendorId, data.id) */}
                  <td className="stock"> </td>
                  <td className="category"></td>
                  <td className="price">
                    <p>
                      <del>
                        <span>₹</span> 233
                      </del>
                    </p>
                    <p>
                      <span>₹</span>
                      324
                    </p>
                  </td>
                  <td className="category">electronics</td>

                  <td title="Not Featured">
                    <BsStar />
                  </td>

                  <td className="publish">
                    <p>Published</p>
                    <p className="date">3 dec 2025</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
