const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

// Protected routes
router.use(protect);

// Create review
router.post('/', reviewController.createReview);

// Get user's reviews
router.get('/my-reviews', reviewController.getMyReviews);

// Get single review
router.get('/:id', reviewController.getReviewById);

// Update review
router.put('/:id', reviewController.updateReview);

// Delete review
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
