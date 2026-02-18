const FilterBar = ({ 
  categories, 
  currentCategory, 
  currentSort, 
  onCategoryChange, 
  onSortChange 
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="category-filter">Category:</label>
        <select
          id="category-filter"
          value={currentCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="filter-select"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-filter">Sort by:</label>
        <select
          id="sort-filter"
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="filter-select"
        >
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;

