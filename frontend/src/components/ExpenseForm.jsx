import { useState } from 'react';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];

const ExpenseForm = ({ onSubmit, submitting, submitError, submitSuccess }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [validationErrors, setValidationErrors] = useState({});

  const validate = () => {
    const errors = {};
    
    if (!formData.amount || formData.amount <= 0) {
      errors.amount = 'Amount must be a positive number';
    }
    
    if (!formData.category) {
      errors.category = 'Please select a category';
    }
    
    if (!formData.date) {
      errors.date = 'Please select a date';
    }
    
    if (formData.description && formData.description.length > 500) {
      errors.description = 'Description must be less than 500 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    

    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    try {
      await onSubmit({
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description,
        date: formData.date
      });
      
      setFormData({
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (err) {
    }
  };

  return (
    <div className="expense-form-container">
      <h2>Add New Expense</h2>
      
      {submitSuccess && (
        <div className="success-message">{submitSuccess}</div>
      )}
      
      {submitError && (
        <div className="error-message">{submitError}</div>
      )}
      
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="amount">Amount (₹) *</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className={validationErrors.amount ? 'error' : ''}
          />
          {validationErrors.amount && (
            <span className="field-error">{validationErrors.amount}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={validationErrors.category ? 'error' : ''}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {validationErrors.category && (
            <span className="field-error">{validationErrors.category}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What was this expense for?"
            maxLength={500}
            className={validationErrors.description ? 'error' : ''}
          />
          {validationErrors.description && (
            <span className="field-error">{validationErrors.description}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={validationErrors.date ? 'error' : ''}
          />
          {validationErrors.date && (
            <span className="field-error">{validationErrors.date}</span>
          )}
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={submitting}
        >
          {submitting ? (
            <span className="loading-spinner"></span>
          ) : (
            'Add Expense'
          )}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;

