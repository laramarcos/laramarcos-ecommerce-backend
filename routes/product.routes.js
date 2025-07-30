const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const auth = require("../middlewares/auth.middlewares");
const isAdmin = require("../middlewares/admin.middleware");
const upload = require ("../middlewares/upload");


router.post("/products", [upload], productController.createProduct);

router.get("/products", productController.getProducts);

module.exports = router;