const express = require('express');
const router = express.Router();
const measurementController = require('../controllers/measurementController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// Get all measurements for current user
router.get('/', measurementController.getMeasurements);

// Create new measurement
router.post('/', measurementController.createMeasurement);

// Get single measurement
router.get('/:id', measurementController.getMeasurementById);

// Update measurement
router.put('/:id', measurementController.updateMeasurement);

// Delete measurement
router.delete('/:id', measurementController.deleteMeasurement);

// Set default measurement
router.put('/:id/set-default', measurementController.setDefaultMeasurement);

module.exports = router;
