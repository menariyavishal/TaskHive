import { useState } from "react";
import PropTypes from "prop-types";
import "./TaskItem.css";

/**
 * TaskItem Component
 * Displays a single task with checkbox, edit, and delete functionality
 * 
 * @param {Object} task - Task object with id, title, and completed status
 * @param {function} onToggleTask - Callback to toggle task completion
 * @param {function} onDeleteTask - Callback to delete the task
 * @param {function} onEditTask - Callback to edit task title
 * @returns {JSX.Element} Rendered task item component
 */
function TaskItem({ task, onToggleTask, onDeleteTask, onEditTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleEdit = () => {
    if (editValue.trim() && editValue !== task.title) {
      onEditTask(task.id, editValue.trim());
    } else {
      setEditValue(task.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    } else if (e.key === "Escape") {
      setEditValue(task.title);
      setIsEditing(false);
    }
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""} ${isEditing ? "editing" : ""}`}>
      {/* Checkbox for accessibility and standard UX */}
      <div className="task-checkbox-wrapper">
        <input
          type="checkbox"
          id={`task-${task.id}`}
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
          className="task-checkbox"
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
          disabled={isEditing}
        />
        
        {isEditing ? (
          <input
            type="text"
            className="task-edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            autoFocus
            maxLength={100}
          />
        ) : (
          <label
            htmlFor={`task-${task.id}`}
            className="task-label"
            onDoubleClick={() => !task.completed && setIsEditing(true)}
            title="Double-click to edit"
          >
            {task.title}
          </label>
        )}
      </div>

      {/* Action buttons */}
      <div className="task-actions">
        {!isEditing && !task.completed && (
          <button
            onClick={() => setIsEditing(true)}
            className="edit-btn"
            aria-label={`Edit task "${task.title}"`}
            title="Edit task"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDeleteTask(task.id)}
          className="delete-btn"
          aria-label={`Delete task "${task.title}"`}
          title="Delete task"
          disabled={isEditing}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

// PropTypes: Runtime validation of props
TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

export default TaskItem;
