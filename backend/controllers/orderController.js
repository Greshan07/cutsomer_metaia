const Order = require('../models/Order');
const User = require('../models/User');
const Notification = require('../models/Notification');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    // Validate pricing is locked
    if (!req.body.pricingBreakdown || !req.body.pricingBreakdown.priceLocked) {
      return res.status(400).json({
        status: 'error',
        message: 'Order cannot be placed without locked pricing'
      });
    }

    // Validate payment is completed (100% upfront)
    if (!req.body.paymentStatus || req.body.paymentStatus !== 'completed') {
      return res.status(400).json({
        status: 'error',
        message: 'Full payment is required before order placement'
      });
    }

    const orderData = {
      ...req.body,
      customer: req.user.id
    };

    const order = await Order.create(orderData);

    // Update user's total orders
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { totalOrders: 1 }
    });

    // Create notification
    await Notification.create({
      user: req.user.id,
      type: 'order',
      title: 'Order Placed Successfully',
      message: `Your order ${order.orderNumber} has been placed successfully with locked price of ₹${order.pricingBreakdown.finalTotal}.`,
      relatedOrder: order._id
    });

    res.status(201).json({
      status: 'success',
      message: 'Order created successfully with locked pricing',
      data: { order }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get orders for current user
// @route   GET /api/orders
// @access  Private
exports.getOrders = async (req, res) => {
  try {
    const { status } = req.query;
    
    let filter = { customer: req.user.id };
    if (status) {
      filter.status = status;
    }

    const orders = await Order.find(filter)
      .populate('measurements')
      .populate('tailor', 'name phone')
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

// @desc    Get order history
// @route   GET /api/orders/history
// @access  Private
exports.getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user.id,
      status: { $in: ['completed', 'cancelled'] }
    })
      .populate('measurements')
      .populate('tailor', 'name phone')
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

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'name phone email')
      .populate('measurements')
      .populate('tailor', 'name phone');

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    // Check if user is authorized to view this order
    if (order.customer._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to view this order'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { order }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, note } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    // PREVENT PRICE CHANGES AFTER PAYMENT
    if (order.pricingBreakdown && order.pricingBreakdown.priceLocked) {
      // Check if trying to modify price fields
      const priceFields = ['estimatedPrice', 'finalPrice', 'pricingBreakdown'];
      const attemptedPriceChange = priceFields.some(field => req.body[field] !== undefined);
      
      if (attemptedPriceChange) {
        return res.status(403).json({
          status: 'error',
          message: 'Price is locked and cannot be modified after payment. Original locked price: ₹' + order.pricingBreakdown.finalTotal
        });
      }
    }

    // Update status
    order.status = status;
    order.statusHistory.push({
      status,
      date: new Date(),
      note
    });

    await order.save();

    // Create notification
    await Notification.create({
      user: order.customer,
      type: 'order',
      title: 'Order Status Updated',
      message: `Your order ${order.orderNumber} status has been updated to ${status}.`,
      relatedOrder: order._id
    });

    res.status(200).json({
      status: 'success',
      message: 'Order status updated successfully',
      data: { order }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    // Check if user owns the order
    if (order.customer.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to cancel this order'
      });
    }

    // Check if order can be cancelled
    if (order.status === 'completed' || order.status === 'cancelled') {
      return res.status(400).json({
        status: 'error',
        message: 'This order cannot be cancelled'
      });
    }

    order.status = 'cancelled';
    order.statusHistory.push({
      status: 'cancelled',
      date: new Date(),
      note: req.body.reason || 'Cancelled by customer'
    });

    await order.save();

    res.status(200).json({
      status: 'success',
      message: 'Order cancelled successfully',
      data: { order }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get all orders (Admin/Tailor)
// @route   GET /api/orders/all/list
// @access  Private/Admin/Tailor
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('customer', 'name phone')
      .populate('tailor', 'name phone')
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

// @desc    Update order (Admin/Tailor)
// @route   PUT /api/orders/:id
// @access  Private/Admin/Tailor
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Order updated successfully',
      data: { order }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
