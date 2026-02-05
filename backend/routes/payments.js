const express = require('express');
const router = express.Router();
const {
  processPayment,
  getPayment,
  getPaymentsByOrder,
  getUserPayments,
  verifyPayment,
  refundPayment
} = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

// @route   POST /api/payments
// @desc    Process a payment
// @access  Private
router.post('/', protect, processPayment);

// @route   GET /api/payments/user
// @desc    Get user's payment history
// @access  Private
router.get('/user', protect, getUserPayments);

// @route   GET /api/payments/:id
// @desc    Get payment by ID
// @access  Private
router.get('/:id', protect, getPayment);

// @route   GET /api/payments/order/:orderId
// @desc    Get payments by order
// @access  Private
router.get('/order/:orderId', protect, getPaymentsByOrder);

// @route   POST /api/payments/verify
// @desc    Verify payment status
// @access  Private
router.post('/verify', protect, verifyPayment);

// @route   POST /api/payments/:id/refund
// @desc    Refund a payment
// @access  Private
router.post('/:id/refund', protect, refundPayment);

module.exports = router;
