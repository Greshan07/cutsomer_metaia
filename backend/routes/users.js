const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// Get user profile
router.get('/profile', userController.getProfile);

// Update user profile
router.put('/profile', userController.updateProfile);

// Change password
router.put('/change-password', userController.changePassword);

// Admin only routes
router.get('/', authorize('admin'), userController.getAllUsers);
router.get('/:id', authorize('admin'), userController.getUserById);
router.delete('/:id', authorize('admin'), userController.deleteUser);

module.exports = router;
