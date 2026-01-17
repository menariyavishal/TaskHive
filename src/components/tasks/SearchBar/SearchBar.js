import PropTypes from "prop-types";
import "./SearchBar.css";

/**
 * SearchBar Component
 * Search input to filter tasks by title
 * 
 * @param {string} searchQuery - Current search query
 * @param {function} onSearchChange - Callback when search changes
 * @returns {JSX.Element} Rendered search bar
 */
function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="🔍 Search tasks..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search tasks"
      />
      {searchQuery && (
        <button
          className="clear-search-btn"
          onClick={() => onSearchChange("")}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
