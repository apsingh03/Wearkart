import React, { useState } from "react";
import Header from "../../components/Client/Header";
import Footer from "../../components/Client/Footer";
import { FaAngleRight, FaLocationDot } from "react-icons/fa6";

const ClientDashboard = () => {
  const [toggleTabs, settoggleTabs] = useState({});

  const [toggleHeaderTabs, settoggleHeaderTabs] = useState({ orders: true });
  //   console.log(toggleHeaderTabs);

  const handleToggleTabs = (tabName) => {
    settoggleTabs((prevState) => ({
      ...prevState,
      [tabName]: !prevState[tabName],
    }));
  };

  const handleToggleHeaderTabs = (tabName) => {
    if (tabName === "orders") {
      settoggleHeaderTabs((prevState) => ({
        ...prevState,
        ["orders"]: true,
      }));
      settoggleHeaderTabs((prevState) => ({
        ...prevState,
        ["addresses"]: false,
      }));
    } else {
      settoggleHeaderTabs((prevState) => ({
        ...prevState,
        ["addresses"]: true,
      }));

      settoggleHeaderTabs((prevState) => ({
        ...prevState,
        ["orders"]: false,
      }));
    }
  };

  return (
    <>
      <Header />
      <div className="account">
        <div className="account__header">
          <div
            className={`account__header__card ${
              toggleHeaderTabs["orders"] ? "active" : "notActive"
            } `}
            onClick={() => handleToggleHeaderTabs("orders")}
          >
            <p className="account__header__card__text">Orders</p>
          </div>
          <div
            className={`account__header__card ${
              toggleHeaderTabs["addresses"] ? "active" : "notActive"
            } `}
            onClick={() => handleToggleHeaderTabs("addresses")}
          >
            <p className="account__header__card__text">Addresses</p>
          </div>
        </div>

        <div className="account__body">
          <div>
            {toggleHeaderTabs["orders"] && (
              <>
                <div className="account__body__card">
                  <div
                    className="account__body__card__parent"
                    onClick={() => handleToggleTabs("orderHistory")}
                  >
                    <div className="account__body__card__icon">
                      {" "}
                      <FaAngleRight />{" "}
                    </div>
                    <div className="account__body__card__text">
                      {" "}
                      <p>order history</p>{" "}
                    </div>
                  </div>

                  <div
                    className={`account__body__card__child ${
                      toggleTabs["orderHistory"] ? "active" : "notActive"
                    } `}
                  >
                    <div>
                      <h5 className="account__body__card__child__title">
                        Orders
                        <span class="badge badge-secondary bg-dark mx-2">
                          0
                        </span>
                      </h5>
                    </div>

                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">order no</th>
                            <th scope="col">date</th>
                            <th scope="col">payment status</th>
                            <th scope="col">fulfillment status</th>
                            <th scope="col">total</th>
                            <th scope="col">return / exchange</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Mark</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div
                  className="account__body__card"
                  onClick={() => handleToggleTabs("returnExchange")}
                >
                  <div className="account__body__card__parent">
                    <div className="account__body__card__icon">
                      {" "}
                      <FaAngleRight />{" "}
                    </div>
                    <div className="account__body__card__text">
                      {" "}
                      <p>return / exchange</p>{" "}
                    </div>
                  </div>

                  <div
                    className={`account__body__card__child ${
                      toggleTabs["returnExchange"] ? "active" : "notActive"
                    } `}
                  >
                    <p>
                      {" "}
                      Click here to place a return / exchange request. If there
                      are any issues please reach out at care@fablestreet.com{" "}
                    </p>
                  </div>
                </div>

                <div className="account__body__logoutBtn">
                  <span>logout</span>
                </div>
              </>
            )}
          </div>

          <div>
            {toggleHeaderTabs["addresses"] && (
              <div className="account__body__addresses">
                <h5 className="account__body__card__child__title">
                  Addresses
                  <span class="badge badge-secondary bg-dark mx-2">0</span>
                </h5>

                <div className="account__body__addresses__wrapper">
                  <div className="account__body__addresses__wrapper__allAddresses">
                    <h6>Default Addresses</h6>
                  </div>

                  <div className="account__body__addresses__wrapper__newAddress">
                    <div>
                      {" "}
                      <FaLocationDot />{" "}
                    </div>

                    <div>
                      <h6>Add New Addresses</h6>
                    </div>
                  </div>
                </div>

                <div className="account__body__logoutBtn">
                  <span>logout</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="account__footer"></div>
      </div>
      <Footer />
    </>
  );
};

export default ClientDashboard;
