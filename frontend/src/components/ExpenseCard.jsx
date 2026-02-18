const ExpenseCard = ({ expense, onDelete }) => {
  const amountInRupees = expense.amount / 100;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Food: '#f97316',
      Transport: '#3b82f6',
      Shopping: '#ec4899',
      Bills: '#ef4444',
      Entertainment: '#8b5cf6',
      Health: '#22c55e',
      Other: '#6b7280'
    };
    return colors[category] || '#6b7280';
  };

  return (
    <div className="expense-card">
      <div className="expense-header">
        <span 
          className="expense-category"
          style={{ backgroundColor: `${getCategoryColor(expense.category)}20`, color: getCategoryColor(expense.category) }}
        >
          {expense.category}
        </span>
        <button 
          className="delete-btn"
          onClick={() => onDelete(expense._id)}
          title="Delete expense"
        >
          ×
        </button>
      </div>
      
      <div className="expense-amount">
        ₹{amountInRupees.toFixed(2)}
      </div>
      
      {expense.description && (
        <div className="expense-description">
          {expense.description}
        </div>
      )}
      
      <div className="expense-footer">
        <span className="expense-date">
          {formatDate(expense.date)}
        </span>
        <span className="expense-time">
          {formatTime(expense.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default ExpenseCard;

