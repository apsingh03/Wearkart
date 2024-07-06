module.exports = (sequelize, DataTypes) => {
  const ParentMenu = sequelize.define(
    "parentMenu",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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

  return ParentMenu;
};
