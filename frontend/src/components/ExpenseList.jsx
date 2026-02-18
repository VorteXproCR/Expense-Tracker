import ExpenseCard from './ExpenseCard';

const ExpenseList = ({ expenses, loading, error, onDelete }) => {
  if (loading) {
    return (
      <div className="expense-list-container">
        <div className="loading-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton skeleton-category"></div>
              <div className="skeleton skeleton-amount"></div>
              <div className="skeleton skeleton-description"></div>
              <div className="skeleton skeleton-date"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="expense-list-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <p>Something went wrong</p>
          <p className="error-detail">{error}</p>
        </div>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="expense-list-container">
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <p>No expenses yet</p>
          <p className="empty-subtitle">Add your first expense using the form above</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list-container">
      <div className="expense-grid">
        {expenses.map((expense) => (
          <ExpenseCard 
            key={expense._id} 
            expense={expense} 
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;

