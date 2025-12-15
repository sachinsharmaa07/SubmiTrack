const express = require('express');
const router = express.Router();
const { 
  createAssignment, 
  getAllAssignments, 
  getAssignment, 
  updateAssignment, 
  deleteAssignment 
} = require('../controllers/assignmentController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize(['teacher']), createAssignment);
router.get('/', protect, getAllAssignments);
router.get('/:id', protect, getAssignment);
router.put('/:id', protect, authorize(['teacher']), updateAssignment);
router.delete('/:id', protect, authorize(['teacher']), deleteAssignment);

module.exports = router;
