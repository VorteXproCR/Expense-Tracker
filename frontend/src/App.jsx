import { useExpenses } from './hooks/useExpenses';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import FilterBar from './components/FilterBar';
import TotalDisplay from './components/TotalDisplay';

function App() {
  const {
    expenses,
    total,
    loading,
    error,
    categoryFilter,
    sortOrder,
    categories,
    submitting,
    submitError,
    submitSuccess,
    addExpense,
    removeExpense,
    updateCategoryFilter,
    updateSortOrder
  } = useExpenses();

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">💰</span>
            <h1>Expense Tracker</h1>
          </div>
          <TotalDisplay total={total} expenseCount={expenses.length} />
        </div>
      </header>

      <main className="main-content">
        <div className="content-grid">
          <aside className="sidebar">
            <ExpenseForm 
              onSubmit={addExpense}
              submitting={submitting}
              submitError={submitError}
              submitSuccess={submitSuccess}
            />
          </aside>

          <section className="expenses-section">
            <FilterBar 
              categories={categories}
              currentCategory={categoryFilter}
              currentSort={sortOrder}
              onCategoryChange={updateCategoryFilter}
              onSortChange={updateSortOrder}
            />
            
            <ExpenseList 
              expenses={expenses}
              loading={loading}
              error={error}
              onDelete={removeExpense}
            />
          </section>
        </div>
      </main>

      <footer className="footer">
        <p>Built with MERN Stack • Handles network retries gracefully</p>
      </footer>
    </div>
  );
}

export default App;

