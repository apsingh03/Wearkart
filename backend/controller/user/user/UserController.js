const { where } = require("sequelize");
const db = require("../../../models");

// Tables

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const AdminAuth = db.adminAuth;
const ClientAuth = db.clientAuth;
const Category = db.category;
const ProductSizes = db.productSizes;
const PSize = db.pSize;
const Product = db.product;
const ProductImages = db.productImages;
const ProductColors = db.productColors;
const ProductFabrics = db.productFabrics;
const Color = db.color;
const Fabric = db.fabric;
const UserCart = db.userCart;
const UserCartItem = db.userCartItem;

const getUserInfo = async (req, res) => {
  try {
    const query = await ClientAuth.findAll({
      where: {
        id: req.user.id,
      },

      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },

      include: {
        model: UserCart,
        as: "clientAuthUserCart",
        where: { status: "SUCCESSFUL" },
        include: {
          model: UserCartItem,
          as: "userCartUserCartItem",
          attributes: {
            exclude: ["user_id", "createdAt", "updatedAt"],
          },
          where: { orderPlacedStatus: true },
        },

        // where: {
        //   orderPlacedStatus: false,
        // },
        // include: {
        //   model: Product,
        //   as: "productUserCartItem",
        //   attributes: {
        //     exclude: [
        //       "description",
        //       "sizeAndFit",
        //       "fabricAndCare",
        //       "productImages_id",
        //       "category_id",
        //       "isRecycleBin",
        //       "isFavorite",
        //       "isPublished",
        //       "admin_id",
        //       "createdAt",
        //       "updatedAt",
        //     ],
        //   },
        //   include: [
        //     {
        //       model: ProductImages,
        //       as: "productImage",
        //       attributes: {
        //         exclude: [
        //           "admin_id",
        //           "product_id",
        //           "url2",
        //           "url3",
        //           "url4",
        //           "url5",
        //         ],
        //       },
        //     },
        //     // {
        //     //   model: Category,
        //     //   as: "productCategory",
        //     //   attributes: {
        //     //     exclude: ["admin_id", "createdAt", "updatedAt"],
        //     //   },
        //     // },
        //     {
        //       model: ProductColors,
        //       as: "productColorsProduct",
        //       attributes: {
        //         exclude: ["admin_id", "createdAt", "updatedAt", "product_id"],
        //       },
        //       include: {
        //         model: Color,
        //         required: true,
        //         as: "productColorsColor",
        //         attributes: {
        //           exclude: ["admin_id", "createdAt", "updatedAt"],
        //         },
        //       },
        //     },
        //     {
        //       model: ProductSizes,
        //       as: "productSizesProduct",
        //       attributes: {
        //         exclude: ["admin_id", "createdAt", "updatedAt", "product_id"],
        //       },
        //       include: {
        //         model: PSize,
        //         required: true,
        //         as: "pSizeProductSizes",
        //         attributes: {
        //           exclude: ["admin_id", "createdAt", "updatedAt", "product_id"],
        //         },
        //       },
        //     },
        //   ],
        // },
      },
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getUserInfo,
};
