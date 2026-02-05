const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'wallet', 'netbanking', 'cod'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'success', 'failed', 'cancelled'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    required: true
  },
  paymentDetails: {
    // For card payments
    last4: String,
    cardName: String,
    // For UPI
    upiId: String,
    // For wallet
    wallet: String,
    // For netbanking
    bank: String,
    // For COD
    type: String
  },
  gatewayResponse: {
    type: mongoose.Schema.Types.Mixed
  },
  paidAt: {
    type: Date
  },
  refundStatus: {
    type: String,
    enum: ['none', 'processing', 'refunded', 'failed'],
    default: 'none'
  },
  refundReason: String,
  refundInitiatedAt: Date,
  refundedAt: Date,
  refundAmount: Number
}, {
  timestamps: true
});

// Index for faster queries
paymentSchema.index({ userId: 1, createdAt: -1 });
paymentSchema.index({ orderId: 1 });
paymentSchema.index({ transactionId: 1 }, { unique: true });
paymentSchema.index({ status: 1 });

module.exports = mongoose.model('Payment', paymentSchema);
