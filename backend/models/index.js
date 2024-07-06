const { Sequelize, DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: "mysql",
    operatorsAliases: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize Connected");
  })
  .catch((error) => {
    console.log("/n /n sequelize Authenticate Error - ", error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Client Tables
db.clientAuth = require("./client/ClientAuthModel.js")(sequelize, DataTypes);
// Admin Models
db.adminAuth = require("./admin/AdminAuthModel.js")(sequelize, DataTypes);
db.parentFilter = require("./admin/Filter/ParentFilterModel.js")(
  sequelize,
  DataTypes
);
db.childFilter = require("./admin/Filter/ChildFilterModel.js")(
  sequelize,
  DataTypes
);

db.parentMenu = require("./admin/Menu/ParentMenuModel.js")(
  sequelize,
  DataTypes
);
db.childMenu = require("./admin/Menu/ChildMenuModel.js")(sequelize, DataTypes);

// -------------------
// --------------------------------- Filter Relations
// -------------------
// Admin --> ParentFilter
db.adminAuth.hasMany(db.parentFilter, {
  foreignKey: "admin_id",
  as: "filterAdminParent",
});

db.parentFilter.belongsTo(db.adminAuth, {
  foreignKey: "admin_id",
  as: "filterAdminParent",
});

// Admin --> ChildFilter
db.adminAuth.hasMany(db.childFilter, {
  foreignKey: "admin_id",
  as: "filterAdminChild",
});

db.childFilter.belongsTo(db.adminAuth, {
  foreignKey: "admin_id",
  as: "filterAdminChild",
});

// parentFilter --> childFilter
db.parentFilter.hasMany(db.childFilter, {
  foreignKey: "parent_id",
  as: "filterChildData",
});

db.childFilter.belongsTo(db.parentFilter, {
  foreignKey: "parent_id",
  as: "filterChildData",
});

// -------------------
// --------------------------------- Menu Relations
// -------------------
// Admin --> parentMenu
db.adminAuth.hasMany(db.parentMenu, {
  foreignKey: "admin_id",
  as: "menuAdminParent",
});

db.parentMenu.belongsTo(db.adminAuth, {
  foreignKey: "admin_id",
  as: "menuAdminParent",
});
// Admin --> childMenu
db.adminAuth.hasMany(db.childMenu, {
  foreignKey: "admin_id",
  as: "menuAdminChild",
});

db.childMenu.belongsTo(db.adminAuth, {
  foreignKey: "admin_id",
  as: "menuAdminChild",
});
// parentMenu --> childMenu
db.parentMenu.hasMany(db.childMenu, {
  foreignKey: "parent_id",
  as: "menuChildData",
});

db.childMenu.belongsTo(db.parentMenu, {
  foreignKey: "parent_id",
  as: "menuChildData",
});

db.sequelize.sync({ force: false }).then(() => {
  console.log("------------ Congratulation You are in Sync -------------- ");
});

module.exports = db;
