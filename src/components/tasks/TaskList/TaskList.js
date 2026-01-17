import PropTypes from "prop-types";
import TaskItem from "../TaskItem/TaskItem";
import "./TaskList.css";

/**
 * TaskList Component
 * Displays a list of tasks or an empty state message
 * 
 * @param {Array} tasks - Array of task objects
 * @param {function} onToggleTask - Callback to toggle task completion
 * @param {function} onDeleteTask - Callback to delete a task
 * @param {function} onEditTask - Callback to edit task title
 * @returns {JSX.Element} Rendered task list component
 */
function TaskList({ tasks, onToggleTask, onDeleteTask, onEditTask }) {
  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  // Empty state
  if (totalTasks === 0) {
    return (
      <div className="empty-state">
        <p className="empty-icon">🎯</p>
        <p className="empty-title">No tasks yet!</p>
        <p className="empty-subtitle">Add your first task above to get started.</p>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      {/* Task counter badge */}
      <div className="task-counter">
        <span className="counter-item">
          <strong>{totalTasks}</strong> Total
        </span>
        <span className="counter-divider">|</span>
        <span className="counter-item active">
          <strong>{activeTasks}</strong> Active
        </span>
        <span className="counter-divider">|</span>
        <span className="counter-item completed">
          <strong>{completedTasks}</strong> Completed
        </span>
      </div>

      {/* Task list - semantic HTML */}
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))}
      </ul>
    </div>
  );
}

// PropTypes: Runtime validation of props
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

export default TaskList;
