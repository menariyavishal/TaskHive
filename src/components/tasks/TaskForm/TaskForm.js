import { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./TaskForm.css";

/**
 * TaskForm Component
 * Form for creating new tasks with validation and error handling
 * 
 * @param {function} onAddTask - Callback function to add task to parent state
 * @returns {JSX.Element} Rendered task form component
 */
function TaskForm({ onAddTask }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (taskTitle.trim() === "") {
      setError("Task title cannot be empty");
      return;
    }

    // Create new task object
    const newTask = {
      id: `task-${Date.now()}-${Math.random()}`,
      title: taskTitle.trim(),
      completed: false,
    };

    // Send task to parent component
    onAddTask(newTask);
    
    // Reset form state
    setTaskTitle("");
    setError("");
    
    // Keep focus on input for better UX
    inputRef.current?.focus();
  };

  const handleInputChange = (e) => {
    setTaskTitle(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  return (
    <div className="task-form-container">
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          id="task-input"
          className={error ? "task-input-error" : ""}
          placeholder="Enter a new task..."
          value={taskTitle}
          onChange={handleInputChange}
          maxLength={100}
          aria-label="New task title"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "task-error" : undefined}
        />
        <button 
          type="submit" 
          disabled={!taskTitle.trim()}
          className="btn-add-task"
        >
          Add Task
        </button>
      </form>
      {error && (
        <p id="task-error" className="task-error-message" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// PropTypes: Runtime validation of props
TaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default TaskForm;
