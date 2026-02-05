const User = require('../models/User');
const Order = require('../models/Order');
const Review = require('../models/Review');

// @desc    Get all tailors
// @route   GET /api/tailors
// @access  Public
exports.getAllTailors = async (req, res) => {
  try {
    const tailors = await User.find({ role: 'tailor', isActive: true })
      .select('-password');

    res.status(200).json({
      status: 'success',
      results: tailors.length,
      data: { tailors }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get tailor by ID
// @route   GET /api/tailors/:id
// @access  Public
exports.getTailorById = async (req, res) => {
  try {
    const tailor = await User.findOne({
      _id: req.params.id,
      role: 'tailor'
    }).select('-password');

    if (!tailor) {
      return res.status(404).json({
        status: 'error',
        message: 'Tailor not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { tailor }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get tailor's orders
// @route   GET /api/tailors/:id/orders
// @access  Private
exports.getTailorOrders = async (req, res) => {
  try {
    const orders = await Order.find({ tailor: req.params.id })
      .populate('customer', 'name phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: orders.length,
      data: { orders }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get tailor's reviews
// @route   GET /api/tailors/:id/reviews
// @access  Private
exports.getTailorReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ tailor: req.params.id })
      .populate('customer', 'name')
      .populate('order', 'orderNumber')
      .sort({ createdAt: -1 });

    // Calculate average rating
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: {
        reviews,
        averageRating: avgRating.toFixed(1)
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
