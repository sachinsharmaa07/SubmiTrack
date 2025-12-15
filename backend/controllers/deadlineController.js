const Assignment = require('../models/Assignment');
const { calculateTimeRemaining } = require('../utils/deadlineUtils');

exports.getDeadlineInfo = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment) return res.status(404).json({ message: 'Not found' });

    const deadlineInfo = calculateTimeRemaining(assignment.deadline);
    res.status(200).json({ title: assignment.title, deadline: assignment.deadline, maxMarks: assignment.maxMarks, ...deadlineInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllDeadlinesInfo = async (req, res) => {
  try {
    const assignments = await Assignment.find({ isActive: true });
    const assignmentsWithDeadlines = assignments.map(a => ({ id: a._id, title: a.title, subject: a.subject, deadline: a.deadline, maxMarks: a.maxMarks, ...calculateTimeRemaining(a.deadline) }));
    res.status(200).json({ count: assignmentsWithDeadlines.length, assignments: assignmentsWithDeadlines });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
