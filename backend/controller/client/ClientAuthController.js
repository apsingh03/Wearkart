const db = require("../../models/");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// Tables
const ClientAuth = db.clientAuth;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const clientSignUp = async (req, res) => {
  try {
    // console.log("User Req.body - ", req.body);
    const emailExistQuery = await ClientAuth.findOne({
      where: { email: req.body.email },
    });

    if (emailExistQuery) {
      if (emailExistQuery.email === req.body.email) {
        return res.status(200).send({ msg: "Email Already Exist" });
      }
    } else {
      const saltRounds = 10;

      bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
        const query = await ClientAuth.create({
          fullName: req.body.fullName,
          email: req.body.email,
          password: hash,
          createdAt: Date.now(),
        });

        return res.status(200).send({ msg: "Sign Up Successful" });
      });
    }
  } catch (error) {
    // console.log("createUser Error - ", error);
    return res.status(500).send({ error: error.message });
  }
};

const clientLogIn = async (req, res) => {
  try {
    // console.log("Req - " , req.body)
    const emailExistQuery = await ClientAuth.findOne({
      where: { email: req.body.email },
    });

    if (emailExistQuery) {
      bcrypt.compare(
        req.body.password,
        emailExistQuery.password,
        function (err, result) {
          if (err) {
            return res.status(500).send({ msg: "Something went wrong" });
          }

          if (result) {
            const { id, fullName, email } = emailExistQuery;
            const userObject = {
              isUserLogged: true,
              id,
              fullName,
              email,
            };

            var token = jwt.sign(userObject, "itsASecretKey");

            return res
              .status(200)
              .send({ msg: "Logged In Successfull", token, userObject });
          } else {
            return res.status(200).send({ msg: "Password Wrong" });
          }
        }
      );
    } else {
      return res.status(200).send({ msg: "Incorrect Email" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  clientSignUp,
  clientLogIn,
};
