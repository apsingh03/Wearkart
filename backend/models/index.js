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
db.parentFilter = require("./admin/ParentFilterModel.js")(sequelize, DataTypes);
db.childFilter = require("./admin/ChildFilterModel.js")(sequelize, DataTypes);

// Filter Parent Relations
db.adminAuth.hasMany(db.parentFilter, {
  foreignKey: "admin_id",
  as: "adminParent",
});

db.parentFilter.belongsTo(db.adminAuth, {
  foreignKey: "admin_id",
  as: "adminParent",
});

// Filter Child Relations
db.adminAuth.hasMany(db.childFilter, {
  foreignKey: "admin_id",
  as: "adminChild",
});

db.childFilter.belongsTo(db.adminAuth, {
  foreignKey: "admin_id",
  as: "adminChild",
});

// parent relation in child
db.parentFilter.hasMany(db.childFilter, {
  foreignKey: "parent_id",
  as: "childData",
});

db.childFilter.belongsTo(db.parentFilter, {
  foreignKey: "parent_id",
  as: "childData",
});

db.sequelize.sync({ force: false }).then(() => {
  console.log("------------ Congratulation You are in Sync -------------- ");
});

module.exports = db;
