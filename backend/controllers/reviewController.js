const Review = require('../models/Review');
const Order = require('../models/Order');

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res) => {
  try {
    const { order: orderId, rating, comment, images } = req.body;

    // Check if order exists and belongs to user
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    if (order.customer.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to review this order'
      });
    }

    // Check if order is completed
    if (order.status !== 'completed') {
      return res.status(400).json({
        status: 'error',
        message: 'Can only review completed orders'
      });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ order: orderId });
    if (existingReview) {
      return res.status(400).json({
        status: 'error',
        message: 'Review already exists for this order'
      });
    }

    const review = await Review.create({
      order: orderId,
      customer: req.user.id,
      tailor: order.tailor,
      rating,
      comment,
      images
    });

    res.status(201).json({
      status: 'success',
      message: 'Review created successfully',
      data: { review }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get user's reviews
// @route   GET /api/reviews/my-reviews
// @access  Private
exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ customer: req.user.id })
      .populate('order', 'orderNumber style')
      .populate('tailor', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: { reviews }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Private
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('order')
      .populate('customer', 'name')
      .populate('tailor', 'name');

    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { review }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found'
      });
    }

    // Check if user owns this review
    if (review.customer.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this review'
      });
    }

    const { rating, comment, images } = req.body;

    review = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, comment, images },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      message: 'Review updated successfully',
      data: { review }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found'
      });
    }

    // Check if user owns this review
    if (review.customer.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this review'
      });
    }

    await review.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
