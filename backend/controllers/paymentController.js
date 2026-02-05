const Payment = require('../models/Payment');
const Order = require('../models/Order');

// Process payment
exports.processPayment = async (req, res) => {
  try {
    const {
      orderId,
      paymentMethod,
      amount,
      paymentDetails
    } = req.body;

    // Validate order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Validate user owns the order
    if (order.customer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Create payment record
    const payment = new Payment({
      orderId,
      userId: req.user.id,
      paymentMethod,
      amount,
      paymentDetails,
      status: paymentMethod === 'cod' ? 'pending' : 'processing',
      transactionId: 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase()
    });

    await payment.save();

    // Simulate payment processing for online methods
    if (paymentMethod !== 'cod') {
      // In production, integrate with actual payment gateway
      setTimeout(async () => {
        payment.status = 'success';
        payment.paidAt = Date.now();
        await payment.save();

        // Update order payment status
        order.paymentStatus = 'paid';
        await order.save();
      }, 2000);
    }

    res.status(201).json({
      message: 'Payment initiated successfully',
      payment: {
        id: payment._id,
        transactionId: payment.transactionId,
        status: payment.status,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get payment by ID
exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('orderId', 'orderNumber totalAmount')
      .populate('userId', 'name email phone');

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Validate user owns the payment
    if (payment.userId._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get payments by order
exports.getPaymentsByOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Validate user owns the order
    if (order.customer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const payments = await Payment.find({ orderId: req.params.orderId })
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's payment history
exports.getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id })
      .populate('orderId', 'orderNumber totalAmount status')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Verify payment status (for checking payment gateway callbacks)
exports.verifyPayment = async (req, res) => {
  try {
    const { transactionId, gatewayResponse } = req.body;

    const payment = await Payment.findOne({ transactionId });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // In production, verify with actual payment gateway
    // For now, simulate verification
    if (gatewayResponse && gatewayResponse.status === 'success') {
      payment.status = 'success';
      payment.paidAt = Date.now();
      payment.gatewayResponse = gatewayResponse;
      await payment.save();

      // Update order payment status
      const order = await Order.findById(payment.orderId);
      if (order) {
        order.paymentStatus = 'paid';
        order.paymentMethod = payment.paymentMethod;
        order.transactionId = payment.transactionId;
        await order.save();
      }

      res.json({ 
        message: 'Payment verified successfully', 
        status: 'success',
        payment 
      });
    } else {
      payment.status = 'failed';
      payment.gatewayResponse = gatewayResponse;
      await payment.save();

      res.json({ 
        message: 'Payment verification failed', 
        status: 'failed',
        payment 
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Refund payment
exports.refundPayment = async (req, res) => {
  try {
    const { reason } = req.body;
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Validate user owns the payment
    if (payment.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (payment.status !== 'success') {
      return res.status(400).json({ message: 'Only successful payments can be refunded' });
    }

    if (payment.refundStatus === 'refunded') {
      return res.status(400).json({ message: 'Payment already refunded' });
    }

    // In production, process actual refund through payment gateway
    payment.refundStatus = 'processing';
    payment.refundReason = reason;
    payment.refundInitiatedAt = Date.now();
    await payment.save();

    // Simulate refund processing
    setTimeout(async () => {
      payment.refundStatus = 'refunded';
      payment.refundedAt = Date.now();
      await payment.save();

      // Update order payment status
      const order = await Order.findById(payment.orderId);
      if (order) {
        order.paymentStatus = 'refunded';
        await order.save();
      }
    }, 3000);

    res.json({ 
      message: 'Refund initiated successfully', 
      payment 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
