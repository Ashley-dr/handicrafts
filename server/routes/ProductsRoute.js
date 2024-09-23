const express = require("express");
const dotenv = require("dotenv");
const Products = require("../model/Products");
const router = express.Router();
dotenv.config();

router.post("/add-products", async (req, res) => {
  try {
    const { productName, productImage, productCategory, price, stock } =
      req.body;
    const products = new Products({
      productName,
      productImage,
      productCategory,
      price,
      stock,
    });
    const newProduct = await products.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
