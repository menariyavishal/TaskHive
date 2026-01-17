import PropTypes from "prop-types";
import "./FilterTabs.css";

/**
 * FilterTabs Component
 * Tabs to filter tasks by All, Active, or Completed
 * 
 * @param {string} currentFilter - Currently active filter
 * @param {function} onFilterChange - Callback when filter changes
 * @param {number} counts - Object with total, active, completed counts
 * @returns {JSX.Element} Rendered filter tabs
 */
function FilterTabs({ currentFilter, onFilterChange, counts }) {
  const filters = [
    { id: "all", label: "All", count: counts.total },
    { id: "active", label: "Active", count: counts.active },
    { id: "completed", label: "Completed", count: counts.completed },
  ];

  return (
    <div className="filter-tabs">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`filter-tab ${currentFilter === filter.id ? "active" : ""}`}
          onClick={() => onFilterChange(filter.id)}
          aria-pressed={currentFilter === filter.id}
        >
          {filter.label}
          <span className="filter-count">{filter.count}</span>
        </button>
      ))}
    </div>
  );
}

FilterTabs.propTypes = {
  currentFilter: PropTypes.oneOf(["all", "active", "completed"]).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  counts: PropTypes.shape({
    total: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    completed: PropTypes.number.isRequired,
  }).isRequired,
};

export default FilterTabs;
