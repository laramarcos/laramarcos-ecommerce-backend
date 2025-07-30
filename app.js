const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();


app.use(express.json());
app.use(cors());


app.use("/uploads/products", express.static(path.join(__dirname, "uploads/products")));
app.use("/uploads/users", express.static(path.join(__dirname, "uploads/users")));


const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require('./routes/orders.routes');
app.use([userRoutes, productRoutes, orderRoutes]);

module.exports = app;
