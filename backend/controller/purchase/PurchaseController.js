const Razorpay = require("razorpay");

const db = require("../../models/");
const { where } = require("sequelize");

const UserCart = db.userCart;
const UserCartItem = db.userCartItem;
const ProductSizes = db.productSizes;
const PSize = db.pSize;
const Product = db.product;

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const calculateCartTotal = (query) => {
  let total = 0;

  query.forEach((item) => {
    const productSize = item.productUserCartItem.productSizesProduct.find(
      (size) => size.PSize_id === item.PSize_id
    );

    if (productSize) {
      const discountedPrice =
        productSize.mrp * (1 - productSize.discountPercent / 100);
      total += discountedPrice * item.qty;
    }
  });

  return total;
};

const purchase = async (req, res) => {
  try {
    let rzp = new Razorpay({
      key_id: process.env.RAZOR_KEY_ID,
      key_secret: process.env.RAZOR_KEY_SECRET,
    });

    const cartQuery = await UserCart.findOne({
      where: {
        status: "pending",
        user_id: req.user.id,
      },

      attributes: {
        exclude: [
          "paymentMode",
          "orderId",
          "paymentId",
          "status",
          "createdAt",
          "updatedAt",
          "user_id",
          "address_id",
        ],
      },
      include: {
        model: UserCartItem,
        as: "userCartUserCartItem",
        where: { orderPlacedStatus: false },
        attributes: {
          exclude: [
            "user_id",
            "paymentId",
            "status",
            "createdAt",
            "updatedAt",
            "cart_id",
            "color_id",
            "orderPlacedStatus",
          ],
        },

        include: {
          model: Product,
          as: "productUserCartItem",
          attributes: {
            exclude: [
              "name",
              "description",
              "sizeAndFit",
              "fabricAndCare",
              "productImages_id",
              "category_id",
              "isRecycleBin",
              "isFavorite",
              "isPublished",
              "admin_id",
              "createdAt",
              "updatedAt",
            ],
          },
          include: [
            {
              model: ProductSizes,
              as: "productSizesProduct",
              attributes: {
                exclude: ["admin_id", "createdAt", "updatedAt", "product_id"],
              },
            },
          ],
        },
      },
    });

    // fetchCartData
    const { userCartUserCartItem } = cartQuery;

    // integer Payment amount in the smallest currency sub-unit. For example,
    // if the amount to be charged is ₹299.00, then pass 29900 in this field.
    const amount = parseInt(calculateCartTotal(userCartUserCartItem)) * 100;

    const paymentGateway = rzp.orders.create(
      { amount, currency: "INR" },
      async (err, order) => {
        if (err) {
          throw new Error(JSON.stringify(err));
        }

        await UserCart.update(
          { orderId: order.id, status: "Razor Pay Pending" },
          {
            where: {
              status: "pending",
              user_id: req.user.id,
            },
          }
        );

        res.status(201).json({
          order,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(403).json({ msg: "something went wrong", error: error });
  }
};

const updateTransactionStatus = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // console.log("Req.body - ", req.body);
    const { cartAmount, payment_id, order_id, paymentStatus } = req.body;
    const userCartFindQuery = await UserCart.findOne({
      where: {
        status: "Razor Pay Pending",
        user_id: req.user.id,
        orderId: order_id,
      },
      transaction: t,
    });

    if (paymentStatus === "FAILED") {
      await userCartFindQuery.update({
        paymentId: null,
        paymentMode: null,
      });

      await t.commit();
      return res.status(202).send({ message: "Transaction Failed" });
    } else {
      // console.log("Req.body - ", req.body);

      // console.log("userCartFindQuery - ", userCartFindQuery);
      await userCartFindQuery.update(
        {
          paymentId: payment_id,
          status: paymentStatus,
          cartAmount,
          paymentMode: "Online",
        },
        {
          transaction: t,
        }
      );
      // console.log("userCartFindQuery.update - ");

      const allCareItemsByCartId = await UserCartItem.findAll({
        where: {
          cart_id: userCartFindQuery.id,
          user_id: req.user.id,
          orderPlacedStatus: false,
        },
        transaction: t,
      });
      // console.log("allCareItemsByCartId - ");
      await Promise.all(
        allCareItemsByCartId.map(async (cartItem) => {
          await UserCartItem.update(
            { orderPlacedStatus: true },
            {
              where: {
                id: cartItem.id,
              },
              transaction: t,
            }
          );
        })
      );

      // Decrease Qty for products stocks
      // cart Id -  userCartFindQuery.id
      // find cart Item by cartId

      // allCareItemsByCartId.

      await Promise.all(
        allCareItemsByCartId.map(async (cartItem) => {
          const productId = cartItem.product_id;
          const PSizeId = cartItem.PSize_id;
          const orderQty = cartItem.qty;

          const PSizeQuery = await PSize.findOne({
            where: {
              id: PSizeId,
              product_id: productId,
            },
            transaction: t,
          });

          const newQtyForPSize = PSizeQuery.qty - orderQty;
          // console.log("productId - ", productId);
          // console.log("PSizeId - ", PSizeId);
          // console.log("orderQty - ", orderQty);
          // console.log(
          //   "Old  - ",
          //   PSizeQuery.qty,
          //   " new Qty  - ",
          //   newQtyForPSize
          // );

          await PSizeQuery.update(
            { qty: newQtyForPSize },
            {
              transaction: t,
            }
          );
        })
      );

      await t.commit();
      return res.status(202).send({ message: "Transaction successfull" });
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  purchase,
  updateTransactionStatus,
};
