const express = require("express");
const router = express.Router();

// Example client route
router.get("/", (req, res) => {
  res.send("Welcome to Client Backend Dashboard");
});

// Import other client routes
const authRoutes = require("./ClientAuthRoutes");
const productRoutes = require("./Product/ClientProductRoutes");
// All auth routes
router.use("/auth", authRoutes);
router.use("/product", productRoutes);

module.exports = router;
