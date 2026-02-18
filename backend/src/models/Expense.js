import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    idempotencyKey: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true,
      enum: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other']
    },
    description: {
      type: String,
      maxlength: 500,
      default: ''
    },
    date: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Index for filtering and sorting
expenseSchema.index({ category: 1, date: -1 });
expenseSchema.index({ createdAt: -1 });

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;

