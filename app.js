const express = require("express");
require("dotenv").config();
const sequelize = require("./utils/database");
const Product = require("./models/product");
const Customer = require("./models/customer");
const Invoice = require("./models/invoice");

const valid_Schema = ["guru_foods", "fashion_king"];

Customer.hasMany(Product);
Product.belongsTo(Customer);

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send(`<h1>Hello</h1>`);
});

app.post("/invoices/add/:schema", async (req, res) => {
  try {
    const { schema } = req.params;
    if (!valid_Schema.includes(schema)) {
      return res
        .status(400)
        .json({ success: false, message: "Schema not valid" });
    }

    const { customerId, productId, quantity, total } = req.body;
    const newInvoice = await Invoice.create({
      customerId,
      productId,
      quantity,
      total,
    });

    res
      .status(201)
      .json({ message: "New iNvoice created", Invoice: newInvoice });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err: err.message });
  }
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
