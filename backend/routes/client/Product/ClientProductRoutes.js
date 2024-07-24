const express = require("express");
const router = express.Router();

const productController = require("../../../controller/client/Product/clientProductController.js");

// client/product/CurrentRoutes
router.get(
  "/categoryWiseProduct",
  productController.clientGetCategoryWiseProduct
);

router.get("/allListedProducts", productController.clientAllListedProducts);
router.get(
  "/filteredProducts",
  productController.clientShowFilteredProducts
);
router.get("/singleProduct/:id", productController.clientGetSingleProduct);
router.get("/productFilters", productController.clientGetProductFilters);
router.get("/getMenu", productController.clientGetMenuAsync);
router.get("/sizesFilters", productController.clientGetSizesFilters);

module.exports = router;
