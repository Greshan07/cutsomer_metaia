const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tailor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: String,
    required: true,
    enum: ['Men', 'Women', 'Children']
  },
  style: {
    type: String,
    required: true
  },
  fabric: {
    type: String,
    required: true
  },
  color: String,
  measurements: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Measurement',
    required: true
  },
  designPreferences: {
    neckStyle: String,
    sleeveStyle: String,
    collarType: String,
    pocketStyle: String,
    additionalDetails: String
  },
  images: [{
    url: String,
    type: String // 'reference', 'design', 'fabric'
  }],
  estimatedPrice: {
    type: Number,
    required: true
  },
  finalPrice: Number,
  pricingBreakdown: {
    tailorBasePrice: Number,
    customizationCharges: Number,
    subtotal: Number,
    platformFee: Number,
    gst: Number,
    finalTotal: Number,
    priceLocked: {
      type: Boolean,
      default: false
    },
    lockedAt: Date
  },
  paymentCompletedAt: Date,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'ready-for-fitting', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'paid', 'refunded', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'wallet', 'netbanking', 'cod', 'none'],
    default: 'none'
  },
  transactionId: String,
  deliveryDate: {
    type: Date,
    required: true
  },
  specialInstructions: String,
  statusHistory: [{
    status: String,
    date: Date,
    note: String
  }]
}, {
  timestamps: true
});

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.orderNumber = `MET${year}${month}${random}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
