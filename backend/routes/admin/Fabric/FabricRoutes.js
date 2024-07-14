const express = require("express");
const router = express.Router();

const FabricController = require("../../../controller/admin/Fabric/FabricController.js");

const middleware = require("../../../middleware/AdminAuth.js");

// admin/filter/parent/name
router.get("/fabric", middleware.authenticateAdmin, FabricController.getFabric);

router.post(
  "/fabric",
  middleware.authenticateAdmin,
  FabricController.createFabric
);

router.patch(
  "/fabric/:id",
  middleware.authenticateAdmin,
  FabricController.updateFabric
);

router.delete(
  "/fabric/:id",
  middleware.authenticateAdmin,
  FabricController.deleteFabric
);

module.exports = router;
