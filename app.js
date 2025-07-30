// const express = require("express");
// const cors = require("cors");

// const app = express();

// const userRoutes = require("./routes/user.routes");
// const productRoutes = require("./routes/product.routes");
// const orderRoutes = require('./routes/orders.routes');

// app.use(orderRoutes);

// app.use(express.json());

// app.use(cors());

// app.use("/uploads", express.static("uploads"));

// app.use([userRoutes, productRoutes]);

// module.exports = app;

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Servir archivos estáticos desde subcarpetas (¡CRUCIAL!)
app.use("/uploads/products", express.static(path.join(__dirname, "uploads/products")));
app.use("/uploads/users", express.static(path.join(__dirname, "uploads/users")));



// Rutas
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require('./routes/orders.routes');
app.use([userRoutes, productRoutes, orderRoutes]);

module.exports = app;
