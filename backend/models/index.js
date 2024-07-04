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
db.adminAuth = require("./admin/AdminAuthModel.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("------------ Congratulation You are in Sync -------------- ");
});

module.exports = db;
