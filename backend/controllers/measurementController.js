const Measurement = require('../models/Measurement');

// @desc    Get all measurements for current user
// @route   GET /api/measurements
// @access  Private
exports.getMeasurements = async (req, res) => {
  try {
    const measurements = await Measurement.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: measurements.length,
      data: { measurements }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Create new measurement
// @route   POST /api/measurements
// @access  Private
exports.createMeasurement = async (req, res) => {
  try {
    const measurementData = {
      ...req.body,
      user: req.user.id
    };

    // If this is set as default, unset other defaults
    if (req.body.isDefault) {
      await Measurement.updateMany(
        { user: req.user.id },
        { isDefault: false }
      );
    }

    const measurement = await Measurement.create(measurementData);

    res.status(201).json({
      status: 'success',
      message: 'Measurement created successfully',
      data: { measurement }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get single measurement
// @route   GET /api/measurements/:id
// @access  Private
exports.getMeasurementById = async (req, res) => {
  try {
    const measurement = await Measurement.findById(req.params.id);

    if (!measurement) {
      return res.status(404).json({
        status: 'error',
        message: 'Measurement not found'
      });
    }

    // Check if user owns this measurement
    if (measurement.user.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to access this measurement'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { measurement }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update measurement
// @route   PUT /api/measurements/:id
// @access  Private
exports.updateMeasurement = async (req, res) => {
  try {
    let measurement = await Measurement.findById(req.params.id);

    if (!measurement) {
      return res.status(404).json({
        status: 'error',
        message: 'Measurement not found'
      });
    }

    // Check if user owns this measurement
    if (measurement.user.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this measurement'
      });
    }

    // If setting as default, unset other defaults
    if (req.body.isDefault) {
      await Measurement.updateMany(
        { user: req.user.id, _id: { $ne: req.params.id } },
        { isDefault: false }
      );
    }

    measurement = await Measurement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      message: 'Measurement updated successfully',
      data: { measurement }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Delete measurement
// @route   DELETE /api/measurements/:id
// @access  Private
exports.deleteMeasurement = async (req, res) => {
  try {
    const measurement = await Measurement.findById(req.params.id);

    if (!measurement) {
      return res.status(404).json({
        status: 'error',
        message: 'Measurement not found'
      });
    }

    // Check if user owns this measurement
    if (measurement.user.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this measurement'
      });
    }

    await measurement.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Measurement deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Set default measurement
// @route   PUT /api/measurements/:id/set-default
// @access  Private
exports.setDefaultMeasurement = async (req, res) => {
  try {
    const measurement = await Measurement.findById(req.params.id);

    if (!measurement) {
      return res.status(404).json({
        status: 'error',
        message: 'Measurement not found'
      });
    }

    // Check if user owns this measurement
    if (measurement.user.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to modify this measurement'
      });
    }

    // Unset all other defaults
    await Measurement.updateMany(
      { user: req.user.id },
      { isDefault: false }
    );

    // Set this as default
    measurement.isDefault = true;
    await measurement.save();

    res.status(200).json({
      status: 'success',
      message: 'Default measurement updated successfully',
      data: { measurement }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
