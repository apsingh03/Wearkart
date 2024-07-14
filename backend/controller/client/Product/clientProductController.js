const { where } = require("sequelize");
const db = require("../../../models");

// Tables
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const AdminAuth = db.adminAuth;
const Category = db.category;
const ProductSizes = db.productSizes;
const PSize = db.pSize;
const Product = db.product;
const ProductImages = db.productImages;
const ProductColors = db.productColors;
const ProductFabrics = db.productFabrics;
const Color = db.color;
const Fabric = db.fabric;
const ChildFilter = db.childFilter;
const ParentFilter = db.parentFilter;
const ParentMenu = db.parentMenu;
const ChildMenu = db.childMenu;

const clientGetCategoryWiseProduct = async (req, res) => {
  try {
    const query = await Category.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Product,
          required: true,
          as: "productCategory",
          attributes: {
            exclude: [
              "description",
              "sizeAndFit",
              "fabricAndCare",
              "createdAt",
              "updatedAt",
              "admin_id",
              "productImages_id",
              "category_id",
            ],
          },
          include: [
            {
              model: ProductImages,
              as: "productImage",
              attributes: {
                exclude: ["admin_id", "product_id"],
              },
            },
            // {
            //   model: ProductColors,
            //   as: "productColorsProduct",
            //   include: [
            //     {
            //       model: Color,
            //       required: true,
            //       as: "productColorsColor",
            //     },
            //   ],
            // },
            // {
            //   model: ProductFabrics,
            //   as: "productFabricsProduct",
            //   include: [
            //     {
            //       model: Fabric,
            //       required: true,
            //       as: "productFabricsFabric",
            //     },
            //   ],
            // },
            {
              model: ProductSizes,
              as: "productSizesProduct",
              attributes: {
                exclude: [
                  "admin_id",
                  "createdAt",
                  "updatedAt",
                  "product_id",
                  "PSize_id",
                ],
              },
              // include: [
              //   {
              //     model: PSize,
              //     required: true,
              //     as: "pSizeProductSizes",
              //   },
              // ],
            },
          ],
        },
      ],
      order: [["id", "ASC"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const clientAllListedProducts = async (req, res) => {
  try {
    const query = await Product.findAll({
      // include: "productProductSizes", // Include the association
      attributes: {
        exclude: [
          "description",
          "sizeAndFit",
          "fabricAndCare",
          "admin_id",
          "createdAt",
          "updatedAt",
          "productImages_id",
          "category_id",
        ],
      },
      include: [
        {
          model: ProductImages,
          as: "productImage",
          attributes: {
            exclude: ["admin_id", "product_id"],
          },
        },
        {
          model: Category,
          as: "productCategory",
          attributes: {
            exclude: ["admin_id", "createdAt", "updatedAt"],
          },
        },
        // {
        //   model: ProductColors,
        //   as: "productColorsProduct",
        //   include: {
        //     model: Color,
        //     required: true,
        //     as: "productColorsColor",
        //   },
        // },
        // {
        //   model: ProductFabrics,
        //   as: "productFabricsProduct",
        //   include: {
        //     model: Fabric,
        //     required: true,
        //     as: "productFabricsFabric",
        //   },
        // },
        {
          model: ProductSizes,
          as: "productSizesProduct",
          attributes: {
            exclude: ["createdAt", "updatedAt", "admin_id", "product_id"],
          },
          include: {
            model: PSize,
            required: true,
            as: "pSizeProductSizes",
            attributes: {
              exclude: ["createdAt", "updatedAt", "admin_id", "product_id"],
            },
          },
        },
      ],

      order: [["id", "Desc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const clientGetSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const query = await Product.findOne({
      attributes: {
        exclude: [
          "admin_id",
          "createdAt",
          "updatedAt",
          "productImages_id",
          "category_id",
        ],
      },
      include: [
        {
          model: ProductImages,
          as: "productImage",
          attributes: {
            exclude: ["admin_id", "product_id"],
          },
        },
        {
          model: Category,
          as: "productCategory",
          attributes: {
            exclude: ["admin_id", "createdAt", "updatedAt"],
          },
        },
        {
          model: ProductColors,
          as: "productColorsProduct",
          attributes: {
            exclude: ["admin_id", "createdAt", "updatedAt", "product_id"],
          },
          include: {
            model: Color,
            required: true,
            as: "productColorsColor",
            attributes: {
              exclude: ["admin_id", "createdAt", "updatedAt"],
            },
          },
        },
        {
          model: ProductFabrics,
          as: "productFabricsProduct",
          attributes: {
            exclude: ["admin_id", "createdAt", "updatedAt", "product_id"],
          },
          include: {
            model: Fabric,
            required: true,
            as: "productFabricsFabric",
            attributes: {
              exclude: ["admin_id", "createdAt", "updatedAt"],
            },
          },
        },
        {
          model: ProductSizes,
          as: "productSizesProduct",
          attributes: {
            exclude: ["createdAt", "updatedAt", "admin_id", "product_id", ""],
          },
          include: {
            model: PSize,
            required: true,
            as: "pSizeProductSizes",
            attributes: {
              exclude: ["createdAt", "updatedAt", "admin_id", "product_id"],
            },
          },
        },
      ],
      where: { id: productId },
      order: [["id", "Desc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const clientGetProductFilters = async (req, res) => {
  try {
    const query = await ParentFilter.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "admin_id"],
      },
      include: [
        {
          model: ChildFilter,
          required: false,
          as: "filterChildData",
          attributes: {
            exclude: ["createdAt", "updatedAt", "admin_id", "parent_id"],
          },
        },
      ],
      order: [["id", "Asc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const clientGetMenuAsync = async (req, res) => {
  try {
    const query = await ParentMenu.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "admin_id"],
      },
      include: [
        {
          model: ChildMenu,
          required: true,
          as: "menuChildData",
          attributes: {
            exclude: ["createdAt", "updatedAt", "admin_id", "parent_id"],
          },
        },
      ],
      order: [["id", "Asc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const clientGetSizesFilters = async (req, res) => {
  try {
    const query = await PSize.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "admin_id", "product_id", "qty"],
      },
      order: [["id", "Asc"]],
    });

    return res.status(200).send({ msg: "success", query });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  clientGetCategoryWiseProduct,
  clientAllListedProducts,
  clientGetSingleProduct,
  clientGetProductFilters,
  clientGetMenuAsync,
  clientGetSizesFilters,
};
