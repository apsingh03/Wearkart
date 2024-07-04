const express = require("express");
const router = express.Router();

// Example client route
router.get("/", (req, res) => {
  res.send("Client Dashboard");
});

// Import other client routes
const authRoutes = require("./ClientAuthRoutes");
// All auth routes
router.use("/auth", authRoutes);

module.exports = router;
