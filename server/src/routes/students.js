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
    const { name, phone, monthlyFee, startDate } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Student name is required' });
    }

    if (monthlyFee === undefined || monthlyFee < 0) {
      return res.status(400).json({ error: 'Valid monthly fee is required' });
    }

    // Determine effective month for initial fee
    const now = new Date();
    const effectiveMonth = startDate
      ? startDate.substring(0, 7) // YYYY-MM from startDate
      : `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    const student = new Student({
      tutorId: req.tutor._id,
      name: name.trim(),
      phone: phone?.trim() || '',
      monthlyFee,
      feeHistory: [{ amount: monthlyFee, effectiveFrom: effectiveMonth }],
      startDate: startDate ? new Date(startDate) : null
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
    const { name, phone, monthlyFee, startDate } = req.body;

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
    if (startDate !== undefined) student.startDate = startDate ? new Date(startDate) : null;

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

// POST /api/students/:id/fee - Update fee with effective month
router.post('/:id/fee', requireActiveSubscription, async (req, res) => {
  try {
    const { amount, effectiveFrom } = req.body;

    if (amount === undefined || amount < 0) {
      return res.status(400).json({ error: 'Valid fee amount is required' });
    }

    if (!effectiveFrom || !/^\d{4}-\d{2}$/.test(effectiveFrom)) {
      return res.status(400).json({ error: 'Valid effective month (YYYY-MM) is required' });
    }

    const student = await Student.findOne({
      _id: req.params.id,
      tutorId: req.tutor._id
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if there's already a fee change for this month
    const existingIndex = student.feeHistory.findIndex(f => f.effectiveFrom === effectiveFrom);
    if (existingIndex >= 0) {
      // Update existing entry
      student.feeHistory[existingIndex].amount = amount;
    } else {
      // Add new fee history entry
      student.feeHistory.push({ amount, effectiveFrom });
      // Sort by effectiveFrom to keep chronological order
      student.feeHistory.sort((a, b) => a.effectiveFrom.localeCompare(b.effectiveFrom));
    }

    // Update current monthlyFee to the latest fee
    const latestFee = student.feeHistory[student.feeHistory.length - 1];
    student.monthlyFee = latestFee.amount;

    await student.save();

    res.json({
      message: 'Fee updated successfully',
      student
    });
  } catch (error) {
    console.error('Error updating fee:', error);
    res.status(500).json({ error: 'Failed to update fee' });
  }
});

export default router;
