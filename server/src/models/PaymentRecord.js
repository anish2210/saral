import mongoose from 'mongoose';

const paymentRecordSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
    index: true
  },
  month: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{4}-(0[1-9]|1[0-2])$/.test(v);
      },
      message: props => `${props.value} is not a valid month format (YYYY-MM)`
    }
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid'],
    default: 'Pending'
  },
  method: {
    type: String,
    enum: ['Cash', 'UPI'],
    required: function() {
      return this.status === 'Paid';
    }
  },
  markedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Compound index to ensure one record per student per month
paymentRecordSchema.index({ studentId: 1, month: 1 }, { unique: true });

// Set markedAt when status changes to Paid
paymentRecordSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'Paid' && !this.markedAt) {
    this.markedAt = new Date();
  }
  next();
});

export default mongoose.model('PaymentRecord', paymentRecordSchema);
