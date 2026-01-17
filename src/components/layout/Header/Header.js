import PropTypes from "prop-types";
import "./Header.css";
import SearchBar from "../../tasks/SearchBar/SearchBar";
import FilterTabs from "../../tasks/FilterTabs/FilterTabs";

/**
 * Header Component
 * Displays the application title and subtitle in a banner
 * 
 * @param {string} title - Main heading text (required)
 * @param {string} subtitle - Subheading text (optional)
 * @returns {JSX.Element} Rendered header component
 */
function Header({ 
  title, 
  subtitle, 
  showControls,
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
  taskCounts,
  onClearCompleted
}) {
  return (
    <header className="header" role="banner">
      <div className="header-content">
        <div className="header-left">
          <img 
            src="/to-do-list.gif" 
            alt="Task management animation" 
            className="header-icon"
          />
          <div className="header-text">
            <h1 className="header-title">{title}</h1>
            {subtitle && <p className="header-subtitle">{subtitle}</p>}
          </div>
        </div>

        {showControls && (
          <div className="header-controls">
            <div className="header-controls-top">
              <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />
              <FilterTabs
                currentFilter={filter}
                onFilterChange={onFilterChange}
                counts={taskCounts}
              />
              {taskCounts.completed > 0 && filter !== 'active' && (
                <button onClick={onClearCompleted} className="clear-completed-btn">
                  Clear ({taskCounts.completed})
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// PropTypes: Runtime validation of props
Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  showControls: PropTypes.bool,
  searchQuery: PropTypes.string,
  onSearchChange: PropTypes.func,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  taskCounts: PropTypes.shape({
    total: PropTypes.number,
    active: PropTypes.number,
    completed: PropTypes.number,
  }),
  onClearCompleted: PropTypes.func,
};

// Default props: Fallback values if props not provided
Header.defaultProps = {
  subtitle: "Organize. Focus. Achieve.",
  showControls: false,
};

export default Header;
