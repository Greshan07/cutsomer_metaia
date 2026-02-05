const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// Create new order
router.post('/', orderController.createOrder);

// Get all orders (for current user)
router.get('/', orderController.getOrders);

// Get order history
router.get('/history', orderController.getOrderHistory);

// Get single order
router.get('/:id', orderController.getOrderById);

// Update order status
router.put('/:id/status', orderController.updateOrderStatus);

// Cancel order
router.put('/:id/cancel', orderController.cancelOrder);

// Admin/Tailor routes
router.get('/all/list', authorize('admin', 'tailor'), orderController.getAllOrders);
router.put('/:id', authorize('admin', 'tailor'), orderController.updateOrder);

module.exports = router;
