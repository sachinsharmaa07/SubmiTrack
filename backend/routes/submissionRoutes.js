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

router.post('/upload', protect, authorize(['student']), upload.single('file'), uploadSubmission);
router.get('/:assignmentId', protect, authorize(['teacher']), getAssignmentSubmissions);
router.get('/student/:studentId', protect, getStudentSubmissions);
router.get('/single/:submissionId', protect, getSubmission);
router.put('/:submissionId/grade', protect, authorize(['teacher']), gradeSubmission);

module.exports = router;
