const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Men', 'Women', 'Children']
  },
  // Common measurements
  height: Number,
  weight: Number,
  
  // Upper body measurements
  chest: Number,
  waist: Number,
  shoulder: Number,
  sleeveLength: Number,
  armHole: Number,
  neck: Number,
  
  // Lower body measurements
  hip: Number,
  inseam: Number,
  outseam: Number,
  thigh: Number,
  knee: Number,
  ankle: Number,
  
  // Additional measurements
  shirtLength: Number,
  pantLength: Number,
  rise: Number,
  
  // Special measurements for ethnic wear
  kurtaLength: Number,
  ghagra: Number,
  blouseLength: Number,
  
  unit: {
    type: String,
    enum: ['cm', 'inch'],
    default: 'cm'
  },
  notes: String,
  isDefault: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Measurement', measurementSchema);
