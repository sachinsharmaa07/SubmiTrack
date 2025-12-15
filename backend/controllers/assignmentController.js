const Assignment = require('../models/Assignment');

exports.createAssignment = async (req, res) => {
  try {
    const { title, description, subject, deadline, maxMarks, instructions } = req.body;
    if (!title || !description || !subject || !deadline) return res.status(400).json({ message: 'Missing fields' });

    const assignment = await Assignment.create({ title, description, subject, deadline, maxMarks: maxMarks || 100, instructions, createdBy: req.user.id });
    res.status(201).json({ assignment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ isActive: true }).populate('createdBy', 'name email');
    res.status(200).json({ count: assignments.length, assignments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate('createdBy', 'name email');
    if (!assignment) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ assignment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    let assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Not found' });
    if (assignment.createdBy.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    const { title, description, subject, deadline, maxMarks, instructions, isActive } = req.body;
    assignment = await Assignment.findByIdAndUpdate(req.params.id, { title, description, subject, deadline, maxMarks, instructions, isActive, updatedAt: Date.now() }, { new: true });
    res.status(200).json({ assignment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Not found' });
    if (assignment.createdBy.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await Assignment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
