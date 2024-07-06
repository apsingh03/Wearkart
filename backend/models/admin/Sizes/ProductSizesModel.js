module.exports = (sequelize, DataTypes) => {
  const ProductSizes = sequelize.define(
    "productSizes",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  return ProductSizes;
};
