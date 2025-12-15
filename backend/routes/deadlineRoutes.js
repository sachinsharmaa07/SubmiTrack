const express = require('express');
const router = express.Router();
const { getDeadlineInfo, getAllDeadlinesInfo } = require('../controllers/deadlineController');
const { protect } = require('../middleware/auth');

router.get('/:assignmentId', protect, getDeadlineInfo);
router.get('/all/deadlines', protect, getAllDeadlinesInfo);

module.exports = router;
