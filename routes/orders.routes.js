const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const auth = require('../middlewares/auth.middlewares');

router.post('/orders', auth, orderController.createOrder);
router.get('/orders', auth, orderController.getAllOrders);

module.exports = router;
