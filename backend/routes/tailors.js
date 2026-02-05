const express = require('express');
const router = express.Router();
const tailorController = require('../controllers/tailorController');
const { protect } = require('../middleware/auth');

// Get all tailors (public)
router.get('/', tailorController.getAllTailors);

// Get tailor by id (public)
router.get('/:id', tailorController.getTailorById);

// Protected routes
router.use(protect);

// Get tailor's orders
router.get('/:id/orders', tailorController.getTailorOrders);

// Get tailor's reviews
router.get('/:id/reviews', tailorController.getTailorReviews);

module.exports = router;
