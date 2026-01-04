import express from 'express';
import Student from '../models/Student.js';
import PaymentRecord from '../models/PaymentRecord.js';
import { requireAuth, loadTutor, requireTutor } from '../middleware/auth.js';
import { requireActiveSubscription } from '../middleware/subscription.js';

const router = express.Router();

// All routes require authentication and a tutor profile
router.use(requireAuth(), loadTutor, requireTutor);

// GET /api/students/:studentId/payments - Get payment history for a student
router.get('/students/:studentId/payments', async (req, res) => {
  try {
    const student = await Student.findOne({
      _id: req.params.studentId,
      tutorId: req.tutor._id
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const payments = await PaymentRecord.find({ studentId: student._id })
      .sort({ month: -1 });

    res.json({ payments });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

// POST /api/students/:studentId/payments - Create or update payment for a month
router.post('/students/:studentId/payments', requireActiveSubscription, async (req, res) => {
  try {
    const { month, amount, status, method } = req.body;

    // Validate month format (YYYY-MM)
    if (!month || !/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) {
      return res.status(400).json({ error: 'Invalid month format. Use YYYY-MM' });
    }

    const student = await Student.findOne({
      _id: req.params.studentId,
      tutorId: req.tutor._id
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if payment record already exists for this month
    let payment = await PaymentRecord.findOne({
      studentId: student._id,
      month
    });

    if (payment) {
      // Update existing payment
      if (status) payment.status = status;
      if (method) payment.method = method;
      if (amount !== undefined) payment.amount = amount;
    } else {
      // Create new payment record
      payment = new PaymentRecord({
        studentId: student._id,
        month,
        amount: amount !== undefined ? amount : student.monthlyFee,
        status: status || 'Pending',
        method: method || undefined
      });
    }

    await payment.save();

    res.status(payment.isNew ? 201 : 200).json({
      message: payment.isNew ? 'Payment record created' : 'Payment record updated',
      payment
    });
  } catch (error) {
    console.error('Error saving payment:', error);
    res.status(500).json({ error: 'Failed to save payment' });
  }
});

// PUT /api/payments/:id - Update a specific payment record
router.put('/payments/:id', requireActiveSubscription, async (req, res) => {
  try {
    const { status, method, amount } = req.body;

    const payment = await PaymentRecord.findById(req.params.id).populate('studentId');

    if (!payment) {
      return res.status(404).json({ error: 'Payment record not found' });
    }

    // Verify this payment belongs to a student owned by this tutor
    const student = await Student.findOne({
      _id: payment.studentId,
      tutorId: req.tutor._id
    });

    if (!student) {
      return res.status(404).json({ error: 'Payment record not found' });
    }

    if (status) payment.status = status;
    if (method) payment.method = method;
    if (amount !== undefined) payment.amount = amount;

    await payment.save();

    res.json({
      message: 'Payment updated successfully',
      payment
    });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ error: 'Failed to update payment' });
  }
});

export default router;
