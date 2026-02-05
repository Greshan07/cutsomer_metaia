const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passport = require('passport');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
require('../config/passport'); // Load passport configuration
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Register new user
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], authController.register);

// Login user
router.post('/login', [
  body('phone').notEmpty().withMessage('Phone is required'),
  body('password').notEmpty().withMessage('Password is required')
], authController.login);

// Send OTP
router.post('/send-otp', [
  body('phone').notEmpty().withMessage('Phone is required')
], authController.sendOTP);

// Verify OTP
router.post('/verify-otp', [
  body('phone').notEmpty().withMessage('Phone is required'),
  body('otp').notEmpty().withMessage('OTP is required')
], authController.verifyOTP);

// Reset Password
router.post('/reset-password', [
  body('phone').notEmpty().withMessage('Phone is required'),
  body('otp').notEmpty().withMessage('OTP is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], authController.resetPassword);

// Get current user
router.get('/me', protect, authController.getMe);

// Logout
router.post('/logout', protect, authController.logout);

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: false 
  })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/?error=google_auth_failed`
  }),
  (req, res) => {
    // Generate JWT token
    const token = generateToken(req.user._id);
    
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/success?token=${token}&name=${encodeURIComponent(req.user.name)}&email=${encodeURIComponent(req.user.email)}`);
  }
);

// Apple OAuth routes
router.post('/apple',
  passport.authenticate('apple', { session: false })
);

router.post('/apple/callback',
  passport.authenticate('apple', { 
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/?error=apple_auth_failed`
  }),
  (req, res) => {
    // Generate JWT token
    const token = generateToken(req.user._id);
    
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/success?token=${token}&name=${encodeURIComponent(req.user.name)}&email=${encodeURIComponent(req.user.email)}`);
  }
);

module.exports = router;
