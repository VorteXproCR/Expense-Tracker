import Expense from '../models/Expense.js';

/**
 * Create a new expense with idempotency support
 * POST /api/expenses
 */
export const createExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const idempotencyKey = req.idempotencyKey;

    // Check if this request was already processed
    const existingExpense = await Expense.findOne({ idempotencyKey });
    
    if (existingExpense) {
      return res.status(200).json({
        success: true,
        data: existingExpense,
        message: 'Expense already created (idempotent response)'
      });
    }

    // Validate required fields
    if (amount === undefined || amount === null || amount === '') {
      return res.status(400).json({
        success: false,
        error: 'Amount is required'
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        error: 'Category is required'
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        error: 'Date is required'
      });
    }

    // Convert amount to paisa (cents) to avoid floating point issues
    // Store as integer for precision
    const amountInPaisa = Math.round(amount * 100);

    const expense = await Expense.create({
      idempotencyKey,
      amount: amountInPaisa,
      category,
      description: description || '',
      date: new Date(date)
    });

    res.status(201).json({
      success: true,
      data: expense
    });
  } catch (error) {
    console.error('Create expense error:', error);
    
    // Handle duplicate key error (race condition)
    if (error.code === 11000) {
      const existingExpense = await Expense.findOne({ idempotencyKey: req.idempotencyKey });
      if (existingExpense) {
        return res.status(200).json({
          success: true,
          data: existingExpense,
          message: 'Expense already created (idempotent response)'
        });
      }
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create expense'
    });
  }
};

/**
 * Get all expenses with optional filtering and sorting
 * GET /api/expenses
 */
export const getExpenses = async (req, res) => {
  try {
    const { category, sort } = req.query;

    // Build query
    const query = {};
    if (category && category !== 'All') {
      query.category = category;
    }

    // Build sort option
    let sortOption = { date: -1, createdAt: -1 }; // Default: newest first by date
    if (sort === 'date_asc') {
      sortOption = { date: 1, createdAt: 1 };
    }

    const expenses = await Expense.find(query).sort(sortOption);
    
    // Calculate total in rupees (convert from paisa)
    const totalInPaisa = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const total = totalInPaisa / 100;

    res.json({
      success: true,
      data: expenses,
      total
    });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch expenses'
    });
  }
};

/**
 * Delete an expense by ID
 * DELETE /api/expenses/:id
 */
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    
    const expense = await Expense.findByIdAndDelete(id);
    
    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }

    res.json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete expense'
    });
  }
};

