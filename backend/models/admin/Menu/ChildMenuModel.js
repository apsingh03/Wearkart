module.exports = (sequelize, DataTypes) => {
  const ChildMenu = sequelize.define(
    "childMenu",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin_id: {
        type: DataTypes.INTEGER,
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

  return ChildMenu;
};
