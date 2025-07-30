const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const auth = require("../middlewares/auth.middlewares");
const isAdmin = require("../middlewares/admin.middleware");



router.post("/products", [auth, isAdmin], productController.createProduct);

module.exports = router;