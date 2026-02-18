import { useState, useEffect, useCallback } from 'react';
import { getExpenses, createExpense, deleteExpense } from '../services/api';

const CATEGORIES = ['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('date_desc');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const filters = {
        category: categoryFilter,
        sort: sortOrder
      };
      
      const result = await getExpenses(filters);
      setExpenses(result.data);
      setTotal(result.total);
    } catch (err) {
      setError(err.message);
      setExpenses([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [categoryFilter, sortOrder]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const addExpense = async (expenseData) => {
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);
    
    try {
      const result = await createExpense(expenseData);
      setSubmitSuccess('Expense added successfully!');
      
      setTimeout(() => setSubmitSuccess(null), 3000);
      
      await fetchExpenses();
      
      return result.data;
    } catch (err) {
      setSubmitError(err.message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const removeExpense = async (id) => {
    try {
      await deleteExpense(id);
      await fetchExpenses();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  const updateSortOrder = (order) => {
    setSortOrder(order);
  };

  return {
    expenses,
    total,
    loading,
    error,
    categoryFilter,
    sortOrder,
    categories: CATEGORIES,
    submitting,
    submitError,
    submitSuccess,
    addExpense,
    removeExpense,
    updateCategoryFilter,
    updateSortOrder,
    refreshExpenses: fetchExpenses
  };
};

