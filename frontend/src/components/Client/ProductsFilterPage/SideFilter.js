import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SideFilter = ({ setIsFilterSideBarVisible }) => {
  const [isSubMenuToggle, setisSubMenuToggle] = useState({});

  const handleToggle = (id) => {
    setisSubMenuToggle((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const menuData = [
    {
      id: 1,
      catName: "Category 1",
      subMenu: [
        { id: 1, subName: "cat 1.1", url: "" },
        { id: 2, subName: "cat 1.2", url: "" },
        { id: 3, subName: "cat 1.3", url: "" },
        { id: 4, subName: "cat 1.4", url: "" },
        { id: 5, subName: "cat 1.5", url: "" },
        { id: 6, subName: "cat 1.6", url: "" },
      ],
    },

    {
      id: 2,
      catName: "Category 2",
      subMenu: [
        { id: 1, subName: "cat 2.1", url: "" },
        { id: 2, subName: "cat 2.2", url: "" },
        { id: 3, subName: "cat 2.3", url: "" },
        { id: 4, subName: "cat 2.4", url: "" },
        { id: 5, subName: "cat 2.5", url: "" },
        { id: 6, subName: "cat 2.6", url: "" },
      ],
    },

    {
      id: 3,
      catName: "Category 3",
      subMenu: [
        { id: 1, subName: "cat 3.1", url: "" },
        { id: 2, subName: "cat 3.2", url: "" },
        { id: 3, subName: "cat 3.3", url: "" },
        { id: 4, subName: "cat 3.4", url: "" },
        { id: 5, subName: "cat 3.5", url: "" },
        { id: 6, subName: "cat 3.6", url: "" },
      ],
    },
  ];

  return (
    <div className="filterMenu">
      <div className="filterMenu__header">
        <div className="d-flex flex-row" style={{ gap: "10px" }}>
          <h6 className="filterMenu__header__title">Filter</h6>
          <h6 className="filterMenu__header__countingText">0</h6>
        </div>

        <div
          onClick={() => setIsFilterSideBarVisible((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <RxCross2 />
        </div>
      </div>
      <div className="filterMenu__body">
        {menuData.map((data, idx) => {
          return (
            <div
              className="filterMenu__body__card"
              key={idx}
              onClick={() => handleToggle(data.id)}
            >
              <div className="filterMenu__body__card__parent ">
                <div>
                  <span className="filterMenu__body__card__parent__catName">
                    {data.catName}
                  </span>
                </div>

                <div>
                  <span>
                    {isSubMenuToggle[data.id] ? <FaMinus /> : <FaPlus />}
                  </span>
                </div>
              </div>

              <div
                className={`filterMenu__body__child  ${
                  isSubMenuToggle[data.id]
                    ? "subMenuActive"
                    : "subMenuNotActive"
                } `}
              >
                {data.subMenu.map((subMenuData, subMenuIdx) => {
                  return (
                    <div
                      key={subMenuIdx}
                      className="filterMenu__body__child__card"
                    >
                      {" "}
                      <Link to="#"> {subMenuData.subName} </Link>{" "}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="filterMenu__footer">
        <div className="filterMenu__footer__cancelBtn">
          <span>cancel</span>
        </div>

        <div className="filterMenu__footer__applyBtn">
          <span>apply</span>
        </div>
      </div>
    </div>
  );
};

export default SideFilter;
