import React, { useState, useRef, useMemo, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PiTextTFill } from "react-icons/pi";
import JoditEditor from "jodit-react";
import { AppContext } from "../../../context/AppContext";
import { getCategoryAsync } from "../../../Redux/AdminSlices/Category/CategorySlice";
import { getColorAsync } from "../../../Redux/AdminSlices/Color/ColorSlice";
import { getFabricAsync } from "../../../Redux/AdminSlices/Fabric/FabricSlice";
import { toast } from "react-toastify";
import {
  createProductAsync,
  isProductTitleExistAsync,
} from "../../../Redux/AdminSlices/Product/ProductSlice";
import UploadProductImages from "./UploadProductImages";
import { uploadProductImageOnAws } from "../../../utils/UploadOnAws";

const AddProduct = () => {
  const { setisLoadingTopProgress } = useContext(AppContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admin_categoryRedux = useSelector((state) => state.admin_category);
  const admin_colorRedux = useSelector((state) => state.admin_color);
  const admin_fabricRedux = useSelector((state) => state.admin_fabric);

  const [productDescription, setproductDescription] = useState("");
  const [productSizeAndFitDetails, setproductSizeAndFitDetails] = useState("");
  const [productFabricAndCareDetails, setproductFabricAndCareDetails] =
    useState("");
  const editorDescription = useRef(null);
  const editorSizeAndFitDetails = useRef(null);
  const editorFabricAndCareDetails = useRef(null);

  const [productName, setproductName] = useState("");
  const [selectCategory, setselectCategory] = useState("");

  const [imagesFile, setimagesFile] = useState([]);

  const [sizes, setSizes] = useState([
    { sizeName: "", qty: "", mrp: "", discountPercent: "" },
  ]);

  // console.log("sizes - ", sizes);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newSizes = [...sizes];
    newSizes[index][name] = value;
    setSizes(newSizes);
  };

  const addSizeEntry = () => {
    setSizes([
      ...sizes,
      { sizeName: "", qty: "", mrp: "", discountPercent: "" },
    ]);
  };

  // dropdown selection
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);

  const handleColorChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedColors(selectedOptions);
  };

  const handleFabricChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedFabrics(selectedOptions);
  };

  async function fetchData() {
    setisLoadingTopProgress(40);
    await dispatch(getCategoryAsync());
    await dispatch(getColorAsync());
    await dispatch(getFabricAsync());
    setisLoadingTopProgress(100);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [validateIsError, setvalidateIsError] = useState({
    productName: false,
    selectCategory: false,
    selectedColors: false,
    selectedFabrics: false,
    productDesc: false,
    productSize: false,
    productImages: false,
    productSizingDetails: false,
    productFabricDetails: false,
  });

  // console.log(validateIsError);

  const calculatePayloadSize = (payload) => {
    const jsonString = JSON.stringify(payload);
    return new Blob([jsonString]).size;
  };

  const handleOnSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setisLoadingTopProgress(30);

      let hasErrors = false;
      const productTitle = productName;
      const productCategory = selectCategory;
      const productColor = selectedColors;
      const productFabrics = selectedFabrics;
      const productDesc = productDescription;
      const productSize = sizes;
      const productImages = imagesFile;
      const productSizingDetails = productSizeAndFitDetails;
      const productFabricDetails = productFabricAndCareDetails;

      if (productTitle.length === 0) {
        setvalidateIsError((prevData) => ({
          ...prevData,
          productName: true,
        }));
        hasErrors = true;
      }
      if (productCategory.length === 0) {
        setvalidateIsError((prevData) => ({
          ...prevData,
          selectCategory: true,
        }));
        hasErrors = true;
      }
      if (productColor.length === 0) {
        setvalidateIsError((prevData) => ({
          ...prevData,
          selectedColors: true,
        }));
        hasErrors = true;
      }
      if (productFabrics.length === 0) {
        setvalidateIsError((prevData) => ({
          ...prevData,
          selectedFabrics: true,
        }));
        hasErrors = true;
      }
      if (productDesc.length === 0) {
        setvalidateIsError((prevData) => ({
          ...prevData,
          productDesc: true,
        }));
        hasErrors = true;
      }

      if (productSizingDetails.length === 0) {
        setvalidateIsError((prevData) => ({
          ...prevData,
          productSizingDetails: true,
        }));
        hasErrors = true;
      }

      if (productFabricDetails.length === 0) {
        setvalidateIsError((prevData) => ({
          ...prevData,
          productFabricDetails: true,
        }));
        hasErrors = true;
      }

      if (
        productSize[0].sizeName.length === 0 &&
        productSize[0].mrp.length === 0 &&
        productSize[0].qty.length === 0 &&
        productSize[0].discountPercent.length === 0
      ) {
        setvalidateIsError((prevData) => ({
          ...prevData,
          productSize: true,
        }));
        hasErrors = true;
      }

      if (productImages.length === 0) {
        setvalidateIsError((prevData) => ({
          ...prevData,
          productImages: true,
        }));
        hasErrors = true;
      }

      if (hasErrors === true) {
        toast.error("Please Fill All *Required");
        setisLoadingTopProgress(100);
        return;
      }

      // No error found Post it
      // console.log("Posting Data");

      const actionIsProductTitleExist = await dispatch(
        isProductTitleExistAsync({
          productTitle,
        })
      );

      if (
        actionIsProductTitleExist.payload.msg &&
        actionIsProductTitleExist.payload.msg === "Product title Exist"
      ) {
        toast.warning(actionIsProductTitleExist.payload.msg);
        setproductName("");
        setisLoadingTopProgress(100);
      }

      if (
        actionIsProductTitleExist.payload.msg &&
        actionIsProductTitleExist.payload.msg === "Product title Doesn't Exist"
      ) {
        setisLoadingTopProgress(40);
        toast.warning("Please wait images uploading on AWS Server ... ");
        const awsUploadedImageUrls = await uploadProductImageOnAws(
          productImages
        );
        setisLoadingTopProgress(70);
        toast.success("Images Uploaded On AWS & Sending data to Backend ...");

        // const payloadSize = calculatePayloadSize({
        //   productTitle,
        //   productCategory,
        //   productColor,
        //   productFabrics,
        //   productDesc,
        //   productSize,
        //   awsUploadedImageUrls,
        //   productSizingDetails,
        //   productFabricDetails,
        // });
        // console.log(`Payload size: ${payloadSize} bytes`);

        // if (payloadSize > 10 * 1024 * 1024) {
        //   // 10MB limit
        //   toast.error("Payload size is too large!");
        //   setisLoadingTopProgress(100);
        //   return;
        // }

        const actionResult = await dispatch(
          createProductAsync({
            productTitle,
            productCategory,
            productColor,
            productFabrics,
            productDesc,
            productSize,
            productImages: awsUploadedImageUrls,
            productSizingDetails,
            productFabricDetails,
          })
        );

        // console.log("actionResult - ", actionResult);

        if (
          actionResult.payload.msg &&
          actionResult.payload.msg === "Product Title Already Exist"
        ) {
          toast.error(actionResult.payload.msg);
          setproductName("");
        }

        if (
          actionResult.payload.msg &&
          actionResult.payload.msg === "Product created"
        ) {
          toast.success(actionResult.payload.msg);
          navigate("/admin/listedProducts/");
        }

        setisLoadingTopProgress(100);
      }
    } catch (error) {
      setisLoadingTopProgress(100);
      toast.error(`Error -  ${error.message}`);
      console.log("handleOnSubmitHandler Error - ", error.message);
    }
  };

  return (
    <>
      <h4 className="text-center mb-3">Add Product</h4>
      <div id="adminRightSideWrapper">
        <div className="tabAddProduct">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="product-description-tab"
                data-bs-toggle="tab"
                data-bs-target="#product-description"
                type="button"
                role="tab"
                aria-controls="product-description"
                aria-selected="true"
              >
                Product Description
                <span
                  style={{
                    padding: "0 10px",
                    color: "red",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {(validateIsError && validateIsError.productName) ||
                  validateIsError.selectCategory ||
                  validateIsError.selectedColors ||
                  validateIsError.selectedFabrics ||
                  validateIsError.productDesc
                    ? "*"
                    : null}
                </span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="sizes-tab"
                data-bs-toggle="tab"
                data-bs-target="#sizes"
                type="button"
                role="tab"
                aria-controls="sizes"
                aria-selected="false"
              >
                Sizes
                <span
                  style={{
                    padding: "0 10px",
                    color: "red",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {validateIsError && validateIsError.productSize ? "*" : null}
                </span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="images-tab"
                data-bs-toggle="tab"
                data-bs-target="#images"
                type="button"
                role="tab"
                aria-controls="images"
                aria-selected="false"
              >
                Images
                <span
                  style={{
                    padding: "0 10px",
                    color: "red",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {validateIsError && validateIsError.productImages
                    ? "*"
                    : null}
                </span>
              </button>
            </li>

            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="size-and-fit-tab"
                data-bs-toggle="tab"
                data-bs-target="#size-and-fit"
                type="button"
                role="tab"
                aria-controls="size-and-fit"
                aria-selected="false"
              >
                Size and Fit Details
                <span
                  style={{
                    padding: "0 10px",
                    color: "red",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {validateIsError && validateIsError.productSizingDetails
                    ? "*"
                    : null}
                </span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="fabric-and-care-tab"
                data-bs-toggle="tab"
                data-bs-target="#fabric-and-care"
                type="button"
                role="tab"
                aria-controls="fabric-and-care"
                aria-selected="false"
              >
                Fabric and Care Details
                <span
                  style={{
                    padding: "0 10px",
                    color: "red",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {validateIsError && validateIsError.productFabricDetails
                    ? "*"
                    : null}
                </span>
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="product-description"
              role="tabpanel"
              aria-labelledby="product-description-tab"
            >
              <div className="p-3">
                <div className="form-group mb-3">
                  <div className="d-flex align-items-baseline">
                    <label htmlFor="productName">Product Title</label>
                    <p className="authPage__inputFieldError px-3">
                      {validateIsError.productName &&
                      validateIsError.productName
                        ? "*Required"
                        : null}
                    </p>
                  </div>

                  <div className="authPage__inputContainer">
                    <div className="authPage__inputContainer__icon">
                      <PiTextTFill size={30} />
                    </div>

                    <input
                      type="text"
                      className="form-control"
                      id="productName"
                      name="productName"
                      required
                      onBlur={() =>
                        setvalidateIsError((prevData) => ({
                          ...prevData,
                          productName: !prevData.productName,
                        }))
                      }
                      onChange={(e) => setproductName(e.target.value)}
                      value={productName}
                    />
                  </div>
                </div>

                <div className="mb-3 row  col-12">
                  <div className="col-12 col-md-4 mb-3">
                    <label htmlFor="selectProductCategory">
                      Please Select Category{" "}
                      <span
                        style={{
                          padding: "0 10px",
                          color: "red",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        {validateIsError.selectCategory &&
                        validateIsError.selectCategory
                          ? "  *Required"
                          : null}
                      </span>
                    </label>
                    <select
                      className="form-select"
                      name="parentId"
                      id="selectProductCategory"
                      onBlur={() =>
                        setvalidateIsError((prevData) => ({
                          ...prevData,
                          selectCategory: !prevData.selectCategory,
                        }))
                      }
                      onChange={(e) => setselectCategory(e.target.value)}
                    >
                      <option disabled>
                        {" "}
                        {admin_categoryRedux.isLoading &&
                        admin_categoryRedux.isLoading
                          ? "Loading"
                          : "Select Category"}
                      </option>

                      {(function () {
                        try {
                          return (
                            admin_categoryRedux.data.query &&
                            admin_categoryRedux.data.query.map(
                              (data, index) => {
                                return (
                                  <option value={`${data.id}`} key={index}>
                                    {data.name}
                                  </option>
                                );
                              }
                            )
                          );
                        } catch (error) {
                          console.log("Error - ", error);
                        }
                      })()}
                    </select>
                  </div>

                  <div className="col-12 col-md-4 mb-3">
                    <label htmlFor="selectProductColor">
                      Please Select Color
                      <span
                        style={{
                          padding: "0 10px",
                          color: "red",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        {validateIsError.selectedColors &&
                        validateIsError.selectedColors
                          ? "  *Required"
                          : null}
                      </span>
                    </label>
                    <select
                      className="form-select"
                      name="parentId"
                      id="selectProductColor"
                      multiple
                      onChange={handleColorChange}
                      onBlur={() =>
                        setvalidateIsError((prevData) => ({
                          ...prevData,
                          selectedColors: !prevData.selectedColors,
                        }))
                      }
                    >
                      <option disabled>
                        {" "}
                        {admin_colorRedux.isLoading &&
                        admin_colorRedux.isLoading
                          ? "Loading"
                          : "Select Color"}
                      </option>

                      {(function () {
                        try {
                          return (
                            admin_colorRedux.data.query &&
                            admin_colorRedux.data.query.map((data, index) => {
                              return (
                                <option value={`${data.id}`} key={index}>
                                  {data.name}
                                </option>
                              );
                            })
                          );
                        } catch (error) {
                          console.log("Error - ", error);
                        }
                      })()}
                    </select>
                  </div>

                  <div className="col-12 col-md-4">
                    <label htmlFor="selectFabric">
                      Please Select Fabric{" "}
                      <span
                        style={{
                          padding: "0 10px",
                          color: "red",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        {validateIsError.selectedFabrics &&
                        validateIsError.selectedFabrics
                          ? "  *Required"
                          : null}
                      </span>{" "}
                    </label>
                    <select
                      className="form-select"
                      name="parentId"
                      id="selectFabric"
                      multiple
                      onChange={handleFabricChange}
                      onBlur={() =>
                        setvalidateIsError((prevData) => ({
                          ...prevData,
                          selectedFabrics: !prevData.selectedFabrics,
                        }))
                      }
                    >
                      <option disabled>
                        {" "}
                        {admin_fabricRedux.isLoading &&
                        admin_fabricRedux.isLoading
                          ? "Loading"
                          : "Select Fabric"}
                      </option>

                      {(function () {
                        try {
                          return (
                            admin_fabricRedux.data.query &&
                            admin_fabricRedux.data.query.map((data, index) => {
                              return (
                                <option value={`${data.id}`} key={index}>
                                  {data.name}
                                </option>
                              );
                            })
                          );
                        } catch (error) {
                          console.log("Error - ", error);
                        }
                      })()}
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <p>
                    Description{" "}
                    <span
                      style={{
                        padding: "0 10px",
                        color: "red",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {validateIsError.productDesc &&
                      validateIsError.productDesc
                        ? "  *Required"
                        : null}
                    </span>{" "}
                  </p>
                  <JoditEditor
                    ref={editorDescription}
                    value={productDescription}
                    onBlur={() =>
                      setvalidateIsError((prevData) => ({
                        ...prevData,
                        productDesc: !prevData.productDesc,
                      }))
                    }
                    onChange={(newContent) => setproductDescription(newContent)}
                  />
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="sizes"
              role="tabpanel"
              aria-labelledby="sizes-tab"
            >
              <div className="p-3">
                <span
                  style={{
                    padding: "0 10px",
                    color: "red",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {validateIsError.productSize && validateIsError.productSize
                    ? "  *Required"
                    : null}
                </span>
                <div>
                  {(function () {
                    try {
                      return (
                        <>
                          {sizes.map((size, index) => (
                            <div
                              key={index}
                              className="size-entry d-flex"
                              style={{ gap: "10px", marginBottom: "20px" }}
                              onClick={() =>
                                setvalidateIsError((prevData) => ({
                                  ...prevData,
                                  productSize: !prevData.productName,
                                }))
                              }
                            >
                              <input
                                type="text"
                                name="sizeName"
                                className="form-control"
                                value={size.sizeName}
                                required
                                placeholder="Size Name"
                                onChange={(e) => handleChange(index, e)}
                              />
                              <input
                                type="number"
                                name="qty"
                                className="form-control"
                                value={size.qty}
                                required
                                placeholder="Qty"
                                onChange={(e) => handleChange(index, e)}
                              />
                              <input
                                type="number"
                                name="mrp"
                                className="form-control"
                                value={size.mrp}
                                required
                                placeholder="MRP"
                                onChange={(e) => handleChange(index, e)}
                              />
                              <input
                                type="number"
                                name="discountPercent"
                                className="form-control"
                                value={size.discountPercent}
                                required
                                placeholder="Discount %"
                                onChange={(e) => handleChange(index, e)}
                              />
                            </div>
                          ))}
                          <button
                            type="button"
                            className="btn btn-primary btn-sm mt-3"
                            onClick={addSizeEntry}
                          >
                            Add Size
                          </button>
                        </>
                      );
                    } catch (error) {
                      console.log("Error - ", error);
                    }
                  })()}
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="images"
              role="tabpanel"
              aria-labelledby="images-tab"
            >
              <div className="p-3 row">
                <span
                  style={{
                    padding: "0 10px",
                    color: "red",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {validateIsError.productImages &&
                  validateIsError.productImages
                    ? "  *Required"
                    : null}
                </span>

                <UploadProductImages
                  setimagesFile={setimagesFile}
                  imagesFile={imagesFile}
                />
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="size-and-fit"
              role="tabpanel"
              aria-labelledby="size-and-fit-tab"
            >
              <div className="p-3">
                <div className="mb-3">
                  <p>
                    Size and Fit Details
                    <span
                      style={{
                        padding: "0 10px",
                        color: "red",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {validateIsError.productSizingDetails &&
                      validateIsError.productSizingDetails
                        ? "  *Required"
                        : null}
                    </span>
                  </p>
                  <JoditEditor
                    ref={editorSizeAndFitDetails}
                    value={productFabricAndCareDetails}
                    onBlur={() =>
                      setvalidateIsError((prevData) => ({
                        ...prevData,
                        productSizingDetails: !prevData.productSizingDetails,
                      }))
                    }
                    onChange={(newContent) =>
                      setproductSizeAndFitDetails(newContent)
                    }
                  />
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="fabric-and-care"
              role="tabpanel"
              aria-labelledby="fabric-and-care-tab"
            >
              <form onSubmit={handleOnSubmitHandler}>
                <div className="p-3">
                  <div className="mb-3">
                    <p>
                      Fabric and Care Details
                      <span
                        style={{
                          padding: "0 10px",
                          color: "red",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        {validateIsError.productFabricDetails &&
                        validateIsError.productFabricDetails
                          ? "  *Required"
                          : null}
                      </span>
                    </p>
                    <JoditEditor
                      ref={editorFabricAndCareDetails}
                      value={productFabricAndCareDetails}
                      onBlur={() =>
                        setvalidateIsError((prevData) => ({
                          ...prevData,
                          productFabricDetails: !prevData.productFabricDetails,
                        }))
                      }
                      onChange={(newContent) =>
                        setproductFabricAndCareDetails(newContent)
                      }
                    />
                  </div>

                  <div style={{ margin: "auto" }}>
                    <button
                      type="submit"
                      className="btn btn-primary btn-md  mx-auto"
                    >
                      Create New Product{" "}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
