const express = require("express");
const cors = require("cors");

const app = express();

const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require('./routes/orders.routes');

app.use(orderRoutes);

app.use(express.json());

app.use(cors());

app.use([userRoutes, productRoutes]);

module.exports = app;
