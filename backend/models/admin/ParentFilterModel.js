module.exports = (sequelize, DataTypes) => {
  const ParentFilter = sequelize.define(
    "parentFilter",
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

  return ParentFilter;
};
