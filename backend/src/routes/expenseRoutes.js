import express from 'express';
import { createExpense, getExpenses, deleteExpense } from '../controllers/expenseController.js';
import { checkIdempotency } from '../middleware/idempotency.js';

const router = express.Router();

// POST /api/expenses - Create a new expense (with idempotency)
router.post('/', checkIdempotency, createExpense);

// GET /api/expenses - Get all expenses with optional filtering/sorting
router.get('/', getExpenses);

// DELETE /api/expenses/:id - Delete an expense
router.delete('/:id', deleteExpense);

export default router;

