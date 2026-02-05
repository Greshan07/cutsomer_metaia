const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { sendOTPEmail, sendWelcomeEmail } = require('../utils/email');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }

    const { name, email, phone, password, role } = req.body;

    // Check if user exists
    const existingUserByPhone = await User.findOne({ phone });
    if (existingUserByPhone) {
      return res.status(400).json({
        status: 'error',
        message: 'Mobile number already registered. Please login instead.'
      });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({
        status: 'error',
        message: 'Email already registered. Please login instead.'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: role || 'customer'
    });

    // Generate token
    const token = generateToken(user._id);

    // Send welcome email (don't wait)
    sendWelcomeEmail(user.email, user.name).catch(err => 
      console.log('Failed to send welcome email:', err.message)
    );

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }

    const { phone, password } = req.body;

    // Find user by phone or email and include password
    const user = await User.findOne({ 
      $or: [{ phone }, { email: phone }] 
    }).select('+password');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Account not registered. Please sign up first.'
      });
    }

    if (!(await user.comparePassword(password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect password. Please try again.'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Send OTP
// @route   POST /api/auth/send-otp
// @access  Public
exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = { code: otp, expiresAt };
    await user.save();

    // Send OTP via email
    try {
      await sendOTPEmail(user.email, otp, user.name);
      console.log(`✅ OTP sent to ${user.email}: ${otp}`);
    } catch (emailError) {
      console.log('📧 Email failed, OTP:', otp);
    }

    res.status(200).json({
      status: 'success',
      message: `OTP sent to ${user.email}`,
      // Remove in production - for development only
      debug: process.env.NODE_ENV === 'development' ? { otp } : undefined
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    const { phone, otp, newPassword } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Verify OTP
    if (!user.otp || !user.otp.code) {
      return res.status(400).json({
        status: 'error',
        message: 'No OTP found. Please request a new one.'
      });
    }

    if (user.otp.code !== otp) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid OTP'
      });
    }

    if (new Date() > user.otp.expiresAt) {
      return res.status(400).json({
        status: 'error',
        message: 'OTP has expired. Please request a new one.'
      });
    }

    // Update password
    user.password = newPassword;
    user.otp = undefined;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password reset successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Check OTP
    if (!user.otp || user.otp.code !== otp) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid OTP'
      });
    }

    // Check expiration
    if (new Date() > user.otp.expiresAt) {
      return res.status(400).json({
        status: 'error',
        message: 'OTP expired'
      });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      status: 'success',
      message: 'OTP verified successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          phone: user.phone
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  try {
    // In a real application, you might want to blacklist the token
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
