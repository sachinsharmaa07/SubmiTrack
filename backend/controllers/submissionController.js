const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');

// @route   POST /api/submissions/upload
// @desc    Upload assignment file
// @access  Private (Student only)
exports.uploadSubmission = async (req, res) => {
  try {
    const { assignmentId } = req.body;

    if (!assignmentId || !req.file) {
      return res.status(400).json({ message: 'Assignment ID and file are required' });
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Check if already submitted
    let submission = await Submission.findOne({
      assignmentId,
      studentId: req.user.id
    });

    const isLate = new Date() > assignment.deadline;

    if (submission) {
      // Update existing submission
      submission.fileUrl = `/uploads/${req.file.filename}`;
      submission.fileName = req.file.originalname;
      submission.submittedAt = Date.now();
      submission.isLate = isLate;
      submission.status = isLate ? 'late' : 'submitted';
      await submission.save();
    } else {
      // Create new submission
      submission = await Submission.create({
        assignmentId,
        studentId: req.user.id,
        fileUrl: `/uploads/${req.file.filename}`,
        fileName: req.file.originalname,
        isLate,
        status: isLate ? 'late' : 'submitted'
      });
    }

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      submission
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/submissions/:assignmentId
// @desc    Get all submissions for an assignment
// @access  Private (Teacher only)
exports.getAssignmentSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ assignmentId: req.params.assignmentId })
      .populate('studentId', 'name email')
      .populate('gradedBy', 'name');

    res.status(200).json({
      success: true,
      count: submissions.length,
      submissions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/submissions/student/:studentId
// @desc    Get student submissions
// @access  Private
exports.getStudentSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ studentId: req.params.studentId })
      .populate('assignmentId', 'title deadline maxMarks');

    res.status(200).json({
      success: true,
      count: submissions.length,
      submissions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   PUT /api/submissions/:submissionId/grade
// @desc    Grade submission
// @access  Private (Teacher only)
exports.gradeSubmission = async (req, res) => {
  try {
    const { marks, feedback } = req.body;

    if (marks === undefined || marks === null) {
      return res.status(400).json({ message: 'Marks are required' });
    }

    let submission = await Submission.findById(req.params.submissionId);

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    submission.marks = marks;
    submission.feedback = feedback;
    submission.status = 'graded';
    submission.gradedAt = Date.now();
    submission.gradedBy = req.user.id;

    await submission.save();

    res.status(200).json({
      success: true,
      message: 'Submission graded successfully',
      submission
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/submissions/:submissionId
// @desc    Get single submission
// @access  Private
exports.getSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.submissionId)
      .populate('studentId', 'name email')
      .populate('assignmentId', 'title maxMarks')
      .populate('gradedBy', 'name');

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.status(200).json({
      success: true,
      submission
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
