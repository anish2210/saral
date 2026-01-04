import express from 'express';
import Student from '../models/Student.js';
import PaymentRecord from '../models/PaymentRecord.js';
import { requireAuth, loadTutor, requireTutor } from '../middleware/auth.js';
import { requireActiveSubscription, checkStudentLimit } from '../middleware/subscription.js';

const router = express.Router();

// All routes require authentication and a tutor profile
router.use(requireAuth(), loadTutor, requireTutor);

// GET /api/students - List tutor's students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find({ tutorId: req.tutor._id })
      .sort({ createdAt: -1 });

    res.json({ students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// POST /api/students - Add new student
router.post('/', requireActiveSubscription, checkStudentLimit, async (req, res) => {
  try {
    const { name, phone, monthlyFee } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Student name is required' });
    }

    if (monthlyFee === undefined || monthlyFee < 0) {
      return res.status(400).json({ error: 'Valid monthly fee is required' });
    }

    const student = new Student({
      tutorId: req.tutor._id,
      name: name.trim(),
      phone: phone?.trim() || '',
      monthlyFee
    });

    await student.save();

    res.status(201).json({
      message: 'Student added successfully',
      student
    });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Failed to add student' });
  }
});

// GET /api/students/:id - Get student details
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findOne({
      _id: req.params.id,
      tutorId: req.tutor._id
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ student });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

// PUT /api/students/:id - Update student
router.put('/:id', requireActiveSubscription, async (req, res) => {
  try {
    const { name, phone, monthlyFee } = req.body;

    const student = await Student.findOne({
      _id: req.params.id,
      tutorId: req.tutor._id
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    if (name) student.name = name.trim();
    if (phone !== undefined) student.phone = phone.trim();
    if (monthlyFee !== undefined && monthlyFee >= 0) student.monthlyFee = monthlyFee;

    await student.save();

    res.json({
      message: 'Student updated successfully',
      student
    });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Failed to update student' });
  }
});

// DELETE /api/students/:id - Remove student
router.delete('/:id', requireActiveSubscription, async (req, res) => {
  try {
    const student = await Student.findOne({
      _id: req.params.id,
      tutorId: req.tutor._id
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Delete all payment records for this student
    await PaymentRecord.deleteMany({ studentId: student._id });

    // Delete the student
    await student.deleteOne();

    res.json({ message: 'Student removed successfully' });
  } catch (error) {
    console.error('Error removing student:', error);
    res.status(500).json({ error: 'Failed to remove student' });
  }
});

export default router;
