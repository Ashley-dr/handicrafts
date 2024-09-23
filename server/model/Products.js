const mongoose = require("mongoose");

const Products = new mongoose.Schema({
  sellerId: { type: String },
  sellerName: { type: String },
  sellerEmail: { type: String },
  sellerContactNumber: { type: Number },
  productDescription: { type: String },
  productName: { type: String },
  productImage: { type: String },
  productCategory: { type: String },
  price: { type: Number },
  stock: { type: Number },
  isApproved: { type: Boolean, default: false },
});

module.exports = mongoose.model("Products", Products);
