const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 8000;

const authRoute = require("./routes/AuthRoute");
const productRoute = require("./routes/ProductsRoute");
dotenv.config();
//middleware//
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
//middleware//

// mongodb //

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MonggoDB Successfull connection:"))
  .catch((err) => {
    console.log(err);
  });
// mongodb //

app.use("/api", authRoute);
app.use("/product", productRoute);
app.listen(port, () => {
  console.log("Server running: ", port);
});
