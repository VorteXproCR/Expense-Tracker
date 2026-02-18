const TotalDisplay = ({ total, expenseCount }) => {
  return (
    <div className="total-display">
      <div className="total-label">Total Expenses</div>
      <div className="total-amount">₹{total.toFixed(2)}</div>
      <div className="total-count">{expenseCount} {expenseCount === 1 ? 'item' : 'items'}</div>
    </div>
  );
};

export default TotalDisplay;

