import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const studentSchema = new mongoose.Schema({
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutor',
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  monthlyFee: {
    type: Number,
    required: true,
    min: 0
  },
  startDate: {
    type: Date,
    default: null
  },
  publicToken: {
    type: String,
    unique: true,
    index: true
  }
}, {
  timestamps: true
});

// Generate public token before saving new student
studentSchema.pre('save', function(next) {
  if (this.isNew && !this.publicToken) {
    this.publicToken = nanoid(12);
  }
  next();
});

export default mongoose.model('Student', studentSchema);
