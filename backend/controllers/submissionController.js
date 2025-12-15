const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');

exports.uploadSubmission = async (req, res) => {
  try {
    const { assignmentId } = req.body;
    if (!assignmentId || !req.file) return res.status(400).json({ message: 'Missing fields' });

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: 'Not found' });

    let submission = await Submission.findOne({ assignmentId, studentId: req.user.id });
    const isLate = new Date() > assignment.deadline;

    if (submission) {
      submission.fileUrl = `/uploads/${req.file.filename}`;
      submission.fileName = req.file.originalname;
      submission.submittedAt = Date.now();
      submission.isLate = isLate;
      submission.status = isLate ? 'late' : 'submitted';
      await submission.save();
    } else {
      submission = await Submission.create({ assignmentId, studentId: req.user.id, fileUrl: `/uploads/${req.file.filename}`, fileName: req.file.originalname, isLate, status: isLate ? 'late' : 'submitted' });
    }

    res.status(201).json({ message: 'Uploaded', submission });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAssignmentSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ assignmentId: req.params.assignmentId }).populate('studentId', 'name email').populate('gradedBy', 'name');
    res.status(200).json({ count: submissions.length, submissions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudentSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ studentId: req.params.studentId }).populate('assignmentId', 'title deadline maxMarks');
    res.status(200).json({ count: submissions.length, submissions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.gradeSubmission = async (req, res) => {
  try {
    const { marks, feedback } = req.body;
    if (marks === undefined || marks === null) return res.status(400).json({ message: 'Marks required' });

    let submission = await Submission.findById(req.params.submissionId);
    if (!submission) return res.status(404).json({ message: 'Not found' });

    submission.marks = marks;
    submission.feedback = feedback;
    submission.status = 'graded';
    submission.gradedAt = Date.now();
    submission.gradedBy = req.user.id;
    await submission.save();

    res.status(200).json({ message: 'Graded', submission });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.submissionId).populate('studentId', 'name email').populate('assignmentId', 'title maxMarks').populate('gradedBy', 'name');
    if (!submission) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ submission });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
