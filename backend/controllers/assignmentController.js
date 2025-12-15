const Assignment = require('../models/Assignment');

// @route   POST /api/assignments
// @desc    Create new assignment (Teacher only)
// @access  Private
exports.createAssignment = async (req, res) => {
  try {
    const { title, description, subject, deadline, maxMarks, instructions } = req.body;

    if (!title || !description || !subject || !deadline) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const assignment = await Assignment.create({
      title,
      description,
      subject,
      deadline,
      maxMarks: maxMarks || 100,
      instructions,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      assignment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/assignments
// @desc    Get all assignments
// @access  Private
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ isActive: true })
      .populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      count: assignments.length,
      assignments
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/assignments/:id
// @desc    Get single assignment
// @access  Private
exports.getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.status(200).json({
      success: true,
      assignment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   PUT /api/assignments/:id
// @desc    Update assignment
// @access  Private (Teacher only)
exports.updateAssignment = async (req, res) => {
  try {
    let assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Check authorization
    if (assignment.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this assignment' });
    }

    const { title, description, subject, deadline, maxMarks, instructions, isActive } = req.body;

    assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      { title, description, subject, deadline, maxMarks, instructions, isActive, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      assignment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   DELETE /api/assignments/:id
// @desc    Delete assignment
// @access  Private (Teacher only)
exports.deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Check authorization
    if (assignment.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this assignment' });
    }

    await Assignment.findByIdAndRemove(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Assignment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
