const express = require("express");
const router = express.Router();

// Example admin route
router.get("/", (req, res) => {
  res.send("Admin Dashboard");
});

// import other admin routes
const authRoute = require("./AdminAuthRoutes");
const filterRoute = require("./Filter");
const menuRoute = require("./Menu");
const sizesRoute = require("./Sizes/SizesRoutes");
const productRoute = require("./Product/ProductRoutes");
const categoryRoute = require("./Category/CategoryRoutes");
const colorRoute = require("./Color/ColorRoutes");
const fabricRoute = require("./Fabric/FabricRoutes");

// admin/CurrentDefinedPath/
router.use("/auth", authRoute);
router.use("/filter", filterRoute);
router.use("/menu", menuRoute);
router.use("/sizes", sizesRoute);
router.use("/products", productRoute);
router.use("/categories", categoryRoute);
router.use("/colors", colorRoute);
router.use("/fabrics", fabricRoute);

module.exports = router;
