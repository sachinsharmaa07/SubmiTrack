const express = require('express');
const router = express.Router();
const upload = require('../middleware/fileUpload');
const { 
  uploadSubmission, 
  getAssignmentSubmissions, 
  getStudentSubmissions,
  gradeSubmission,
  getSubmission
} = require('../controllers/submissionController');
const { protect, authorize } = require('../middleware/auth');

// Specific routes first
router.get('/single/:submissionId', protect, getSubmission);
router.post('/upload', protect, authorize(['student']), upload.single('file'), uploadSubmission);
router.put('/:submissionId/grade', protect, authorize(['teacher']), gradeSubmission);

// General routes after
router.get('/:assignmentId', protect, getAssignmentSubmissions);
router.get('/student/:studentId', protect, getStudentSubmissions);

module.exports = router;
