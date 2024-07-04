const router = require("express").Router();

const adminAuthController = require("../../controller/admin/AdminAuthController.js");

router.post("/signUp", adminAuthController.adminSignUp);
router.post("/login", adminAuthController.adminLogIn);

module.exports = router;
