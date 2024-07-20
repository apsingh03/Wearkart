const express = require("express");
const router = express.Router();

const userController = require("../../../controller/user/user/UserController.js");

const userAuth = require("../../../middleware/UserAuth.js");

// client/product/
// router.post("/user", userAuth.authenticateUser, cartController.createUserCart);

router.get("/user", userAuth.authenticateUser, userController.getUserInfo);

// router.patch(
//   "/user/:cartItem_id/",
//   userAuth.authenticateUser,
//   cartController.updateUserCartQty
// );

// router.delete(
//   "/user/:cart_id/:cartItem_id",
//   userAuth.authenticateUser,
//   cartController.deleteUserCart
// );

module.exports = router;
