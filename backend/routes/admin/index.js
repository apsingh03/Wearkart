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
const sizesRoute = require("./Sizes/SizesRoutes")

// admin/auth/
router.use("/auth", authRoute);
// admin/filter/
router.use("/filter", filterRoute);

// admin/menu/
router.use("/menu", menuRoute);
// Sizes
router.use("/sizes", sizesRoute);

module.exports = router;
