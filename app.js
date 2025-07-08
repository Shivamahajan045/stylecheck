const express = require("express");
require("dotenv").config();
const sequelize = require("./utils/database");
const Product = require("./models/product");
const Customer = require("./models/customer");
const Invoice = require("./models/invoice");

Customer.hasMany(Product);
Product.belongsTo(Customer);

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send(`<h1>Hello</h1>`);
});

app.use(express.json());
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DATABASE CONNECTED...");

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });
