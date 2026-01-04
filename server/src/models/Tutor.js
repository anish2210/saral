import mongoose from 'mongoose';

const tutorSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
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
  planType: {
    type: String,
    enum: ['trial', 'solo', 'pro', 'institute'],
    default: 'trial'
  },
  studentLimit: {
    type: Number,
    default: 25
  },
  subscriptionStatus: {
    type: String,
    enum: ['trial', 'active', 'grace', 'locked'],
    default: 'trial'
  },
  trialExpiry: {
    type: Date
  },
  planExpiry: {
    type: Date
  }
}, {
  timestamps: true
});

// Set default trial expiry (14 days) before saving new tutor
tutorSchema.pre('save', function(next) {
  if (this.isNew && !this.trialExpiry) {
    this.trialExpiry = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  }
  next();
});

// Helper to check if tutor can add students
tutorSchema.methods.canAddStudent = async function() {
  const Student = mongoose.model('Student');
  const count = await Student.countDocuments({ tutorId: this._id });
  return count < this.studentLimit;
};

// Helper to check if tutor can perform write operations
tutorSchema.methods.canWrite = function() {
  return this.subscriptionStatus !== 'locked';
};

export default mongoose.model('Tutor', tutorSchema);
