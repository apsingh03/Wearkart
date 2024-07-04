const express = require("express");
const router = express.Router();

// Example admin route
router.get("/", (req, res) => {
  res.send("Admin Dashboard");
});

// Import other admin routes
const authRoute = require("./AdminAuthRoutes");
router.use("/auth", authRoute);

module.exports = router;
