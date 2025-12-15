const Assignment = require('../models/Assignment');
const { calculateTimeRemaining } = require('../utils/deadlineUtils');

// @route   GET /api/deadline/:assignmentId
// @desc    Get deadline info with countdown
// @access  Private
exports.getDeadlineInfo = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    const deadlineInfo = calculateTimeRemaining(assignment.deadline);

    res.status(200).json({
      success: true,
      title: assignment.title,
      deadline: assignment.deadline,
      maxMarks: assignment.maxMarks,
      ...deadlineInfo
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/deadline/all
// @desc    Get all assignments with deadline info
// @access  Private
exports.getAllDeadlinesInfo = async (req, res) => {
  try {
    const assignments = await Assignment.find({ isActive: true });

    const assignmentsWithDeadlines = assignments.map(assignment => ({
      id: assignment._id,
      title: assignment.title,
      subject: assignment.subject,
      deadline: assignment.deadline,
      maxMarks: assignment.maxMarks,
      ...calculateTimeRemaining(assignment.deadline)
    }));

    res.status(200).json({
      success: true,
      count: assignmentsWithDeadlines.length,
      assignments: assignmentsWithDeadlines
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
