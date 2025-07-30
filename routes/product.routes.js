const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const upload = require("../middlewares/upload");

// GET todos los productos
router.get("/products", productController.getProducts);

// GET un producto por ID
router.get("/products/:id", productController.getProductById);

// POST crear producto
router.post("/products", upload, productController.createProduct);

// PUT actualizar producto
router.put("/products/:id", upload, productController.updateProductById);

// DELETE producto
router.delete("/products/:id", productController.deleteProductById);

module.exports = router;
