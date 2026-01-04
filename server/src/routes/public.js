import express from 'express';
import Student from '../models/Student.js';
import PaymentRecord from '../models/PaymentRecord.js';
import Tutor from '../models/Tutor.js';

const router = express.Router();

// GET /api/public/:publicToken - Get student payment view (no auth required)
router.get('/:publicToken', async (req, res) => {
  try {
    const student = await Student.findOne({
      publicToken: req.params.publicToken
    });

    if (!student) {
      return res.status(404).json({ error: 'Not found' });
    }

    const tutor = await Tutor.findById(student.tutorId);

    if (!tutor) {
      return res.status(404).json({ error: 'Not found' });
    }

    // Get payment records sorted by month descending
    const payments = await PaymentRecord.find({ studentId: student._id })
      .select('month amount status method markedAt')
      .sort({ month: -1 });

    res.json({
      tutorName: tutor.name,
      studentName: student.name,
      monthlyFee: student.monthlyFee,
      payments: payments.map(p => ({
        month: p.month,
        amount: p.amount,
        status: p.status,
        method: p.method,
        markedAt: p.markedAt
      })),
      disclaimer: 'Payment status is updated by the tutor. This platform does not process or verify payments.'
    });
  } catch (error) {
    console.error('Error fetching public payment view:', error);
    res.status(500).json({ error: 'Failed to fetch payment information' });
  }
});

export default router;
