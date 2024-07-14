require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.CORS_FRONTEND_ORIGIN,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Using body-parser
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

const clientRoutes = require("./routes/client");
const adminRoutes = require("./routes/admin");

app.use("/client", clientRoutes);
app.use("/admin", adminRoutes);

app.use("/", function (req, res) {
  try {
    return res.status(200).send("Welcome to Clothing Ecommerce ");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
